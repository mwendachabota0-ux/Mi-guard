# Hybrid Metal Detection & Record Management System

New to the project? Start with the plain-language
[project guide](PROJECT_GUIDE.md).

Q4 2026 conceptual pilot assets for technical review. This project contains an
interactive event-record prototype, a synthetic signal plotting script, a
24-hour work board, and folders for the six handover items.

## Start here

- Open the **Pilot Records Dashboard** preview to review and update illustrative
  event records. Changes are stored in this browser only.
- Generate the Case A–D signal figure and CSV with
  `uv run python wp2_signal_generator.py`.
- Track work and assign owners in [`PROJECT_BOARD.md`](PROJECT_BOARD.md).
- Deliverable folders are scaffolded from `01_Final_Video` through
  `06_Final_Review_Pack`.

Generated plots and CSV files are written to `generated-artifacts/` and are
excluded from source control and deployment. The script can be run again to
recreate them.

## Technical and release boundaries

This is a conceptual simulation. All records, sensor traces, plots, and
dashboard values are synthetic examples, not site measurements or validated
performance. No detection range, accuracy, threshold, object outline, or
automatic mine-control shutdown is represented. Testing and any operating
response require supervisor direction and Barrick HSE approval.

Use the required disclaimer verbatim in any video opening and end card:

> CONCEPTUAL SIMULATION — For technical presentation only. Equipment
> configuration, detection performance and operating response are subject to
> detailed engineering, controlled tests and site approval.
# Mi-guard
