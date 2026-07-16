# Stereon CTO Attack Plan

## Executive decision

Stereon will not begin as a full photogrammetry company.

The first product is **load intelligence and execution software for repeat irregular freight**:

> Turn messy shipment data and planned orders into fewer trucks, fuller loads, and driver-ready load sheets.

The original physical-truth thesis remains strategically useful, but capture becomes an **input adapter**, not the first dependency. Known repeat items use an item master. Unknown items can later enter through guided measurement, LiDAR, photogrammetry, third-party dimensioners, or manual verification.

This is sequencing, not surrender.

## Product system

### 1. Freight Data Room

Ingest carrier invoices, consignment exports, order data, item lists, lane information and vehicle details.

Outputs:

- normalised shipment records;
- clean item profiles;
- corridor and carrier mapping;
- charge and accessorial classification;
- data-confidence flags;
- an exportable freight profile suitable for 4PL quoting.

### 2. Utilisation Intelligence

For each shipment or planned load:

- estimate deck utilisation;
- calculate per-unit freight cost;
- identify recurring low-utilisation corridors;
- surface consolidation candidates;
- estimate avoidable truck movements and dollar impact;
- distinguish theoretical capacity from operationally usable capacity.

The recommendation engine must explain every recommendation. LLMs may assist ingestion and classification, but cannot invent financial or physical conclusions.

### 3. Deck Planner

For the Vision beachhead, use a **2.5D planning model**:

- item footprints on a deck rectangle;
- configurable orientation;
- no-overlap constraints;
- height checks;
- entered weight and payload checks;
- stackability and exclusion flags;
- loading and unloading sequence;
- manual override with audit history.

Do not build general rigid-body physics, restraint certification, centre-of-gravity inference or arbitrary 3D mesh collision in the first release.

### 4. Dispatch Pack

Generate a phone-friendly and printable load sheet containing:

- vehicle and route;
- ordered item list;
- top-down load arrangement;
- loading sequence;
- dimensions and entered weights;
- DG and handling prompts;
- spare-capacity summary;
- dispatcher approval and version history.

This is the operator-facing wedge.

### 5. Capture Adapter — later

After the core workflow proves value, add capture methods behind one interface:

- barcode/item-master retrieval;
- manual dimensions;
- laser-guided measurement;
- Polycam/GLB/OBJ upload;
- phone LiDAR or photogrammetry;
- Cargo Spectre/Cubiscan/API ingestion.

The platform should be capture-agnostic. Stereon owns the verified freight record and downstream decision workflow, not necessarily the camera technology.

## Target users

### Initial beachhead

Repeat-irregular shippers with:

- recurring products or product families;
- flatbed, tautliner or project-freight movements;
- material freight spend;
- weak utilisation visibility;
- manual planning and booking;
- repeated lanes that create consolidation opportunities.

### Buyer sequence

1. Freight or operations manager
2. CFO / finance lead
3. 4PL account lead
4. TMS platform partner

The warehouse user must receive a faster workflow, not additional data-entry work.

## Technical architecture v0

### Application

- **Frontend:** Next.js + TypeScript
- **Core API:** TypeScript service layer
- **Database:** PostgreSQL
- **ORM:** Prisma or Drizzle
- **Optimisation worker:** Python using OR-Tools plus explicit geometry rules
- **Object storage:** S3-compatible storage for invoices, exports, images and model files
- **Deployment:** Railway
- **PDF generation:** server-side HTML to PDF
- **Observability:** structured logs, error tracking and immutable recommendation records

### Core data entities

- Organisation
- User
- Site
- Item
- ItemVariant
- ItemMeasurement
- VehicleProfile
- Shipment
- ShipmentLine
- Lane
- Carrier
- RateRecord
- LoadPlan
- LoadPlanItem
- Recommendation
- RecommendationDecision
- EvidenceFile

### Item fields required before planning

- item or variant ID;
- length, width and height;
- actual weight source and confidence;
- allowed orientations;
- stackability;
- maximum stack load where known;
- loading equipment required;
- DG flags;
- special-handling notes;
- effective date and version.

## Engineering principles

1. **Deterministic core, probabilistic edges.** Optimisation and savings calculations must be reproducible. AI may classify or propose mappings, never silently change physical or financial truth.
2. **Human approval is a first-class object.** Every suggested consolidation and load plan is accepted, modified or rejected by a named operator.
3. **Evidence before automation.** First prove that recommendations change real freight decisions.
4. **Manual override is not failure.** The system records why the operator changed a plan and learns the missing rule.
5. **No compliance theatre.** The product prompts, records and flags; it does not certify restraint, axle mass, route access or DG compliance.
6. **No marketplace in v0.** We expose spare capacity; we do not attempt to sell it across a network until the planning product is proven.

## Six-week attack

### Days 1–3 — Data contract and baseline

- obtain a representative Vision shipment/invoice export;
- define the canonical shipment schema;
- map the known Vision item catalogue;
- reconstruct historical loads where possible;
- produce the baseline utilisation and per-unit-cost report;
- document missing data and confidence.

### Week 1 — Freight Data Room prototype

- CSV/XLSX upload;
- field-mapping interface;
- item and lane normalisation;
- shipment table with confidence flags;
- corridor summary;
- exportable clean freight dataset.

### Week 2 — Utilisation Intelligence

- vehicle-profile library;
- deck-equivalent utilisation calculation;
- per-unit cost and load-factor metrics;
- recurring corridor analysis;
- consolidation candidate generation;
- dollar-impact explanation for each recommendation.

### Week 3 — Deck Planner

- 2.5D canvas;
- drag, rotate and snap;
- overlap and deck-boundary validation;
- orientation and stackability rules;
- planned versus unused deck area;
- save and version plans.

### Week 4 — Driver Load Sheet

- ordered loading sequence;
- mobile and PDF views;
- approval workflow;
- actual-versus-planned notes;
- photos and evidence attachments.

### Week 5 — Shadow pilot at Vision

Run alongside the existing process. Do not alter shipments without operational approval.

Measure:

- planner time;
- eligible-load coverage;
- recommendation acceptance;
- estimated avoided truck cost;
- operator corrections;
- reasons for rejection;
- actual versus planned load.

### Week 6 — Commercial proof

Package one real Vision case for Cario, Cora, MyFreight or another 4PL:

- original shipment pattern;
- detected waste;
- proposed consolidation;
- deck plan;
- driver load sheet;
- expected annual value;
- implementation requirements.

Ask for a paid design-partner pilot, not generic feedback.

## Go / no-go gates

Continue only when the evidence supports the following:

1. At least 80% of the target historical loads can be reconstructed with usable confidence.
2. The product identifies at least A$25,000 of credible annualised value for a Vision-sized account through fewer movements, consolidation, rate correction or reduced planning effort.
3. Operators judge at least three recommendations operationally feasible, not merely mathematically possible.
4. A standard load plan can be created or accepted in under five minutes.
5. Repeat items can be selected instantly without rescanning or repeated data entry.
6. At least one independent 4PL or shipper agrees to a paid or contractually serious pilot.

Pivot or kill when:

- most apparent spare capacity is unusable because of scheduling, unloading, restraint or customer constraints;
- the analysis cannot outperform a competent spreadsheet;
- operators reject the workflow;
- the annual value does not support at least A$6,000–12,000 pricing;
- external buyers treat the capability as a free TMS feature.

## Agent organisation

### Kavan — CEO and product owner

Owns customer access, commercial priority, operating context, capital and final decisions.

### GPT — virtual CTO

Owns architecture, specifications, sequencing, acceptance criteria, risk controls and review.

### Claude — founding AI engineer

Owns scoped implementation work, test generation, codebase analysis and adversarial technical review. Claude works from written issues and does not self-approve production changes.

### Specialist agents

Used only at defined gates:

- data-ingestion and document-extraction reviewer;
- optimisation reviewer;
- security reviewer;
- freight-domain reviewer;
- QA and regression reviewer.

## Immediate build order

1. Canonical data schema
2. Vision import template
3. Baseline utilisation report
4. Consolidation engine
5. 2.5D planner
6. Driver load sheet
7. Audit and decision logging
8. Capture adapter experiment
9. TMS integration

The company is now attacking a measurable decision problem, not beginning with a technically impressive input method.