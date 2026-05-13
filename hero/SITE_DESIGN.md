# SERA — Site Architecture, Copy, & Funnel Design

Derived from `hero/RESEARCH.md`. Positioning lane: **premium · research-first · institutional · club-coded**, with public discoverability preserved (gate at *checkout*, not at hero — see RESEARCH §5 "The Amino Club question"). Visual register: blackout-premium (Maximus / Aesop), single-subject hero photography, dense-detail trust plate inside the composition. Compound anchor: **BPC-157** (highest search intent + strongest narrative — RESEARCH §5).

Catalog of 13 SKUs to architect around:

| SKU | Class | Functional category |
|---|---|---|
| BPC-157 10mg | Pentadecapeptide | Recovery / Repair |
| TB-500 10mg | Thymosin β4 fragment | Recovery / Repair |
| GHK-Cu 50mg | Copper tripeptide | Dermal / Regenerative |
| CJC-1295 w/ Ipamorelin | GH secretagogue blend | Performance / GH axis |
| Tesamorelin 10mg | GHRH analog | Metabolic / GH axis |
| IGF-1 LR3 1mg | IGF analog | Performance / Anabolic |
| MOTS-c 10mg | Mitochondrial peptide | Metabolic / Mitochondrial |
| 5-Amino-1MQ 5mg | NNMT inhibitor (small molecule) | Metabolic |
| NAD+ 100mg | Coenzyme | Longevity / Energetic |
| KLOW 80mg | GHK-Cu / KPV / BPC-157 / TB-500 blend | Dermal+systemic regenerative |
| GLOW 70mg | GHK-Cu / BPC-157 / TB-500 blend | Dermal regenerative |
| GLP-3 10mg | Retatrutide analog | Metabolic / GLP axis |
| SERA H₂O 10mg | Bacteriostatic water | Reconstitution |

---

## 1. Information architecture

Five top-level surfaces. Every page is publicly crawlable; the gate is at **`/checkout`** only.

```
/                         Hero — BPC-157 single-subject; club mention; secondary "All compounds"
/catalog                  Functionally categorized grid (Recovery · GH Axis · Metabolic · Dermal · Blends · Foundations)
/compounds/[slug]         PDP / encyclopedia hybrid — one per SKU (×13)
/protocols                Protocol Index — stacks, named, with linked SKUs
/protocols/[slug]         Single protocol page (BPC+TB stack, GHK+KLOW dermal, etc.)
/research                 Research desk — methods, lab partner, COA archive, ingredient sourcing
/research/coa/[batch]     Indexable per-batch COA pages (SEO + trust)
/glossary                 A–Z reference — every term in the funnel resolves here
/journal                  Long-form editorial (Substack-style, named research-director byline)
/club                     Club mechanics — what membership unlocks (free; gate is "members-only checkout")
/account                  Sign in / sign up
/checkout                 Members-only (the single gate)
/legal/research-use       RUO disclosure (footer link, NOT above the fold — RESEARCH §5 directive)
```

**Why this shape:**
- **Public PDPs + per-batch COA URLs** recover the SEO surface Amino Club forfeits (RESEARCH §5.2).
- **Protocols** is the whitespace play — RESEARCH §3 identifies "third-party-indexed protocol libraries" as underplayed in the category.
- **Glossary** + **Journal** + **Research desk** together build the "Director of Research" voice without naming a founder face (RESEARCH §5 NOT-do list).
- **Club** as a thin page (not a gate) — the word earns itself via the COA drop ritual and the journal byline, not via a wall.

### Global nav (top-right)
`Catalog · Protocols · Research · Journal · Sign in →`

### Footer
`Catalog · Protocols · Research desk · COA archive · Glossary · Journal · Club · Contact · Research-use disclosure · Shipping & reshipment`

---

## 2. Page-by-page structure & copy

### 2.1  `/`  Hero (the BPC-157 frame)

**Layout:** single bottle, right-third of the frame, near-black warm background, off-white type left. One inline data plate. One primary CTA. One quiet club signal.

**Above the fold (verbatim):**

> **Recovery, engineered.**
> BPC-157 · 5mg lyophilized · ≥99% HPLC · Janoshik-verified per batch.
>
> [ Purchase ]    View all compounds →
>
> *Members-only checkout · Free to join*

**Inline data plate (right of bottle, small caps, mono):**
```
COMPOUND      BPC-157
MASS          10 MG · LYOPHILIZED
PURITY        ≥99.2% HPLC
BATCH         SR-251104
COA           VIEW ↗
LAB           JANOSHIK ANALYTICAL · ISO-17025
```

**Below-the-fold scroll order (one panel each, no icon-tile row):**
1. **The three SKUs that anchor the launch** — BPC-157 · GHK-Cu · TB-500, single-line each, photographs not icons.
2. **What you get with every vial** — Per-batch COA · 24h cold-pack shipping · Reshipment on damage/loss · US-bottled. Set as a four-line block, not four tiles.
3. **Protocol of the month** — one named protocol (e.g. "Tendon repair stack: BPC-157 + TB-500, 8 weeks") linking into `/protocols/...`
4. **From the journal** — most recent post, byline + 2-line dek.
5. **The club** — two sentences. *"A free membership for buyers who want their chemistry documented and their protocols read. Checkout is members-only. Discord, COA drops, and the journal come with the account."*
6. **Footer.**

**Do not:** four icon trust tiles, three-bottle grid, athlete lifestyle photo, RUO disclaimer above the fold, founder face, "Shop now" verb. (All directly from RESEARCH §5.)

---

### 2.2  `/catalog`  The full catalog

Functional categories (Amino Club lifted this and won — RESEARCH §2 Amino Club), ordered by anchor-traffic descending:

```
RECOVERY & REPAIR        BPC-157 · TB-500
GH AXIS                  CJC-1295 / Ipamorelin · Tesamorelin · IGF-1 LR3
METABOLIC                MOTS-c · 5-Amino-1MQ · GLP-3
DERMAL & REGENERATIVE    GHK-Cu · GLOW · KLOW
LONGEVITY                NAD+
FOUNDATIONS              SERA H₂O (bacteriostatic water)
```

Each tile = bottle photograph, name, mass, one-line mechanism, from-price, COA pill. No "BUY" verb on the tile — clicking opens the PDP, where "Purchase" is the action. Filter chips at top: `All · Recovery · GH Axis · Metabolic · Dermal · Longevity · Blends · Foundations`.

Above the grid, single line of context:
> Thirteen compounds. Each one characterized to identity and purity by an independent lab. Browse by mechanism.

---

### 2.3  `/compounds/[slug]`  PDP / encyclopedia hybrid

This is the highest-value template in the build — every SKU page is a research monograph + buy button (RESEARCH §3 patterns d & a). One template, 13 instances.

**Section order:**

1. **Hero strip.** Bottle left, data plate right, `Purchase` button, price, in-stock pill.
2. **At a glance.** Six lines: Class · Mass · Form · Reconstitution volume · Storage · Half-life.
3. **Mechanism.** 2–3 paragraphs in plain English. Mechanism → effect → why-people-research-it. No therapeutic claims.
4. **Research summary.** 4–8 cited studies, each as: Title · Authors · Year · Journal · 1-sentence finding · DOI link. Pulled from PubMed; this is the SEO bait per RESEARCH §3(d).
5. **Common protocols.** Linked to `/protocols/...` — never a "how to take it" instruction; phrased as "research literature most commonly reports the following dosing schedules" with citations.
6. **Quality & sourcing.** Identity test method (HPLC, LC-MS), purity threshold, batch-by-batch COA archive link, lab partner name (Janoshik), US bottling note, reconstitution recommendation (link to SERA H₂O).
7. **Stacks it appears in.** Cross-link to KLOW/GLOW/protocols.
8. **FAQ.** 6–10 Q&As scoped tightly to *research* questions (storage, reconstitution, purity methodology, COA reading) — NOT clinical questions ("is it safe for me"). The FAQ is also where long-tail SEO compounds.
9. **Glossary mentions.** Auto-linked terms in body copy resolve to `/glossary#term`.
10. **Disclosure footer.** RUO language here, not above.

**Copy register sample (BPC-157 mechanism):**
> BPC-157 is a synthetic 15-amino-acid sequence derived from a fragment of human gastric juice protein. Research literature describes it primarily as an angiogenic and cytoprotective agent — meaning it has been studied for its role in promoting the formation of new microvasculature and protecting epithelial tissue under stress. The bulk of the published work to date has been preclinical, with rat and mouse models of tendon transection, gastric ulceration, and ischemia-reperfusion injury dominating the literature. Human trial data is sparse but growing.

(Notice: no "heals your gut," no "fixes tendons," no second-person address. This is the institutional voice RESEARCH §5 calls for.)

---

### 2.4  `/protocols`  Protocol Index — *the whitespace play*

The Protocol Index is the page no competitor has built cleanly (RESEARCH §3). It is a curated list of named stacks, each with its own URL, its own monograph, and direct links to the constituent SKUs.

**Index layout — table, not card grid:**

| Protocol | Compounds | Duration | Surface |
|---|---|---|---|
| Tendon & joint repair | BPC-157, TB-500 | 6–8 wk | Systemic |
| Post-surgical recovery | BPC-157, TB-500, GHK-Cu | 8–12 wk | Systemic + dermal |
| GH-axis foundation | CJC-1295 / Ipamorelin | 12 wk | Endocrine |
| Lean recomposition | Tesamorelin, 5-Amino-1MQ | 16 wk | Metabolic |
| Mitochondrial baseline | MOTS-c, NAD+ | 8 wk | Mitochondrial |
| Topical regenerative | GHK-Cu, GLOW | Daily ongoing | Dermal |
| Multi-tissue regenerative | KLOW (BPC+TB+GHK+KPV blend) | 6 wk | Compound blend |
| Body composition (GLP-class) | GLP-3, 5-Amino-1MQ | Titrated | Metabolic |
| Anabolic adjunct | IGF-1 LR3 | 4 wk on / 4 off | Performance |

Each row links to `/protocols/[slug]`.

**`/protocols/[slug]` template:**
- Stack name, one-sentence rationale, target tissue/system
- The compounds (with mechanism cross-link)
- Reported dosing in the literature (citation-anchored, not prescriptive)
- Reconstitution math (links to SERA H₂O)
- Storage & timing notes
- Cited references
- "Buy this stack" — adds all three SKUs to cart in one click (a soft conversion mechanic; the SKUs are individually priced, no fake bundle discount unless the user wants one)

---

### 2.5  `/research`  Research desk

Five blocks on one page:

1. **Methodology.** How SERA characterizes a batch: HPLC-UV identity → LC-MS confirmation → endotoxin (LAL) → sterility (USP <71>). Plain prose, no marketing voice.
2. **Lab partner.** Janoshik Analytical · ISO-17025 accredited · independent of SERA · linked to their own site. (This is the single biggest credibility lever Amino Club lacked — RESEARCH §2 Amino Club weakness 4.)
3. **COA archive.** Sortable table — Batch · Compound · Date · Purity · COA PDF. Every row links to `/research/coa/[batch]` which is its own indexable URL with the PDF embedded + structured data.
4. **Sourcing & manufacturing.** Country of API synthesis, US bottling facility, cold-chain logistics one paragraph each. Honest about what is and isn't domestic.
5. **Research log.** Reverse-chronological updates from the research desk: new lab partners added, methodology changes, batches retired, anomalies disclosed. This is the *ritual* the club word needs to earn itself.

---

### 2.6  `/journal`  The editorial layer

Substack-style. Named byline (e.g. "SERA Research Desk" — institutional, not personal, per RESEARCH §5 directive against founder face). Posts are long-form, citation-heavy, and *never therapeutic*. Topics:

- "How to read a peptide COA: identity, purity, and the four numbers that matter"
- "BPC-157: what the rat tendon studies actually say"
- "Reconstitution math without panic: a researcher's reference"
- "The 2026 503A list and what it means for the research market"
- "Why we publish per-batch — and what changed in our methodology this quarter"

Each post: 1500–3000 words, 8–15 citations, no CTA banners inside the body, one quiet inline product mention if relevant, comments off.

---

### 2.7  `/glossary`  A–Z reference

Every italicized or hover-underlined term anywhere on the site links here with a fragment anchor. This is the term-disambiguation surface that lets the PDPs stay readable for newcomers without dumbing down. Sample entries:

- **Bacteriostatic water** — Sterile water containing 0.9% benzyl alcohol as a preservative. Used to reconstitute lyophilized peptides for solubility and to inhibit microbial growth across repeated vial entries. SERA H₂O is the in-house reference.
- **COA (Certificate of Analysis)** — A document issued by an analytical laboratory reporting the results of identity, purity, and contaminant testing on a specific batch of material. Per-batch COAs are the dominant trust mechanism in the research-peptide market.
- **GH axis** — The somatotropic axis: hypothalamic GHRH → pituitary GH → hepatic IGF-1. Peptides like CJC-1295, Ipamorelin, and Tesamorelin act at distinct nodes of this axis.
- **HPLC** — High-performance liquid chromatography. The primary technique used to assess peptide purity by separating molecular species by polarity. SERA reports purity as the area-percent of the principal peak.
- **Lyophilized** — Freeze-dried. The standard storage form for research peptides — a powder that is reconstituted in bacteriostatic water before use.
- **Pentadecapeptide** — A peptide composed of 15 amino acids. BPC-157 is the most-studied example.
- **RUO (Research Use Only)** — A regulatory classification indicating material is intended for laboratory research and is not approved for human or animal therapeutic use.
- **Reconstitution** — The process of dissolving a lyophilized peptide in solvent (typically bacteriostatic water) to produce a usable solution.
- ... ~60 entries total at launch.

---

### 2.8  `/club`  The club page

Two-screen page. NO gate, NO email field, NO "exclusive access" rhetoric.

> **The club.**
> A free membership for the buyers who want their chemistry documented and their protocols read carefully.
>
> What it includes:
> · Members-only checkout (the only thing actually gated)
> · Per-batch COA drops to the research log
> · The journal (no email required, but the account remembers you)
> · A read-only research Discord — peer discussion, no vendor posts
> · Reshipment on any damaged or lost vial, no questions
>
> [ Create account ]   Sign in →

That is the entire page. The club is loud-quiet — present, named, but the *thing* doing the convincing is the COA drop ritual and the journal byline, not the page itself.

---

## 3. Funnels

### 3.1  Primary funnel: organic search → PDP → checkout

```
Reddit / Google search ("BPC-157 for sale", "GHK-Cu protocol")
        ↓
Lands on /compounds/bpc-157 OR /protocols/tendon-repair
        ↓
Reads monograph, scrolls to COA, opens batch PDF
        ↓
"Purchase" → cart
        ↓
Cart → "Members-only checkout · Free to join" prompt
        ↓
Account creation (email, no password if magic-link; 30 seconds)
        ↓
Checkout (crypto + ACH only — common in category)
        ↓
Order confirmation → email → tracking → unboxing photo on Reddit
```

The gate at checkout is the only friction. Everything before it is public and crawlable.

### 3.2  Education funnel: glossary / journal → catalog

```
Search query like "how to read a peptide COA"
        ↓
Journal post → inline glossary links → /research methodology
        ↓
Footer cross-link → /catalog
        ↓
Funnel 3.1 resumes
```

### 3.3  Protocol funnel: stack-curious buyer

```
Reddit thread / search "BPC TB-500 stack"
        ↓
/protocols/tendon-joint-repair
        ↓
"Buy this stack" → 2 SKUs in cart
        ↓
Funnel 3.1 resumes from cart
```

### 3.4  Returning-customer funnel: COA-drop ritual

```
New batch COA published
        ↓
Email to members ("Batch SR-260420 · GHK-Cu · 99.7% · COA published")
        ↓
Lands on /research/coa/SR-260420 (their compound, their interest)
        ↓
Same page links "Reorder this compound" → /compounds/ghk-cu#purchase
```

This is the ritual that gives "club" its meaning. It is also the lowest-CAC reactivation in the category and nobody runs it cleanly today.

### 3.5  Discoverability funnel (organic mention, not paid)

Three mechanisms, all explicitly *not* influencer-paid (per RESEARCH §3(b) and the user's framing):

1. **The bottle.** SERA's vial photography is distinctive enough to be recognizable in Reddit unboxing photos — the Sports Technology Labs green-bottle lesson (RESEARCH §3.b). Investment: real product photography on every PDP, plus a free `/press` page with high-res shots.
2. **The COA-drop ritual.** Recurring research-log posts that get shared because they are useful, not because they pitch.
3. **The journal.** Editorial that ranks for query categories nobody else writes for ("how to read a peptide COA", "what changed on the 503A list this quarter"). Each post is a permanent SEO asset.

---

## 4. Voice, copy register, and the things we never say

**Voice:** institutional, dry, declarative. Past-tense and conditional moods preferred ("the literature reports", "researchers have characterized") over imperative ("take this, feel that"). Second-person ("you") is almost entirely absent from PDPs and protocols — it returns only in the club and account pages where you are addressing the *member*, not the buyer.

**The forbidden list** (from RESEARCH §5 + regulatory context):
- "Heals", "cures", "treats", "fixes", "fights aging"
- "Lose weight", "build muscle", "burn fat" — even in protocol pages
- "Doctor recommended", "FDA approved" — neither is true; saying it is the kind of claim that triggers a warning letter (RESEARCH §1 on FDA September 2025 enforcement)
- "Take", "use", "dose" — replaced with "the literature reports dosing of…"
- "Shop", "deal", "sale", "exclusive offer"
- "Game-changer", "next-gen", "revolutionary"

**Allowed and encouraged:**
- "Characterized to ≥99% identity"
- "The literature describes…"
- "Reported in preclinical models…"
- "Per-batch documentation"
- "Members-only checkout"
- "Research desk"

---

## 5. Build order (suggested)

A six-step sequence that gets the site shipped without overbuilding. Each step ends with something live.

1. **Hero (`/`).** BPC-157 single-subject composition + data plate + club mention. The existing `index.html` already has the bottle-reveal video — repurpose it as the hero asset and replace the placeholder copy.
2. **One PDP — BPC-157.** Build the monograph template against the one SKU with the most traffic. Make it the reference for the other 12.
3. **`/catalog`** with the functional categorization and 13 tiles.
4. **The remaining 12 PDPs** — clone the BPC-157 template, fill in. Each PDP is ~half a day if the literature work is pre-done.
5. **`/research` + first `/research/coa/[batch]` page** — once these exist, the trust frame is real.
6. **`/protocols` index + 3 anchor protocols** (Tendon repair · GH-axis foundation · Topical regenerative). Journal and glossary follow as a continuous fill-in.

`/journal`, `/glossary`, and `/club` can each ship at v0 with three entries, the most-needed 40 terms, and the two-screen club page respectively. They compound over time; none of them blocks launch.

---

## 6. Three open questions for the user to decide

1. **Founder voice or institutional voice in the journal?** RESEARCH §3(e) calls out BioLongevity's founder-as-educator model as the closest competitive precedent. This design defaults to **institutional** (no founder face) because the user wants out of the influencer pattern. If a founder/research-director wants to put their name on the journal, the architecture supports either — just swap the byline.
2. **Is the gate at checkout the right depth?** RESEARCH §5 argues for gating *checkout* rather than the whole catalog. Amino Club gates the catalog and wins positioning but loses SEO. The recommendation here is the inverse. Worth a deliberate yes/no before build — the difference touches every page.
3. **GLP-3 (retatrutide analog) on the catalog vs. quietly held back?** RESEARCH §1 notes the September 2025 FDA warning-letter wave was *specifically* aimed at GLP-1-adjacent vendors with comparative claims. GLP-3 is the highest-risk SKU in the launch list. Options: (a) ship it with the most disciplined copy on the site, (b) ship it but make the PDP harder to find (no catalog tile, only reachable from a protocol page), or (c) hold it until after the July 2026 PCAC meeting. Worth deciding now because it changes the catalog grid.
