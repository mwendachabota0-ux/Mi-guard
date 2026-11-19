# WP2 Signal Behaviour — Assumptions and Limits

## Purpose

These plots and the accompanying flow diagram explain a possible signal-review
story for a presentation. They are synthetic illustrations, not a detector
simulation, mine measurements, or evidence of system performance.

## Signal-flow interpretation

The diagram shows illustrative EMI and magnetic / gradiometric channels, a
complementary-input placeholder, conceptual data acquisition, generic signal
conditioning, an illustrative comparison / event flag, and operator review
under site-approved procedures.

The generated animated SVG visualizes movement between those labeled stages.
Its moving markers are a presentation effect only; they do not encode sample
timing, signal processing, decision logic, or an operating response.

The complementary input has no selected type or generated numeric channel.
Conditioning method, sample timing, comparison logic, thresholds, and operating
response are not specified. The diagram does not represent an installed
hardware or control path.

## Reproducible synthetic recipe

The generator uses the fixed default seed `20261118`; another seed can be
provided when a different illustrative draw is wanted. Exact values are also
written to `signal-generation-assumptions.json` when the outputs are generated.

| Setting | Illustrative choice | Limit |
|---|---:|---|
| Timeline | 0–20 seconds, 600 points | Display axis only; not an acquisition or sampling specification |
| Signal units | Arbitrary relative units | Not calibrated or comparable to a real sensor |
| Case A noise | Standard deviation 0.07 in both channels | Baseline texture only; not a detection threshold |
| Case B shape | Gaussian center 10 seconds; sigma 0.42 seconds | Generic synthetic channel change; not a physical target-response model |
| Case B channel amplitudes | EMI 0.68; magnetic / gradiometric 0.84 | Arbitrary relative units only |
| Case B noise | Standard deviation 0.07 in both channels | Arbitrary visual setting |
| Case C EMI components | Amplitudes 0.24, 0.13; rates 0.42, 1.2 per illustrative timeline unit; phase offsets 0, 0.8 radians | Visual interference-like texture; not a modeled truck, ore, or EMI effect |
| Case C magnetic components | Amplitudes 0.28, 0.09; rates 0.42, 0.9 per illustrative timeline unit; phase offsets 0.9, 0 radians | Visual ambiguity only |
| Case C noise | Standard deviation 0.07 in both channels | Does not quantify real-world interference |
| Case D overlays | Five runs; amplitude range 0.45–0.95; time-shift standard deviation 0.22 seconds; Gaussian sigma 0.52 seconds; magnetic scale 0.86; noise standard deviation 0.09 | Synthetic variation only; not repeatability evidence |

Noise is generated from normal (Gaussian) draws scaled by the listed standard
deviations. All numeric settings shape example graphics only. In particular, the time axis,
component rates, amplitudes, and noise do not describe sensor sample rate,
frequency response, sensitivity, target size, detection range, or confidence.
Case B is labeled as a concealed-target example for narrative context; no
target outline, location, or recoverable geometry is modeled.

## Case meanings

- **A — Normal pass:** illustrative baseline; the mock state is “No Detection
  Indicated,” not a calibrated negative result.
- **B — Concealed target example:** synthetic channel changes lead to an
  illustrative event flag, not a proven detection.
- **C — Interference / ambiguity:** illustrative channel variation leads to
  validation / operator review; no guaranteed classification is implied.
- **D — Repeated-run illustration:** five generated overlays show variation in
  the synthetic recipe; they do not establish repeatability or performance.

## Evaluation still required

Detection range, sensitivity, repeatability, false-alarm behavior, and truck,
ore, and electromagnetic-interference effects remain future controlled-test
objectives. They are not results from these plots. Physical testing and any
operating response require the appropriate engineering, supervisor, and site
approvals.
