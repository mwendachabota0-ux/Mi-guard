# HEATGUARD

Conceptual Q4 2026 pilot assets for a mine-stakeholder technical presentation, including a simulation-only haul-truck dashboard and synthetic signal examples.

## Run & Operate

- Open the **HEATGUARD** artifact preview to review the browser-based prototype.
- `uv run python wp2_signal_generator.py` — generate the Case A–D charts, overlays, signal-flow visuals, sample CSV, and assumptions manifest under `generated-artifacts/wp2-signal-plots/`.
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- The dashboard stores prototype edits in the current browser's local storage; it is not a shared operational record system.
- Assign team members and track the 24-hour sprint in `PROJECT_BOARD.md`.

## Stack

- pnpm workspace, Node.js 24, TypeScript 5.9
- Dashboard: React + Vite
- Signal generator: Python, NumPy, Matplotlib

## Where things live

- `PROJECT_BOARD.md` — five work packages across six 24-hour work blocks
- `01_Final_Video/` through `06_Final_Review_Pack/` — handover folder scaffolds
- `wp2_signal_generator.py` — deterministic, labeled synthetic signal generator
- `artifacts/pilot-dashboard/` — event dashboard prototype
- `artifacts/heatguard/` — primary simulation dashboard

## Architecture decisions

- Keep this pilot prototype frontend-only; local browser storage is not a shared source of truth.
- Keep generated signal outputs under ignored `generated-artifacts/` so they can be recreated from source.
- Label every generated trace and dashboard record as illustrative synthetic data, never as site measurements.

## Product

HEATGUARD demonstrates synthetic truck passes by a proposed scanner point, an alternate route for Case B event flags in the simulation, and a searchable example record. It supports sample-case review, operator-action updates, and JSON/CSV export.

## User preferences

- Keep the project within the emergency 24-hour schedule and the zero-software-budget constraint in the supplied brief.

## Gotchas

- All waveforms, event records, alert states, and displayed values are synthetic. Do not claim validated detection performance, detection range, target outlines, thresholds, or automatic mine-control shutdown.
- The alternate route is a visual simulation only; it does not control trucks, dispatch, equipment, sensors, or operators.
- The required opening/end-card disclaimer must remain verbatim in the video.
- Site filming, testing, and operating response require supervisor direction and Barrick HSE approval.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
