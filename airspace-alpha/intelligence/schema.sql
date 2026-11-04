-- Airspace Alpha point-in-time ontology / research schema
-- Target: DuckDB first, portable to Postgres later.

CREATE TABLE IF NOT EXISTS source_registry (
  source_id VARCHAR PRIMARY KEY,
  source_name VARCHAR NOT NULL,
  source_uri VARCHAR,
  license VARCHAR,
  commercial_use VARCHAR,
  retrieved_at TIMESTAMP,
  notes VARCHAR
);

CREATE TABLE IF NOT EXISTS aircraft_identity (
  aircraft_id VARCHAR PRIMARY KEY,
  icao24 VARCHAR,
  registration VARCHAR,
  serial_number VARCHAR,
  manufacturer VARCHAR,
  model VARCHAR,
  registrant_name VARCHAR,
  registrant_address VARCHAR,
  valid_from TIMESTAMP,
  valid_to TIMESTAMP,
  source_id VARCHAR,
  confidence DOUBLE,
  observed_at TIMESTAMP,
  transformation_version VARCHAR
);

CREATE TABLE IF NOT EXISTS legal_entity (
  entity_id VARCHAR PRIMARY KEY,
  canonical_name VARCHAR NOT NULL,
  lei VARCHAR,
  cik VARCHAR,
  country VARCHAR,
  entity_type VARCHAR,
  valid_from TIMESTAMP,
  valid_to TIMESTAMP,
  source_id VARCHAR,
  observed_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS security_identifier (
  entity_id VARCHAR,
  ticker VARCHAR,
  exchange VARCHAR,
  figi VARCHAR,
  isin VARCHAR,
  valid_from TIMESTAMP,
  valid_to TIMESTAMP,
  source_id VARCHAR,
  observed_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS entity_relationship (
  from_entity_id VARCHAR,
  to_entity_id VARCHAR,
  relationship_type VARCHAR,
  valid_from TIMESTAMP,
  valid_to TIMESTAMP,
  source_id VARCHAR,
  confidence DOUBLE,
  evidence_uri VARCHAR,
  observed_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS aircraft_entity_relationship (
  aircraft_id VARCHAR,
  entity_id VARCHAR,
  relationship_type VARCHAR, -- registered_owner, operator, beneficial_use, managed_for
  valid_from TIMESTAMP,
  valid_to TIMESTAMP,
  source_id VARCHAR,
  confidence DOUBLE,
  evidence_uri VARCHAR,
  observed_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS place (
  place_id VARCHAR PRIMARY KEY,
  name VARCHAR,
  place_type VARCHAR, -- airport, hq, plant, pe_firm, bank, law_firm, gov, conference
  lat DOUBLE,
  lon DOUBLE,
  entity_id VARCHAR,
  source_id VARCHAR,
  valid_from TIMESTAMP,
  valid_to TIMESTAMP,
  observed_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS flight_leg (
  flight_id VARCHAR PRIMARY KEY,
  aircraft_id VARCHAR,
  source_id VARCHAR,
  offblock_time TIMESTAMP,
  airborne_time TIMESTAMP,
  landing_time TIMESTAMP,
  inblock_time TIMESTAMP,
  origin_place_id VARCHAR,
  destination_place_id VARCHAR,
  origin_confidence DOUBLE,
  destination_confidence DOUBLE,
  callsign VARCHAR,
  track_parquet_uri VARCHAR,
  extraction_version VARCHAR,
  observed_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS flight_feature (
  flight_id VARCHAR,
  feature_version VARCHAR,
  route_novelty_30d DOUBLE,
  route_novelty_180d DOUBLE,
  destination_visits_30d INTEGER,
  destination_visits_365d INTEGER,
  dwell_minutes DOUBLE,
  fuel_stop_probability DOUBLE,
  weather_diversion_probability DOUBLE,
  distance_to_relevant_hq_nm DOUBLE,
  distance_to_relevant_bank_nm DOUBLE,
  distance_to_relevant_law_firm_nm DOUBLE,
  distance_to_relevant_gov_nm DOUBLE,
  other_related_aircraft_count INTEGER,
  counterparty_aircraft_count INTEGER,
  convergence_score DOUBLE,
  computed_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS market_snapshot (
  snapshot_id VARCHAR PRIMARY KEY,
  venue VARCHAR,
  market_id VARCHAR,
  market_title VARCHAR,
  observed_at TIMESTAMP,
  yes_bid DOUBLE,
  yes_ask DOUBLE,
  last_price DOUBLE,
  volume DOUBLE,
  open_interest DOUBLE,
  order_book_json JSON,
  source_id VARCHAR
);

CREATE TABLE IF NOT EXISTS disclosure_event (
  disclosure_id VARCHAR PRIMARY KEY,
  entity_id VARCHAR,
  disclosure_type VARCHAR, -- 8-K, merger_announcement, earnings, award, press_release
  occurred_at TIMESTAMP,
  public_at TIMESTAMP,
  accession_number VARCHAR,
  source_id VARCHAR,
  evidence_uri VARCHAR
);

CREATE TABLE IF NOT EXISTS signal_event (
  signal_id VARCHAR PRIMARY KEY,
  signal_type VARCHAR, -- route_novelty, repeated_visit, convergence, market_dislocation
  detected_at TIMESTAMP,
  aircraft_id VARCHAR,
  flight_id VARCHAR,
  primary_entity_id VARCHAR,
  counterparty_entity_id VARCHAR,
  place_id VARCHAR,
  attention_score DOUBLE,
  feature_version VARCHAR,
  evidence_json JSON,
  source_snapshot_json JSON
);

CREATE TABLE IF NOT EXISTS signal_outcome (
  signal_id VARCHAR,
  resolved_at TIMESTAMP,
  disclosure_id VARCHAR,
  outcome_label VARCHAR, -- true_positive, false_positive, unresolved, unrelated
  lead_minutes DOUBLE,
  equity_return_1d DOUBLE,
  equity_return_5d DOUBLE,
  equity_return_15d DOUBLE,
  market_move_1h DOUBLE,
  market_move_24h DOUBLE,
  analyst_notes VARCHAR
);

CREATE TABLE IF NOT EXISTS benchmark_run (
  benchmark_id VARCHAR PRIMARY KEY,
  run_at TIMESTAMP,
  universe_version VARCHAR,
  feature_version VARCHAR,
  model_version VARCHAR,
  event_window VARCHAR,
  precision DOUBLE,
  recall DOUBLE,
  false_positive_rate DOUBLE,
  mean_lead_minutes DOUBLE,
  brier_score DOUBLE,
  notes VARCHAR
);
