# 05 · Technical Assets

**Status:** WP2 signal examples generated and awaiting review; other handoff
assets remain in progress.

Expected handoff: five-stage system-flow diagram, sample event records,
illustrative signal charts, and labeled conceptual layout stills.

Run `uv run python wp2_signal_generator.py` from the project root to regenerate
the WP2 assets under the ignored `generated-artifacts/wp2-signal-plots/`
directory:

- A 1920×1080 overview of Cases A–D and four 1920×1080 case overlays.
- A 1920×1080 signal-conditioning flow image, an editable static SVG, and a
  self-contained animated SVG showing the conceptual signal path.
- A labeled sample CSV and a JSON manifest of the seed and synthetic settings.

Review outputs before copying them into the final handoff package. Keep the
synthetic-data labels and limits visible; these files are not site data or
validation evidence.
