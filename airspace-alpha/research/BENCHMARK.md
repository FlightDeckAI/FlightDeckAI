# Airspace Alpha Benchmark

## Goal
Prove, disprove or bound the incremental predictive value of corporate-aircraft movement **before** product claims are made.

## First benchmark
**M&A Pre-Announcement Aviation Benchmark, 2018–2026**

### Universe
- 250+ completed / announced public-company M&A transactions
- matched non-event control firms
- U.S.-registered corporate aircraft plus identified managed aircraft
- reliever airports and airports within economic proximity of counterparties

### Point-in-time rule
No feature may use information first published after the signal timestamp.

### Event windows
- [-30,-1]
- [-15,-1]
- [-5,-1]
- intraday where exact timestamps are available

### Core signal families
1. route novelty
2. destination novelty
3. repeated visits / campaign behavior
4. dwell-time abnormality
5. buyer / target aircraft co-location
6. multi-party convergence
7. market-dislocation: physical signal moves before prediction-market price
8. public-information suppression: signal already explained by news / SEC filing

### False-positive controls
- weather diversion
- fuel / tech stop
- maintenance base
- recurring executive commute
- charter / fractional operator reuse
- sporting / conference traffic
- airport-only false attribution
- stale ownership mapping

### Metrics
Do not optimize only for statistical significance.
Report:
- precision / recall
- false positives per 1,000 flights
- median and mean lead time
- Brier score where probabilities are emitted
- calibration by score bucket
- event-study CAR with matched controls
- stability across years, sectors and aircraft classes

### Replication target
Reproduce and pressure-test the methodology of the Oct. 2026 working paper on executive-jet co-location and M&A. Treat its result as a hypothesis, not ground truth.

### Publication threshold
No public phrase like "predicts M&A" until:
- point-in-time dataset is locked,
- holdout period is untouched,
- at least one baseline model is beaten,
- sensitivity analysis survives reliever-airport radius changes,
- false positives are documented.

The public research product should emphasize what worked, what failed and where the signal is economically useful.
