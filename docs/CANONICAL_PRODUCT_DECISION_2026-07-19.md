# Stereon Canonical Product Decision — 19 July 2026

## Decision

Stereon is a **freight economics and execution layer**, not a photogrammetry company.

The product has one shared data and decision core with two eventual commercial doors:

1. **Dispatch door** for industrial shippers and dispatchers.
2. **Carrier door** for owner-drivers and small fleets.

This is an architectural unification, not permission to build two products at once.

## Build sequence

### Door 1 — Dispatch first

Vision is the design partner and has real shipment history, known recurring items and repeated corridors. Build in this order:

1. Freight Data Room
2. Utilisation Intelligence
3. Consolidation recommendations
4. Item and vehicle profiles
5. 2.5D deck planner
6. Driver load sheet
7. Configurable rate-card price engine
8. TMS integration only after standalone value is proven

### Door 2 — Carrier discovery in parallel

Run carrier interviews and concierge cost analysis while Door 1 is built. Do not build the carrier UI until the gates are met:

- cost blindness is top-three pain for at least 5 of 10 operators;
- at least 3 operators provide usable cost/job data;
- the engine materially changes at least one real quote;
- at least 2 operators agree to paid pilots.

## What is kept from the original thesis

- versioned item profiles;
- vehicle profiles;
- load-fit logic;
- load visualisation;
- pricing and invoice explanation;
- compliance prompts and audit history;
- downstream TMS integration.

## What is removed from the critical path

- photo-to-3D capture;
- mesh processing;
- CV specialist dependency;
- general 3D bin packing;
- physical or legal certification;
- marketplace/backload liquidity.

Capture remains a future adapter. Manual entry, CSV, barcode retrieval, laser measurement, Polycam and dimensioning-hardware APIs must all be able to feed the same item record.

## Technical rulings

### 1. 2.5D is the operational model

Use top-down footprint placement with height, orientation, stackability, payload and handling constraints. A lightweight 3D cuboid view may render the same plan for communication, but it is not the source of truth.

### 2. Rate cards are rules, not one formula

Do not hard-code `max(dead, cubic, pallet, deck metre)` globally. Each carrier/service/lane card defines:

- applicable charging bases;
- mutually exclusive versus additive calculations;
- minimum charges;
- fuel and accessorial treatment;
- rounding rules;
- effective dates;
- evidence source.

### 3. Compliance remains assistive

Rules are effective-dated data packs with source citations and jurisdiction scope. The product flags and records; it does not certify route access, axle mass, restraint or dangerous-goods compliance.

Western Australia and the Northern Territory require separate jurisdiction treatment because the HVNL does not apply there.

### 4. Axle outputs are advisory only

No axle calculation is shown as reliable without verified vehicle geometry, axle positions, item weights and explicit centre-of-gravity assumptions. Near-limit loads always require operational verification.

### 5. The Rate Library is a future asset, not a current moat

Shared benchmarking requires:

- explicit customer consent;
- contractual data-use rights;
- de-identification;
- minimum sample thresholds;
- outlier and quality controls;
- competition-law and privacy review;
- a clear contribution-for-insight value exchange.

Until those exist, rate records remain customer-isolated.

## Immediate evidence gates

1. Present the Vision utilisation report to Robin and Matt.
2. Confirm at least one recommendation changes a real dispatch decision.
3. Reconstruct at least 80% of target loads with usable confidence.
4. Prove at least A$25k annualised credible value for a Vision-sized account.
5. Test one independent 4PL/shipper use case.
6. Run ten small-carrier discovery conversations before building Door 2.

## Canonical one-line thesis

> Stereon turns freight records, item profiles, vehicle rules and rate cards into fewer movements, clearer load plans and defensible economics — then feeds the booking platforms instead of replacing them.
