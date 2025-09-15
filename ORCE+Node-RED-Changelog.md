# ORCE Changelog - Version 2.0.0
Released: 14 September 2025

## Added
- Dark Mode — Full dark theme across the editor for a modern experience.
- Ask AI Button — New top-bar action to generate flows automatically with AI.

## Changed
- Inject Node — You can now set `msg` values directly on the node body.
- Node UI Overhaul — All nodes redesigned with a clean, flat look: updated borders, spacing, and typography.
- Sidebar — Refreshed with simplified layout, consistent icons, and a prominent New Node button.
- Toolbar — Improved zoom, fit-to-screen, and theme toggle with polished tooltips.
- Flow Editor Layout — Enhanced alignment, grid snapping, and smoother zoom/pan transitions.
- Status & Debug Indicators — Restyled with clearer contrasts for better accessibility.

## Fixed
- Zoom Bugs — Eliminated inconsistent zoom behavior across flows.
- UI Glitches — Corrected alignment issues, padding inconsistencies, and theme switching artifacts.
- Context Menu — Fixed overlapping elements and improved right-click responsiveness.
- Minor Styling Fixes — Addressed subtle color mismatches, spacing adjustments, and small visual polish.

## Maintenance
- Refactored core UI code for improved performance and stability.
- Updated dependencies for compatibility and security.

---

# Node-RED Changelog - Version 4.0.9
Released: 14 February 2025

## What’s Changed
- Fix typo in CHANGELOG (4.0.7 → 4.0.8) by @natcl in #5007
- Fix grunt dev via better nodemon ignore rules by @knolleary in #5015
- Avoid exceeding call stack when clearing message groups in Switch node by @knolleary in #5014
- Fix library icon handling within library browser component by @knolleary in #5017
- Fix debug status reporting when null by @dceejay in #5018
- Allow env var access in context by @knolleary in #5016
- Do not select group when triggering quick-add within group by @knolleary in #5022
- Update sf instance env vars when removed outside template by @knolleary in #5023
- Remember context sidebar tree state when refreshing by @knolleary in #5021
- Handle dragging node into group and splicing link together by @knolleary in #5027
- Handle undefined username when generating user icon by @knolleary in #5043
- Fix long auto-complete suggestions by @knolleary in #5042
- Add custom label for default deploy button in settings.editorTheme by @matiseni51 in #5030
- Show subflow’s flow context under node section of sidebar by @knolleary in #5025
- Prevent symbol usage warning in Monaco by @Steve‑Mcl in #5049
- Fix tooltip snapping based on typedInput type by @GogoVega in #5051
- Add details for the dynamic subscription to match the English docs by @aikitori in #5050
- Maintenance: Update for 4.0.9 by @knolleary in #5052
