# Sprint 01 — Vision Freight Data Room

**Sprint length:** 10 working days  
**Goal:** Convert a representative Vision freight export into a reproducible utilisation baseline and ranked consolidation candidates.

## Definition of done

A user can upload a Vision shipment file, map its columns, review normalised shipments, see utilisation and per-unit-cost metrics, and export a report containing explainable consolidation candidates.

## Epic A — Canonical data model

### A1. Shipment schema

Acceptance criteria:

- shipment has origin, destination, dispatch date, carrier, service, invoice amount and currency;
- shipment lines support quantity, item variant, dimensions, weight and DG flags;
- source values are retained alongside normalised values;
- each mapped field has a confidence and source reference;
- records can be corrected without destroying import history.

### A2. Item and variant schema

Acceptance criteria:

- exact items and configurable variants are separate;
- measurement versions have effective dates;
- dimensions, weight, orientation and stackability are represented;
- manual verification status is stored;
- historical shipments retain the item version used at the time.

### A3. Vehicle profile schema

Acceptance criteria:

- deck length, width, usable height and payload are stored;
- vehicle class and body type are represented;
- effective capacity can be reduced by configurable operational buffers;
- unknown vehicle type produces a visible confidence warning.

## Epic B — Import pipeline

### B1. CSV/XLSX upload

Acceptance criteria:

- files are validated before processing;
- original files are retained;
- failed rows are isolated rather than dropping the entire import;
- import summary shows accepted, warned and rejected rows.

### B2. Field mapper

Acceptance criteria:

- common Vision column names are suggested automatically;
- the user confirms all critical mappings;
- mappings can be saved as templates;
- numeric and date formats are previewed before import.

### B3. Normalisation

Acceptance criteria:

- lanes are normalised from origin and destination;
- duplicate shipments are flagged;
- currency and units are explicit;
- item aliases can be mapped to one item variant;
- LLM-assisted mappings are visibly proposed and require confirmation.

## Epic C — Baseline analytics

### C1. Per-load metrics

Calculate:

- shipment cost;
- cost per item/unit;
- estimated deck utilisation;
- payload utilisation where weight exists;
- unused deck-equivalent area;
- confidence score.

Acceptance criteria:

- every metric links to its source values and formula;
- missing fields never silently become zero;
- low-confidence results are excluded from headline savings by default.

### C2. Corridor analysis

Acceptance criteria:

- group by normalised origin-destination corridor;
- show shipment count, spend, average cost, average utilisation and frequency;
- support configurable date windows;
- surface repeat corridors with high variance or low utilisation.

### C3. Consolidation candidate engine v0

Rules:

- same or compatible corridor;
- configurable dispatch-date window;
- combined footprint and weight within selected vehicle profile;
- DG and handling exclusions respected where known;
- customer/service constraints can block a recommendation.

Acceptance criteria:

- recommendation includes candidate shipments, proposed date, vehicle, estimated utilisation and gross saving;
- calculation is deterministic;
- user can accept, reject or mark infeasible with a reason;
- no recommendation is described as guaranteed savings.

## Epic D — Evidence report

### D1. Vision Freight Utilisation Report

Sections:

1. data coverage and limitations;
2. freight spend and shipment profile;
3. corridor concentration;
4. utilisation distribution;
5. per-unit cost variance;
6. ranked consolidation candidates;
7. annualised value range;
8. validation actions.

Acceptance criteria:

- every headline number is traceable;
- theoretical and credible savings are shown separately;
- assumptions are listed beside the figure they affect;
- report exports to PDF.

## Non-goals

- production carrier-rate API;
- photogrammetry;
- arbitrary 3D meshes;
- automatic restraint design;
- marketplace matching;
- customer billing;
- final route or permit compliance.

## Test plan

- unit tests for dimensions, utilisation, cost and consolidation formulas;
- fixture files with missing, duplicated and malformed data;
- snapshot test for report output;
- manual review of ten reconstructed Vision loads;
- adversarial test where a mathematically valid consolidation is operationally impossible.

## Demo script

1. Upload the Vision sample file.
2. Confirm suggested field mappings.
3. Resolve item aliases.
4. Open the corridor dashboard.
5. Inspect a low-utilisation load.
6. View a proposed consolidation.
7. reject one recommendation and record why;
8. accept one candidate into a draft load plan;
9. export the evidence report.

## Sprint decision

At sprint end, choose one:

- **Advance:** data coverage and credible value justify the deck planner;
- **Repair:** problem is real but data quality requires a dedicated enrichment product;
- **Kill:** the apparent savings cannot survive operational constraints.