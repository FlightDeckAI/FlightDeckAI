#!/usr/bin/env python3
"""Generate optional dist/recorded.js from an official June 2025 BTS On-Time ZIP.

    python3 import_bts.py June2025.zip
    python3 import_bts.py June2025.zip --start 15:00 --end 17:00 --output /tmp/recorded.js

Use the full US monthly CSV with scheduled and actual gate times, signed delays,
elapsed times, operating carrier, flight number, cancellation/diversion, and tail.
Only completed arrivals in the selected Newark-local bank are emitted. Retain the
national input so that the next same-tail movement can be checked across stations.
No network request, package installation, or extraction to disk is needed.
"""
import argparse
import bisect
from collections import Counter, defaultdict, deque
import csv
from dataclasses import dataclass
from datetime import date, timedelta
import hashlib
import io
import json
import math
from pathlib import Path
import re
import tempfile
import zipfile

DAY = date(2025, 6, 2)
ROOT = Path(__file__).resolve().parent
BTS = "https://transtats.bts.gov/DL_SelectFields.aspx?QO_fu146_anzr=b0-gvzr&gnoyr_VQ=FGK"
REPORTING = "https://transtats.bts.gov/DL_SelectFields.aspx?QO_fu146_anzr=b0-gvzr&gnoyr_VQ=FGJ"
ALIASES = {
    "service": ["FlightDate", "FL_DATE"],
    "from_": ["Origin"], "to": ["Dest"], "tail": ["Tail_Number", "TailNum"],
    "carrier": ["IATA_Code_Operating_Airline", "Operating_Airline", "IATA_Code_Reporting_Airline",
                "Reporting_Airline", "OP_UNIQUE_CARRIER", "OP_CARRIER", "UniqueCarrier"],
    "number": ["Flight_Number_Operating_Airline", "FL_NUM_OP", "OP_CARRIER_FL_NUM",
               "Flight_Number_Reporting_Airline", "FlightNum"],
    "sdep": ["CRSDepTime"], "sarr": ["CRSArrTime"], "dep": ["DepTime"], "arr": ["ArrTime"],
    "block": ["CRSElapsedTime"], "elapsed": ["ActualElapsedTime"], "ddep": ["DepDelay"],
    "cancel": ["Cancelled"], "divert": ["Diverted"],
}


def integer(value):
    try:
        n = float(value)
        return int(n) if math.isfinite(n) and n.is_integer() else None
    except (ValueError, TypeError, OverflowError):
        return None


def clock(value):
    n = integer(value)
    if n == 2400:
        return 1440
    if n is None or n < 0 or n > 2359 or n % 100 >= 60:
        return None
    return n // 100 * 60 + n % 100


def parameter_time(value):
    if not re.fullmatch(r"[0-2][0-9]:[0-5][0-9]", value):
        raise argparse.ArgumentTypeError("Use HH:MM in Newark local time")
    result = clock(value.replace(":", ""))
    if result is None:
        raise argparse.ArgumentTypeError("Time must fall between 00:00 and 24:00")
    return result


def norm(name):
    return re.sub("[^a-z0-9]", "", name.lower())


@dataclass(frozen=True)
class Flight:
    service: int
    origin: str
    dest: str
    tail: str
    number: str
    sdep: int
    sarr: int
    dep: int
    arr: int
    block: int
    elapsed: int
    ddep: int
    diverted: bool


def read_rows(archive):
    members = [n for n in archive.namelist() if n.lower().endswith(".csv") and not n.startswith("__MACOSX/")]
    flight_files = [n for n in members if "ontime" in norm(n) or "on_time" in n.lower()]
    files = flight_files or members
    if len(files) != 1:
        raise ValueError("Expected a monthly ZIP containing one on-time flight CSV")
    start = DAY - timedelta(days=2)
    end = DAY + timedelta(days=3)
    rows = []
    with archive.open(files[0]) as stream, io.TextIOWrapper(stream, encoding="utf-8-sig", newline="") as text:
        reader = csv.reader(text)
        headers = {norm(name): i for i, name in enumerate(next(reader))}
        indexes = {k: next((headers[norm(a)] for a in names if norm(a) in headers), None)
                   for k, names in ALIASES.items()}
        missing = [k for k, i in indexes.items() if i is None]
        if missing:
            raise ValueError("Monthly extract is missing fields: " + ", ".join(ALIASES[k][0] for k in missing))
        marketing = any("marketing" in h for h in headers)
        for line in reader:
            if not line:
                continue
            day = line[indexes["service"]][:10]
            if not start.isoformat() <= day <= end.isoformat():
                continue
            field = lambda k: line[indexes[k]].strip()
            if integer(field("cancel")) != 0:
                continue
            diverted = integer(field("divert")) != 0
            raw_tail = field("tail").upper()
            tail = raw_tail if re.fullmatch(r"[A-Z0-9-]{2,10}", raw_tail) and raw_tail not in {"NA", "NONE", "UNKNOWN", "UNKN", "NAN", "NULL", "000000"} else ""
            rows.append(Flight((date.fromisoformat(day) - DAY).days, field("from_"), field("to"),
                               tail, field("carrier") + field("number"), clock(field("sdep")),
                               clock(field("sarr")), clock(field("dep")), clock(field("arr")),
                               integer(field("block")), integer(field("elapsed")), integer(field("ddep")), diverted))
    return list(dict.fromkeys(rows)), marketing


def local_offsets(rows):
    """Airport local time minus EWR time during this fixed June week (no DST change).

    BTS publishes both local scheduled clocks and elapsed minutes. Thus,
    dest offset - origin offset = arrival clock - departure clock - elapsed
    modulo one day. Pick the modal difference over each city pair. The US Pacific
    territories use explicit date-line representatives for their civil day.
    """
    votes = defaultdict(Counter)
    for f in rows:
        if None in (f.sdep, f.sarr, f.block) or not 0 < f.block < 1440:
            continue
        a, b = sorted((f.origin, f.dest))
        change = (f.sarr - f.sdep - f.block) * (1 if a == f.origin else -1) % 1440
        if change % 15 == 0:
            votes[a, b][change] += 1
    graph = defaultdict(list)
    for (a, b), values in votes.items():
        ranked = values.most_common(2)
        change, count = ranked[0]
        if len(ranked) > 1 and ranked[1][1] == count:
            continue
        graph[a].append((b, change))
        graph[b].append((a, -change))
    residues = {"EWR": 0}
    queue = deque(["EWR"])
    while queue:
        airport = queue.popleft()
        for other, change in graph[airport]:
            if other not in residues:
                residues[other] = (residues[airport] + change) % 1440
                queue.append(other)
    offsets = {a: (value + 720) % 1440 - 720 for a, value in residues.items()}
    for a in ["GUM", "SPN", "ROP", "TIQ"]:
        if a in offsets and offsets[a] % 1440 == 840:
            offsets[a] = 840
    return offsets


def collect(archive, start, end):
    rows, marketing = read_rows(archive)
    offsets = local_offsets(rows)
    timelines = defaultdict(list)
    missing_departures = defaultdict(set)
    arrivals = []
    for f in rows:
        if not f.tail:
            continue
        if f.origin not in offsets or None in (f.sdep, f.dep, f.ddep) or (f.sdep + f.ddep - f.dep) % 1440:
            missing_departures[f.tail].add(f.service)
            continue
        scheduled_dep = 1440 * f.service + f.sdep - offsets[f.origin]
        departed = scheduled_dep + f.ddep
        timelines[f.tail].append((departed, scheduled_dep, f))
        if f.dest != "EWR" or f.diverted or None in (f.block, f.elapsed, f.sarr, f.arr):
            continue
        if f.block <= 0 or f.elapsed <= 0:
            continue
        scheduled = scheduled_dep + f.block
        landed = departed + f.elapsed
        if start <= scheduled < end and (scheduled - f.sarr) % 1440 == 0 and (landed - f.arr) % 1440 == 0:
            arrivals.append((f, departed, scheduled, landed))

    flights = []
    for tail in timelines:
        timelines[tail].sort(key=lambda e: (e[0], e[2].number, e[2].origin))
    for f, departed, scheduled, landed in sorted(arrivals, key=lambda a: (a[2], a[0].number, a[0].origin)):
        timeline = timelines[f.tail]
        times = [e[0] for e in timeline]
        idx = bisect.bisect_right(times, departed)
        next_leg = None
        if idx < len(timeline) and times.count(departed) == 1:
            actual_dep, scheduled_dep, candidate = timeline[idx]
            # An unclocked segment can hide an intervening movement. Source dates
            # are origin-local, so pad the ambiguity window one day on each side.
            ambiguous = any(f.service - 1 <= n <= candidate.service + 1
                            for n in missing_departures[f.tail])
            unique = idx + 1 == len(timeline) or times[idx + 1] != actual_dep
            if (unique and not ambiguous and candidate.origin == "EWR" and not candidate.diverted
                    and candidate.arr is not None and candidate.elapsed is not None and candidate.elapsed > 0
                    and landed <= actual_dep <= landed + 24 * 60):
                next_leg = (actual_dep, scheduled_dep, candidate)
        flights.append({
            "id": f"{f.number}-{f.origin}-{f.tail}-{departed}", "number": f.number, "tail": f.tail,
            "origin": f.origin, "dest": "EWR", "scheduled": scheduled, "actual": landed,
            "nextDest": next_leg[2].dest if next_leg else None, "nextNumber": next_leg[2].number if next_leg else None,
            "nextScheduled": next_leg[1] if next_leg else None, "nextActual": next_leg[0] if next_leg else None,
        })
    if not flights:
        raise ValueError("No qualifying June 2 Newark arrivals found. Check input month, fields, and bank interval.")
    return flights, marketing


def export(source, out, start, end):
    if not 0 <= start < end <= 1440 or end - start > 180:
        raise ValueError("Choose a bank no longer than three hours on June 2")
    h = hashlib.sha256()
    with source.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    with zipfile.ZipFile(source) as archive:
        flights, marketing = collect(archive, start, end)
    data = {
        "date": DAY.isoformat(), "airport": "EWR", "timezone": "America/New_York",
        "start": start, "end": end, "unit": "minutes since Newark local midnight",
        "source": {
            "title": "BTS Marketing Carrier On-Time Performance" if marketing else "BTS Reporting Carrier On-Time Performance",
            "url": BTS if marketing else REPORTING, "sha256": h.hexdigest(), "file": source.name,
        },
        "notes": [
            "Observed gate times for covered US domestic services. Bank membership uses scheduled gate arrival.",
            "A rotation requires the immediately following reported same-tail departure to originate at EWR within 24 hours. Missing, ambiguous, diverted or incompatible movements produce no link.",
            "All times are minutes from Newark midnight on June 2. Onward departure times are already Newark-local. Inbound times use UTC-offset differences inferred from scheduled block minutes and local clocks, checked against reported arrival clocks. Delays and elapsed time resolve overnight flights.",
            "This is a reporting-carrier sample. Unreported movements and passenger connections are outside the extract."
        ],
        "flights": flights,
    }
    out.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile("w", encoding="utf-8", dir=out.parent, delete=False) as tmp:
        tmp.write(
            "window.AtlasHistory = " + json.dumps(data, separators=(",", ":")) + ";\n")
    Path(tmp.name).replace(out)
    return data


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("zip", type=Path)
    parser.add_argument("--output", type=Path, default=ROOT.parent / "atlas" / "recorded.js")
    parser.add_argument("--start", type=parameter_time, default=14 * 60)
    parser.add_argument("--end", type=parameter_time, default=16 * 60)
    args = parser.parse_args()
    try:
        record = export(args.zip, args.output, args.start, args.end)
    except (ValueError, OSError, zipfile.BadZipFile) as exc:
        parser.exit(2, str(exc) + "\n")
    print(f"Wrote {len(record['flights'])} observed arrivals to {args.output}.")
