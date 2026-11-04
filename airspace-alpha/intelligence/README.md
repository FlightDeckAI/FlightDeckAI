# Airspace Alpha Intelligence Layer

Mission: build the **ForeFlight × Bloomberg × Palantir** terminal for physical-world aviation intelligence, with prediction markets as the price-discovery layer.

## Product doctrine

1. **ForeFlight**: the physical world must be spatial, live, legible, and pilot-grade.
2. **Bloomberg**: every important state change becomes a time-stamped event on a tape.
3. **Palantir**: aircraft, owners, operators, companies, facilities, counterparties, markets, disclosures and outcomes live in one provenance-aware ontology.
4. **Price discovery**: Kalshi / Polymarket observations are market priors, not decorations.
5. **Replay**: every signal must be reconstructable exactly as it was known at the time.
6. **Calibration**: no probability is marketed as predictive until it has survived point-in-time backtesting.

## Moat architecture

### Open / licensed aviation layer
Raw ADS-B data remains source-separated and license-tagged. Initial sources:
- adsb.lol historical archive (ODbL)
- FAA aircraft registry
- OurAirports / FAA NASR reference data
- AviationWeather.gov and NOAA weather archives
- optional commercial providers later: JETNET / FlightAware / ADS-B Exchange

### Proprietary intelligence layer
Airspace Alpha owns the independently created:
- entity-resolution graph
- point-in-time company / ticker relationships
- airport economic terrain
- route novelty features
- dwell and revisit features
- convergence events
- market snapshots
- disclosure timestamps
- false-positive labels
- signal outcomes
- calibration results
- alert history and analyst annotations

Raw source data and derived intelligence must never be collapsed into one undifferentiated database. Keep source, license, timestamp, transformation version and provenance on every record.

## Initial backend leverage

- **frankea/adsbtrack** (MIT): flight reconstruction, airport matching, landing-confidence scoring, FAA registry enrichment, weather enrichment and multi-source ADS-B fetching.
- **kylebarron/adsb-extract** (MIT): ADS-B archive filtering and Parquet generation pattern.
- **DuckDB + Parquet**: local / cloud analytical substrate for geospatial event studies.
- **OpenFIGI + GLEIF + SEC EDGAR**: security and corporate-entity normalization.

## Six execution lanes

1. Evidence Lake
2. Calibration Benchmark
3. Airspace Ontology
4. Institutional Terminal
5. Airspace Alpha Research / LloydPilot authority
6. Design-partner revenue program

Each lane has a tracked GitHub issue with acceptance criteria.
