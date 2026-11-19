# WP1 Report: Scenario and System Layout

**Date:** 19 November 2026  
**Status:** Conceptual illustration for discussion; not an engineering design  
**Current page:** Scenario layout (`/scenario`)

## Summary

WP1 began with a request to sketch the mine approach to crusher feed, vehicle path, proposed sensor zone, and equipment locations, including an alternate Land Cruiser / dump-truck pilot view.

The first HEATGUARD scenario concept placed a proposed sensing zone on the vehicle approach and let the viewer switch between Land Cruiser and dump-truck profiles. After reviewing the supplied hand sketch, the system concept changed: sensing is now shown on the conveyor **after** ore is discharged from the truck. This avoids depicting a truck-mounted sensing arrangement that could be confounded by metal in the vehicle itself.

The current WP1 illustration focuses on the conveyor process. It does not yet provide a surveyed, site-wide mine-road plan or a current Land Cruiser-versus-dump-truck sensing comparison. The haul truck is shown only as the source that tips ore into the feed hopper.

## Interpretation of the supplied sketch

The sketch appears to show a haul truck discharging ore onto a conveyor, sensing points along the moving material, and a separate path for material removed before crusher feed. Some hand-drawn details—especially the exact removal mechanism—are difficult to identify, so the current illustration uses a generic diverter and hold / reject chute as placeholders.

## Current conceptual process

1. **Discharge:** A haul truck tips ore into a feed hopper. The proposed sensing process begins downstream, after discharge.
2. **Initial indication:** Sensor 1 (S1) marks a possible metal item travelling with the ore.
3. **Confirmation and tracking:** Sensor 2 (S2) provides a further observation. An optional S3 arrangement adds another confirmation / tracking point.
4. **Estimate the affected section:** A controller concept uses sensor observations and conveyor information to estimate the affected ore section and its arrival window at the removal point.
5. **Separate and resume:** A conceptual diverter immediately before crusher feed sends the affected section to a hold / reject chute. The normal material path to the crusher is shown continuing after that section clears.

The walkthrough is an explanation of the proposed sequence only. It does not calculate a real arrival time, define the size of a contaminated section, or operate equipment.

## Equipment and relative placement shown

- Haul truck discharge and feed hopper at the start of the process.
- Conveyor carrying ore toward the crusher.
- S1 detection point, S2 confirmation point, and selectable optional S3 point.
- Controller / timing-estimate block associated with the sensing and tracking concept.
- A highlighted, illustrative affected-ore segment on the belt.
- A placeholder diverter and hold / reject chute before crusher feed.
- The normal ore path continuing to the crusher.

These positions communicate sequence and relative relationship only. They are not surveyed or dimensioned placements.

## Interactive material

The WP1 page at `/scenario` contains:

- A process schematic and an isometric-style illustration of the same conveyor flow.
- A selector for two- and three-sensor arrangements.
- A five-step walkthrough that updates the explanation and highlights the related parts of the illustration.
- Mobile horizontal scrolling for the full-width drawing.
- Labels stating that the concept is not to scale and is not for construction.

## Original vehicle-pilot scope and current status

The Land Cruiser / dump-truck selector belonged to the earlier vehicle-path concept. It was removed from the current WP1 sensing illustration because the selected approach places sensing on the conveyor, not on either vehicle. A truck remains in the drawing only to explain how ore enters the process.

The current WP1 page therefore does **not** show the full mine approach road, alternate vehicle lanes, or a Land Cruiser pilot route. If those are still required for the deliverable, they should be added as a separate site-context view that leads to the conveyor feed and makes clear that sensing occurs after discharge.

## Assumptions and limits

- The schematic, sensor count, sensor roles, affected-section boundaries, timing, and diverter arrangement are conceptual.
- No sensor technology, range, accuracy, threshold, performance value, or timing value is specified.
- A real arrival estimate would require validated conveyor speed, measured distances, material-flow behaviour, and equipment response information.
- The physical separation mechanism and reject destination have not been selected.
- No live sensor input, automated control, safety certification, site measurement, or physical test is represented.
- Engineering review, controlled testing, supervisor direction, and site / Barrick HSE approval are required before any real installation or operating response is considered.

## Recommended remaining WP1 work

1. Confirm whether the mine approach road and vehicle path should be added around the revised conveyor concept.
2. Confirm the intended roles for the two- and three-sensor arrangements and the proposed hold / reject destination with the project team.
3. Export the reviewed, labeled layout views for the technical-asset handoff after the concept is approved.
