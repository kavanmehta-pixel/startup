# Stereon Founder Meeting Ruling — 19 July 2026

## Status

This memo reconciles the 19 July founder discussion with the current Stereon Project Bible v4 and locks the points that are suitable for execution. It is not legal advice and does not replace a shareholders agreement, constitution, IP assignment or tax advice.

## 1. Product architecture ruling

### Accepted
- Vision is the first case study and demo asset.
- Product outreach can begin once a narrow Vision workflow demonstrably works; it does not need to be feature-complete.
- Engineering drawings, 3D files and ordinary documents may all be useful ingestion sources.
- The commercial value is accurate spatial planning, pallet/deck usage, quote preparation and a logistics-provider-ready load map.

### Corrected
The three inputs do **not** feed a single LLM engine. They feed separate ingestion adapters that normalise into one deterministic freight-item schema.

- Engineering drawings: extract declared dimensions, weights, annotations and revision data; human verification required.
- 3D models: calculate bounds/footprints from source geometry; preserve source file and units; human verification required.
- Documents/spreadsheets: extract item, packaging, dimensions, weight, DG and handling fields; human review required.

LLMs assist extraction and mapping. They must not decide physical fit, pallet count, deck metres, price, savings or compliance. Those outputs come from deterministic rules and geometry.

### Differentiator wording
Do not claim incumbents mainly quote on weight. Freight can be priced on dead weight, cubic weight, pallet spaces, deck metres, vehicle type, minimums and accessorials depending on service and carrier.

The stronger claim is:

> Stereon links verified item data and an actual load plan to the charge basis, so pallet spaces and deck metres are calculated from the proposed shipment rather than guessed in a quote request.

## 2. Go-to-market ruling

### Phase 1 — Vision proof
Build one narrow workflow:
1. import or create item profiles;
2. choose a vehicle/deck;
3. place items and calculate spatial utilisation;
4. generate a loader/carrier map;
5. produce quote inputs and compare them against the actual booked outcome.

The first case study must contain:
- baseline process and time;
- original quote basis;
- Stereon plan and calculated basis;
- actual carrier quote/invoice;
- operational corrections;
- quantified result or a clear non-result.

### Phase 2 — design-partner outreach
Target a small cluster of adjacent industrial shippers and logistics providers. The objective is serious discovery and design-partner commitments, not mass sign-ups.

Good evidence includes:
- data provided for a trial;
- a nominated operational user;
- access to historical quotes/invoices;
- a signed pilot or letter of intent;
- willingness to pay after a defined trial.

### Phase 3 — referral and integration motion
Ask each live customer which TMS/FMS/ERP/WMS and carrier portals they use. This identifies integrations and potential channel partners. Referrals follow demonstrated value, not merely awareness.

### Content
LinkedIn and public content are credibility and awareness tools. Founder-led outbound, referrals, design partners and platform relationships remain the acquisition engine.

## 3. Fundraising ruling

Do not use “1,000 B2B waitlist sign-ups” as a pre-seed threshold. In a narrow industrial market, 1,000 low-intent emails may be less valuable than five companies supplying data and two agreeing to paid pilots.

Fundraise when capital clearly accelerates a proven wedge, supported by some combination of:
- working Vision product and case study;
- 3–5 serious external design partners;
- 1–2 paid pilots or contractually strong LOIs;
- repeatable acquisition path;
- credible build plan and use of funds;
- clean IP and founder documents.

The raise should be driven by a financing requirement, not by a fixed valuation-triggered equity bonus between founders.

## 4. Ofload positioning

Ofload is a digital freight platform and managed carrier network with a carrier load marketplace. It is venture/growth funded, not accurately described simply as a PE-backed spare-pallet exchange.

Potential relationship:
- Stereon identifies and describes usable spare capacity before dispatch.
- Ofload may provide carrier/shipper network liquidity and transaction execution.

Do not pitch “we create the spare pallets, Ofload sells them” as the core company story. Physical spare capacity is not automatically commercially matchable because timing, route, equipment, access, loading order, liability and service constraints still apply.

## 5. Founder equity ruling

The meeting transcript does not evidence a final 85/15 agreement. It contains discussion around 75/25, a possible 15% baseline and future earn-up concepts. Treat the split as **unagreed** until both parties sign a written term sheet.

### Recommended structure
Do not issue Jayden fully vested founder equity merely for future acquisition work.

Use one of these structures:

**Founder structure** — only if Jayden is genuinely joining as a long-term co-founder with material weekly operating responsibility:
- negotiated founder percentage;
- four-year vesting;
- one-year cliff;
- reverse-vesting/buyback rights;
- explicit role, minimum commitment and IP assignment;
- good-leaver/bad-leaver terms.

**Founding GTM/advisor structure** — if the role is mainly introductions, outreach and closing support:
- materially smaller equity grant;
- milestone and time vesting;
- no automatic ownership increase based solely on money raised;
- cash commission or success fees can supplement equity where lawful and documented.

### Avoid the proposed fundraising earn-up
Do not automatically increase Jayden's founder percentage by 5–10 percentage points depending on valuation or round size. A larger raise does not itself prove individual contribution and the mechanism creates perverse incentives around fundraising, valuation and dilution.

Any additional grant should be board/shareholder-approved against defined performance milestones and issued from an agreed employee/advisor option pool.

## 6. Dilution mechanics correction

When a new investor or hire receives 10% post-transaction ownership, existing holders are normally diluted proportionately unless one founder separately transfers shares.

For an 85/15 cap table, a new 10% issuance would ordinarily leave:
- Kavan: 76.5%
- Jayden: 13.5%
- New holder: 10.0%

It would not mean 7.5% is manually taken from Kavan and 2.5% from Jayden unless the starting split were 75/25 or the founders specifically transferred those amounts.

Build a proper fully diluted cap table covering founders, option pool, SAFEs/convertibles and future rounds before agreeing percentages.

## 7. Control and decision-making ruling

“Both founders must approve all major decisions” can protect the relationship but can also paralyse the company. The proposed 1–10 care-scale is a useful conversation tool, not an enforceable deadlock mechanism.

A shareholders agreement should define:
- board composition and director appointment rights;
- reserved matters requiring both founder approvals;
- ordinary operating authority by role and budget;
- information rights;
- conflict handling;
- deadlock escalation, mediation and final mechanism;
- founder departure, vesting and share buyback;
- transfer restrictions, drag/tag and pre-emption rights.

The “founders must always retain more than 50% combined” goal is not a legal safeguard and may become impossible or commercially harmful after multiple rounds. Control depends on voting rights, board rights, reserved matters and share classes, not only aggregate percentage.

## 8. YC correction

Do not model YC as taking one-third of the company. The current standard deal is US$500,000: US$125,000 for 7% plus US$375,000 on an uncapped MFN SAFE. The final total ownership depends on subsequent financing terms and dilution.

## 9. Role clarity

Current proposed split:

### Kavan
- CEO/product owner;
- Vision and freight-domain access;
- product direction and demonstrations;
- closing design-partner conversations;
- capital strategy and strategic partnerships.

### Jayden
- founder-led GTM support;
- target-account sourcing;
- introductions and meeting generation;
- CRM discipline and follow-up;
- messaging feedback and referral development.

The transcript summary stating “Kavan acquisition, founder closes” should be rewritten because Kavan is the founder and product expert. Jayden appears to be the acquisition/CRM partner; Kavan is the product-led closer.

## 10. Immediate actions

1. Produce a two-page founder term sheet before incorporating Jayden into the cap table.
2. Decide whether Jayden is a co-founder or a founding GTM advisor; do not blur the two.
3. Appoint an Australian startup lawyer to draft the shareholders agreement, IP assignments and vesting terms.
4. Build the fully diluted cap-table model before discussing investors or engineering hires.
5. Update the Vision demo specification so engineering drawings, 3D models and documents are ingestion adapters into a common verified item schema.
6. Define the Vision case-study success metrics before the build.
7. Begin external outreach after the narrow Vision workflow works, without waiting for a polished full platform.

## Locked conclusion

The meeting produced a workable GTM sequence and a useful multimodal ingestion idea. It did **not** settle founder equity, governance or funding mechanics, and several statements require correction before they enter company documents.

Product first: verified item data → spatial plan → charge-basis inputs → carrier-ready map.

Company second: signed founder terms, vesting, IP and authority.

Fundraise third: after evidence of external pull, not after collecting an arbitrary number of emails.
