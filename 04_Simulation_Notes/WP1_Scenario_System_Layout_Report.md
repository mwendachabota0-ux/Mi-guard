# WP1 Report: Scenario and System Layout

**Date:** 19 November 2026  
**Status:** Conceptual illustration for discussion; not an engineering design  
**Current page:** Scenario layout (`/scenario`)

## Summary

WP1 combines a generic mine-site approach context with the revised conveyor-based process. The proposed sensing zone is shown on the conveyor only, after the delivery vehicle discharges into a receiving hopper. A Land Cruiser / dump-truck profile control changes only the illustrative vehicle symbol and scale; both profiles follow the same conceptual road and stop at the hopper. No sensing in the truck is implied.

The process schematic and a separate isometric-style drawing show the relative sequence through S1, S2, optional S3, a controller / timing estimate, an uncertain affected-material interval, a generic diverter and hold / reject collection, and the continuing unaffected feed path to the crusher. Both views are conceptual, relative, and not to scale.

## Interpretation of the supplied audit and sketch

The audit scope describes a delivery vehicle unloading ore into a hopper, conveyor movement toward a crusher, multiple downstream observations, an estimated affected interval, a separate reject route, and unaffected feed continuing toward the crusher. The attached hand sketch is treated as scope reference only. Ambiguous details, particularly the exact removal mechanism, are represented as generic placeholders rather than resolved engineering choices.

## Five-stage conceptual process

1. **Approach and discharge:** A delivery vehicle follows the illustrative mine approach road to the receiving hopper. Its path ends at the hopper. Material is discharged onto the conveyor.
2. **S1 initial indication:** S1 represents an initial indication of possible metal in the material after discharge.
3. **S2 confirmation:** S2 supplies a second observation. Optional S3 adds another observation point. Roles/count are not selected for an installation.
4. **Estimate affected interval and timing:** A controller concept would use sensor observations plus real conveyor movement, distance, and response inputs to estimate an affected-material interval and its arrival window. No algorithm or values are specified; the interval boundaries are visibly uncertain.
5. **Hold affected material; continue feed:** A generic diverter immediately before the crusher and a generic hold / reject chute illustrate a possible separation route. Unaffected material is depicted continuing to crusher feed after the interval clears.

The interactive walkthrough and separate process summary use these same five stages. Selecting a stage updates a polite live announcement and highlights related drawing parts. Sensor arrangement and view selectors are interactive; horizontal pan remains available on narrow screens.

## Visible assumptions and limits

- The site plan is generic, not surveyed, and all locations are relative and not to scale.
- The haul vehicle profile is for delivery / offloading context only. Both profiles travel only to the hopper.
- A generic conveyor movement / speed input is a placeholder; no sensor, encoder, or other input type is selected.
- S1 is an initial indication; S2 provides a second observation; optional S3 adds an observation.
- The controller would estimate an affected interval and arrival window using real movement, distance, and response inputs. No estimation algorithm or numerical values are specified.
- The affected-material boundaries are approximate and uncertain.
- The diverter and reject / hold chute are generic placeholders, not selected mechanisms.
- Normal feed is depicted continuing after the affected interval. No automatic crusher shutdown is shown or implied.
- No performance or safety claims are made. No live sensor input, automated control, site measurement, or validated operation is represented.

## Engineering review and controlled tests required

Final site geometry, vehicle clearances, sensor roles and count, segment-estimation method, actuator / mechanism, and operating response need engineering and site review and controlled tests. These are unresolved decisions, not implementation recommendations or approvals. Any real installation or operating response would require the applicable site approvals and safety processes.

## Current implementation

The `/scenario` page contains:

- A mine approach and conveyor process schematic plus a distinct isometric-style conceptual illustration.
- An interactive vehicle-profile selector, clearly restricted to the illustrative delivery symbol and scale.
- Two- and three-sensor selectors, a five-stage highlight walkthrough, and an aligned five-step process summary.
- A labeled proposed sensor zone on the conveyor after discharge; vehicle travel path; material path; fixed equipment; uncertain interval; reject route; and continuing crusher feed.
- A generic movement / speed input placeholder, controller / timing estimate, and visible mobile horizontal-pan affordance.

This report and the page document the concept only. They do not specify design dimensions, sensing performance, operating parameters, or an approved installation.
