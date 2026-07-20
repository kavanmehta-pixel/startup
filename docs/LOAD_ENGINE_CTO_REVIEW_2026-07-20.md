# Stereon Load Engine — CTO Review

**Date:** 20 July 2026  
**Status:** Canonical engineering review of `stereon_load_engine_spec.md` and `stereon_load_engine_spec_part2.md`

## Executive ruling

The two specifications are materially stronger than the prior product documents and should become the basis of the Load Engine architecture.

They correctly identify the product's real technical asset:

> an effective-dated, auditable feasibility oracle that evaluates a load as a sequence of route states rather than as one static departure arrangement.

The core is approved subject to the corrections and sequencing below.

## Approved architectural decisions

1. **Rules are effective-dated data, never constants in solver code.** Every saved plan must retain the exact rule-pack version and source references used.
2. **HVNL is not national.** QLD, NSW, ACT, VIC, TAS and SA participate; WA and NT require separate packs.
3. **A route is a sequence of regulatory and operational states.** Axle mass, DG quantity, stability, access and unload feasibility must be re-evaluated after every drop.
4. **The first solver is 2D/2.5D.** Vision's repeat project freight is mainly floor-loaded. Height is a clearance check, while deck geometry, axle distribution and loading order are the harder constraints.
5. **The deterministic feasibility oracle is the moat.** Placement and search algorithms are replaceable. The rule/evidence layer is not.
6. **Decision support, not certification.** Outputs must expose assumptions, margins, rule packs and unresolved checks. The product never claims a load is legally certified.
7. **Truck count and realised dollars outrank utilisation percentage.** Empty space has no value unless it removes a movement, enables consolidation or is monetised.
8. **Weighbridge validation is mandatory before axle calculations are relied on operationally.**

## P0 corrections before implementation

### 1. Replace binary feasibility with tri-state results

Many checks cannot honestly return only pass/fail. They need:

- `PASS` — sufficient verified inputs and within configured margin;
- `FAIL` — confirmed breach;
- `UNKNOWN` — missing vehicle, route, restraint, DG or item data prevents a defensible result.

`UNKNOWN` must block automatic release but must not be mislabelled as illegal.

Every constraint result should carry:

- status;
- observed value;
- limit or rule;
- margin;
- input confidence;
- missing inputs;
- source reference;
- rule-pack version.

### 2. Do not use one universal 90/100 tolerance band

A universal green threshold at 90% is too crude:

- 90% of a 4.3 m height limit is 3.87 m, which would unnecessarily amber ordinary loads;
- axle calculations have significant declared-mass and centre-of-mass uncertainty;
- dimensions from engineering drawings may be much more precise;
- DG thresholds are legal step functions rather than smooth risk bands.

Use **constraint-specific margins** plus **input confidence**. Example:

- dimensions: fixed clearance buffer in millimetres;
- axle mass: percentage and absolute-tonnage buffer calibrated from weighbridge error;
- payload: manufacturer rating with declared-weight uncertainty;
- DG: exact threshold plus data-completeness gate;
- route access: `UNKNOWN` unless the route/notice data is available.

Rename `auto-approve` to `screening_status = GREEN`. Human dispatch approval remains a separate object.

### 3. Route compliance is not the intersection of jurisdiction packs alone

The statutory vehicle/load limit and legal network access are separate systems.

The engine needs two layers:

1. **Statutory rule layer** — mass, dimension, loading and declared-DG rules by jurisdiction and effective date.
2. **Route access layer** — notices, permits, road-manager restrictions, bridge/road limits and vehicle-specific approvals by route segment.

A route result should be evaluated leg by leg. Taking one global 'most restrictive jurisdiction' is useful for fast screening but is not sufficient for operational advice.

The MEL→PER design-partner lane is blocked until a minimum viable WA pack exists. NT must also be represented as outside HVNL.

### 4. C13 loadability must be equipment- and access-specific

The proposed hard rule — one straight movement from the door — is not generally correct for Vision or flatbed freight.

Loads may be:

- side-loaded by forklift;
- rear-loaded;
- crane-loaded from above;
- placed before other vehicle components;
- repositioned under a documented method.

Replace C13 with a `LoadingMethodProfile`:

- permitted access edges;
- forklift/crane/manual equipment;
- approach-clearance envelope;
- maximum lift capacity;
- turning/repositioning allowance;
- loading sequence constraints.

The straight-line rule becomes one selectable method, not the universal law.

### 5. C14 side-face contact cannot be a universal hard constraint

Requiring at least three of four side faces to contact another item or wall would reject nearly every legitimate flatbed arrangement.

Horizontal stability can be achieved through rated restraint, blocking, lashings and friction without side contact.

Therefore:

- side-contact metrics are useful diagnostics for enclosed pallet/container loads;
- they are not a universal hard constraint;
- flatbed dynamic stability must be governed by the restraint feasibility model and operator-declared equipment.

C14 should become either a profile-specific hard rule or a soft stability metric.

### 6. Restraint checks require policy, not a false claim of regulatory hierarchy

The Load Restraint Guide is official best-practice guidance and provides recognised tables and worked examples, but the legal obligation is the performance standard.

For Stereon v1:

- use LRG tables as the default accepted calculation method;
- treat alternative engineered methods as out of scope;
- call this a **Stereon product policy**, not 'the table legally wins';
- return `UNKNOWN` when headboard ratings, friction class, lashing angle, pretension or equipment ratings are missing;
- never infer rated structure strength.

### 7. Sixteen constraints need modular profiles

The engine should not activate every constraint for every load.

Use a `ConstraintProfile` selected by:

- vehicle/trailer type;
- freight type;
- loading method;
- number of drops;
- DG presence;
- stacking use;
- jurisdiction and route;
- available data quality.

Each constraint is one of:

- required;
- optional diagnostic;
- not applicable;
- unavailable due to missing data.

This prevents the universal oracle from becoming both unusable and misleading.

### 8. The literature claim is not a present-day market moat

The statement that the maximum number of constraints handled in the 158-paper review was seven is useful historical evidence about research complexity. The review covers literature through 2011.

Do not present this as proof that no modern academic or commercial system handles more today. The moat claim must be:

> Stereon integrates the specific Australian regulatory, route-state, axle, loading-method and evidence requirements needed by its beachhead.

That claim can be proven in product behaviour.

## Additional engineering rulings

### Axle mathematics

The published statics formulation is an appropriate starting point but must receive an independent maths review before production. The implementation must make coordinate conventions explicit and validate every formula against:

- published worked examples;
- synthetic force-balance fixtures;
- certified axle-group weighbridge measurements.

Centre-of-mass inputs remain the largest likely error source. Default geometric centre must be marked as an assumption, never silently treated as measured truth.

### Dangerous goods

The DG module should be table-driven and accept only operator/consignor-declared classifications.

Initial scope:

- UN/class/packing group capture;
- quantity aggregation;
- placard-threshold screening;
- incompatibility and separation rules;
- per-leg state after unloads;
- missing-document and uncertainty flags.

Do not generate or rewrite approved emergency information. Do not classify goods from free text.

Protective zones around lithium batteries are a useful planning abstraction, but their dimensions and severity must be configurable and tied to declared packaging/handling rules rather than invented globally.

### Multi-drop state engine

The strongest combined insight from both specifications is that a plan must be evaluated as:

`departure → after drop 1 → after drop 2 → ... → empty`

At each state, recompute:

- axle and gross mass;
- statutory limits;
- DG aggregate/placard state;
- support and stability of remaining freight;
- accessibility of the next drop;
- restraint assumptions for the remaining load;
- route-jurisdiction and access state.

Implement this state engine before sophisticated search.

## Revised build order

1. **Domain schemas and tri-state constraint result model**
2. **Effective-dated HVNL rule pack schema**
3. **Verified pre/post-1-August HVNL fixtures**
4. **Minimum WA and NT jurisdiction framework**
5. **Mass stack calculator: manufacturer, axle group, axle spacing and gross**
6. **Axle statics library with published fixtures**
7. **Route-state simulation across drops**
8. **Vehicle, item and loading-method profiles**
9. **2D placement and manual planner**
10. **Weighbridge calibration on real loads**
11. **Search/optimisation only after the oracle is trusted**
12. **Restraint and DG modules as structured assistive checks**
13. **3D rendering last**

## Public August calculator boundary

A public 1-August mass-limits calculator can ship before the full Load Engine only if it is deliberately narrow.

It may:

- compare selected pre/post statutory limits;
- ask for jurisdiction and vehicle configuration;
- show source-linked rule-pack results;
- state manufacturer and route access may be more restrictive;
- refuse unsupported WA/NT/PBS/permit cases.

It must not imply route approval, axle compliance or legal dispatch clearance.

## Acceptance gates for the first operational module

The axle and route-state module does not enter a live dispatch workflow until:

1. regulatory fixtures pass for both sides of 1 August;
2. all official source references are attached to rules;
3. unsupported jurisdictions return `UNKNOWN`, never a guessed result;
4. predicted axle-group masses are calibrated against at least 20 real weighbridge observations;
5. error tails are reported and used to set constraint-specific margins;
6. every plan is reproducible from saved inputs and rule-pack versions;
7. an external heavy-vehicle/load-restraint specialist reviews the output wording and operating boundary.

## Final verdict

These specifications are strong enough to move Stereon from narrative into serious engineering design.

The winning architecture is not 'an AI that packs freight'. It is:

> a deterministic, source-linked and effective-dated load feasibility system, with probabilistic ingestion at the edges, human approval at the boundary, and every route evaluated as a sequence of changing load states.

Build the oracle before the optimiser. Build confidence before automation. Render in 3D only after the underlying answer is trustworthy.
