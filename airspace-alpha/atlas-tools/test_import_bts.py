"""Regression coverage for the June 2 BTS import, using invented flight records."""
import csv
import io
import json
from pathlib import Path
import tempfile
import unittest
import zipfile

from import_bts import clock, export

FIELDS = ["FlightDate", "Origin", "Dest", "Tail_Number", "IATA_Code_Operating_Airline",
          "Flight_Number_Operating_Airline", "CRSDepTime", "CRSArrTime", "DepTime", "ArrTime",
          "CRSElapsedTime", "ActualElapsedTime", "DepDelay", "Cancelled", "Diverted", "Marketing_Airline_Network"]


def leg(flt, tail, cities, clocks, durations, day=2, cancel=0, divert=0):
    return [f"2025-06-{day:02}", *cities.split(), tail, "ZZ", flt, *clocks.split(),
            *durations, cancel, divert, "ZZ"]


class HistoricalBank(unittest.TestCase):
    def ingest(self, flights):
        with tempfile.TemporaryDirectory() as tmp:
            zip_path = Path(tmp) / "june.zip"
            buf = io.StringIO()
            writer = csv.writer(buf)
            writer.writerows([FIELDS, *flights])
            with zipfile.ZipFile(zip_path, "w") as archive:
                archive.writestr("On_Time_Marketing.csv", buf.getvalue())
            out = Path(tmp) / "recorded.js"
            record = export(zip_path, out, 14 * 60, 16 * 60)
            loaded = json.loads(out.read_text().removeprefix("window.AtlasHistory = ").rstrip(";\n"))
            self.assertEqual(record, loaded)
            self.assertEqual(record["source"]["title"], "BTS Marketing Carrier On-Time Performance")
            return record["flights"]

    def test_cross_zone_and_overnight(self):
        flights = [
            leg("1", "N101", "DEN EWR", "0850 1430 0900 1435", (220, 215, 10)),
            # Departing on the same schedule date, after midnight in reality.
            leg("2", "N101", "EWR DEN", "2355 0155 0010 0205", (240, 235, 15)),
            leg("3", "N102", "DEN EWR", "1000 1540 1000 9999", (220, 220, 0)),
            leg("4", "N103", "DEN EWR", "1000 1540 1000 1540", (220, 220, 0), cancel=1),
            leg("5", "N104", "DEN EWR", "1000 1540 1000 1540", (220, 220, 0), divert=1),
            leg("6", "N105", "DEN EWR", "1020 1600 1020 1600", (220, 220, 0)),
        ]
        rows = self.ingest(flights)
        self.assertEqual(len(rows), 1)
        r = rows[0]
        self.assertEqual((r["scheduled"], r["actual"], r["nextDest"], r["nextScheduled"], r["nextActual"]),
                         (870, 875, "DEN", 1435, 1450))

    def test_never_skip_intervening_movement(self):
        flights = [
            leg("1", "N101", "DEN EWR", "0850 1430 0900 1435", (220, 215, 10)),
            # A real intervening reported DEN takeoff precludes inferring EWR's rotation.
            leg("2", "N101", "DEN EWR", "1245 1825 1245 1825", (220, 220, 0)),
            leg("3", "N101", "EWR DEN", "1500 1700 1500 1700", (240, 240, 0)),
        ]
        [r] = self.ingest(flights)
        self.assertIsNone(r["nextDest"])

    def test_same_tail_with_bad_clock(self):
        rows = self.ingest([
            leg("1", "N101", "DEN EWR", "0850 1430 0900 1435", (220, 215, 10)),
            leg("2", "N101", "EWR DEN", "1450 1650 9999 1650", (240, 240, 0)),
            leg("3", "N101", "EWR DEN", "1500 1700 1500 1700", (240, 240, 0)),
        ])
        self.assertIsNone(rows[0]["nextNumber"])

    def test_clock_sentinels(self):
        for missing in ("", "nan", "9999", "-1", "1761", "2401"):
            self.assertIsNone(clock(missing))
        self.assertEqual((clock("2400"), clock("0000"), clock("15.0")), (1440, 0, 15))


if __name__ == "__main__":
    unittest.main()
