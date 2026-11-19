# Mi-GUARD — Hybrid Metal Detection & Record Management System

New to the project? Start with the plain-language
[project guide](PROJECT_GUIDE.md).

Q4 2026 conceptual pilot assets for technical review. HEATGUARD's work-package
overview is the dashboard entry point for WP1–WP5. The project also contains an
interactive event-record prototype, a synthetic signal generator, a 24-hour
work board, and folders for the six handover items.

## Start here

- Open the **HEATGUARD** preview to view the WP1–WP5 dashboard overview.
- Choose **WP3 · Pass review** to review and update illustrative event records.
  Changes are stored in this browser only.
- Open the **Signal behaviour** page in HEATGUARD to review the WP2 flow and
  switch between the four synthetic cases.
- The WP4 and WP5 pages show required deliverables and current status; they do
  not imply that the video or final review pack has been produced or approved.
- Generate the Case A–D plots, sample CSV, process-flow visuals, and assumptions
  manifest with
  `uv run python wp2_signal_generator.py`.
- Track work and assign owners in [`PROJECT_BOARD.md`](PROJECT_BOARD.md).
- Deliverable folders are scaffolded from `01_Final_Video` through
  `06_Final_Review_Pack`.

Generated plots, flow diagrams, the animated flow SVG, CSV, and assumptions
manifest are written to `generated-artifacts/` and excluded from source control
and deployment. The script can be run again to recreate them.

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
