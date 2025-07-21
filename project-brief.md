# Kaidoku Cars

**Product Name:** **Kaidoku Cars**

**Tag‑line (draft):** *Decode. Decide. Drive.*

## Executive summary

This is an app idea for **Kaidoku Cars**, an "Auction-Sheet Copilot" Chrome/Edge extension backed by a Convex serverless backend.

Kenyan importers bought **≈ 63 k used Japanese cars in 2024** alone, second-highest in Africa, and the volume keeps rising ([Provide Cars][1]). Every car comes with a handwritten Japanese auction sheet that decides whether it is worth bidding on, yet decoding and translating those sheets is slow, error-prone, and expensive (₵300–1 000 per manual translation). **Kaidoku Cars** removes this friction: a **one‑click “🔍 Decode” badge** on any auction‑sheet image (JPC Trade, SmileJV, etc.) captures the sheet, runs high-accuracy OCR (Google Vision → Gemini 2.5 Pro) for instant English translation, enriches it with duty, pricing and review data, and surfaces a **Bid‑Safe Score** so users can bid with confidence in under 4 seconds.

---

## 1  Problem & opportunity

| Pain point                                                                                                   | Evidence                                                                                            |
| ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| Importers must toggle between sites or pay agents to translate sheets.                                       | Auction sites like **JPC Trade** require login and only expose the sheet image ([jpctrade.com][2]). |
| Manual decoding of symbols and grades (4.5-A vs 3-C) is non-trivial.                                         | Extensive grade code tables ([Prestige Motorsport][3]).                                             |
| Calculating landed cost and KRA duty involves five taxes whose rates changed in 2025 (import duty now 35 %). | KRA press release ([Kenya Revenue Authority][4]).                                                   |
| Market price discovery is scattered; users cross-reference OLX, Facebook, and dealers.                       | Kenya’s used-car market relies mainly on imports ([Mobility Foresights][5]).                        |

**Opportunity:** Deliver an end-to-end "decode + decide + price" workflow inside the auction page itself, charging per sheet or via subscription.

---

## 2  Goals & success metrics

| Goal       | KPI                                         | Target @ MVP+60 days |
| ---------- | ------------------------------------------- | -------------------- |
| Speed      | Time from click → score                     | ≤ 4 s (P95)          |
| Accuracy   | Word-error-rate vs manual human translation | ≤ 5 % WER            |
| Engagement | Sheets analysed per active user / week      | ≥ 10                 |
| Revenue    | Paid conversion from free tier              | ≥ 15 %               |

---

## 3  Target users & personas

1. **Solo Importer "Joseph"** – buys 4-6 cars/quarter for resale in Nairobi. Wants quick, cheap, trustworthy translations.
2. **Micro-broker "Mary"** – manages bids for 10+ clients; needs bulk history, CSV export, duty calculator.
3. **Yard Owner "Abdi"** (future): bulk API access for valuation at scale.

---

## 4  User journey & core features

<table>
<tr><th>Step</th><th>Flow</th></tr>
<tr><td>Detection</td><td>DOM scan → shows overlay badge</td></tr>
<tr><td>Capture</td><td>toDataURL → presigned R2 upload</td></tr>
<tr><td>Processing</td><td>Vision OCR (95 %+ accuracy) → Gemini translation & reasoning</td></tr>
<tr><td>Display</td><td>Side‑panel with Kanji → English, damage overlay, Bid‑Safe dial, landed‑cost table, review links</td></tr>
<tr><td>Persistence</td><td>Convex tables: users, cars, sheets, scores</td></tr>
</table>

### 4.1 Browser-extension flow

1. **Detection** – Content script scans `<img>` elements ≥ 500 × 700 px; on match injects a floating **"🔍 Decode"** badge (pattern based on Chrome content-script docs) ([Chrome for Developers][6]).
2. **Capture & upload** – Badge triggers `toDataURL`, then POSTs to `api/getUploadUrl` to obtain a presigned Cloudflare R2 link ([Cloudflare Docs][7]).
3. **Processing** – Convex action orchestrates Vision OCR → Gemini translation → enrichment jobs (async, uses Convex tasks) ([Convex][8]).
4. **Realtime feedback** – Extension subscribes to Convex query; on `status=done` shows a side-panel (Chrome Side-Panel API) ([Chrome for Developers][9]) with:

   * English sheet + overlay of damage codes
   * Bid-Safe Score dial (0–100)
   * Landed-cost breakdown
   * Links to Carwow/YT reviews

### 4.2 Backend pipeline

| Step               | Service                                                                                         | Why                                      |
| ------------------ | ----------------------------------------------------------------------------------------------- | ---------------------------------------- |
| OCR                | **Google Vision DocumentTextDetection** (1 000 free, \$1.50/1k thereafter) ([Google Cloud][10]) | 95 %+ accuracy & bounding boxes          |
| Fallback           | **Azure AI Vision Read** (Japanese handwriting supported) ([Microsoft Learn][11])               | resiliency                               |
| Translate & reason | **Gemini 2.5 Pro (text only, \$0.30/1 M input tokens)** ([Google AI for Developers][12])        | cheaper than image input, adds reasoning |
| Duty calc          | Internal module using 35 % import duty + excise + VAT rates ([Kenya Revenue Authority][4])      |                                          |
| Pricing            | VehicleMarketValue / JDM API (see separate integration)                                         |                                          |
| Storage            | Convex tables: `cars`, `sheets`, `scores`, `users`                                              |                                          |

---

## 5  Functional requirements

### 5.1 Must-have (MVP)

| ID   | Requirement                                                                        |
| ---- | ---------------------------------------------------------------------------------- |
| FR-1 | Detect auction-sheet images on **JPC Trade** and **SmileJV** authenticated pages.  |
| FR-2 | Upload image through a presigned R2 URL; no manual file save.                      |
| FR-3 | Run Vision OCR with `LANG_HINT=ja`; return blocks + vertices.                      |
| FR-4 | Translate content to English via Gemini; normalise grades & symbols.               |
| FR-5 | Compute Bid-Safe Score using heuristic weights (grade, mileage, damage).           |
| FR-6 | Calculate landed cost with configurable tax rates.                                 |
| FR-7 | Render side-panel with translation, overlay, score dial, cost table, review links. |
| FR-8 | Persist car profile; allow user to bookmark / watch-list.                          |
| FR-9 | Free tier: 5 sheets/month; pay-as-you-go afterwards via Polar.sh.                  |
| FR-9 | Logo SVG appears in extension splash screen and web dashboard header.              |
| FR-9 | Pricing‑plan gates enforced via Convex role + quota fields.                        |

### 5.2 Nice-to-have (v1.1)

* Bulk CSV export.
* Nightly repricing cron.
* Telegram bot notifications.

---

## 6  Non-functional requirements

| Category    | Requirement                                                                    |
| ----------- | ------------------------------------------------------------------------------ |
| Performance | ≤ 4 s round-trip for sheets ≤ 1 MB, ≤ 4 s P95.                                 |
| Cost        | Cloud spend ≤ \$0.005 per processed sheet at 1 k daily volume                  |
| Security    | Images deleted after 30 days; signed URLs expire in 5 min                      |
| Privacy     | Store only auction sheet + page URL + user-supplied notes                      |
| Compliance  | Meet Chrome Web Store MV3 rules (no remote code) ([Chrome for Developers][13]) |

---

## 7  Tech stack & architecture

| Layer     | Choice                                                                         | Citation / rationale                                       |
| --------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| Extension | MV3, React+Tailwind, service-worker BG, ([Use Extro](https://github.com/turbostarter/extro)) | Manifest V3 docs ([Chrome for Developers][14]) |
| Backend   | **Convex** (TypeScript)                                                        | Free startup credits & serverless reactivity ([Convex][8]) |
| Storage   | Cloudflare R2 (S3-compatible presigned URLs)                                   | ([Cloudflare Docs][7])                                     |
| OCR       | Google Vision + Azure fallback                                                 | ([Google Cloud][10], [Microsoft Learn][11])                |
| LLM       | Gemini 2.5 Pro                                                                 | ([Google AI for Developers][12])                           |
| CI/CD     | Turborepo via next-forge; GitHub Actions deploy to Vercel (web) & Chrome Store |                                                            |
| Payments  | Polar.sh (Stripe Based Payment SDK)                                            |                                                            |
| Observability | PostHog for Product Analytics & LLM Observability                          |                                                            |
| Web Analytics | Google Analytics for the marketing website + PostHog                       |                                                            |

---

## 8 Brand & design updates

| Asset        | Status                                                                                             |   |
| ------------ | -------------------------------------------------------------------------------------------------- | - |
| **Logo**     | Stylised Kanji 「解」 inside car outline; front wheel morphed into magnifying glass (black on white). |   |
| **Palette**  | sumi‑black #1C1C1C, washi‑white #F8F8F4, accent sakura‑red #D8343F                                 |   |
| **Typeface** | Inter / Nunito (trial both)                                                                        |   |
| **Layouts**  | *Stacked* (icon above text) for splash; *Horizontal* (icon left, text right) for nav‑bars          |   |

---

## 9 Cost structure (COGS)

| Component      | Unit cost (KES) | Notes                |
| -------------- | --------------- | -------------------- |
| Vision OCR     | **0.19**        | \$0.0015 / sheet     |
| Gemini 2.5 Pro | **0.34**        | 700 tokens × pricing |
| R2 storage     | \~0.0004        | delete after 30 days |
| Convex compute | 0.10            | 150 calls / sheet    |
| **Total**      | **0.65**        | ≈ \$0.005            |

---

## 10 Pricing plans

| Plan               | Monthly fee   | Included sheets | Over‑quota         | Target           |
| ------------------ | ------------- | --------------- | ------------------ | ---------------- |
| **Explorer**       | 0 KES         | 5               | n/a                | First‑timers     |
| **Pay‑as‑You‑Go**  | —             | —               | **50 KES / sheet** | Occasional       |
| **Importer Pro**   | **2 000 KES** | 100             | 30 KES / sheet     | Solo importers   |
| **Broker Plus**    | **6 000 KES** | 500             | 20 KES / sheet     | Micro‑brokers    |
| **Enterprise API** | Custom        | 2 000+          | Tiered             | Yards / fintechs |

Gross margin ≈ **98 %** at any tier.

---

## 11 Financial projections (Year 1)

|            Month | Pro users | Broker users | Pay‑go users | **Revenue (KES)** |       COGS |  Gross margin |
| ---------------: | --------: | -----------: | -----------: | ----------------: | ---------: | ------------: |
|                1 |        20 |            5 |           30 |           123 000 |      2 590 |       120 410 |
|                6 |        40 |           10 |           60 |           246 000 |      5 180 |       240 820 |
|               12 |        88 |           22 |          132 |           589 000 |     12 200 |       576 800 |
| **Year 1 total** |         — |            — |            — |     **2 467 000** | **51 922** | **2 415 078** |

Assumptions: 15 % monthly growth; plan utilisation stays within bundles.

---

## 12  Data model (Convex)

| Table    | Key fields                                           |
| -------- | ---------------------------------------------------- |
| `users`  | id, plan, freeSheetsLeft                             |
| `cars`   | id, make, model, year, vin, sheetId, priceData       |
| `sheets` | id, userId, imageUrl, visionJson, translation, score |
| `jobs`   | id, status, error, timings                           |

---

## 13  Metrics & analytics

* **Processing latency** (Vision ms, Gemini ms, network ms)
* **Score vs auction outcome** (requires optional user feedback)
* **Churn** – DAU/MAU.

---

## 14  Roadmap & timeline

| Week | Milestone                                    |
| ---- | -------------------------------------------- |
| 0    | Turborepo scaffold; Convex schema; R2 bucket |
| 1    | Extension image detection + upload (FR-1/2)  |
| 2    | Vision OCR integration, JSON stored (FR-3)   |
| 3    | Parser + Gemini translation (FR-4)           |
| 4    | Bid-Safe heuristic & duty calc (FR-5/6)      |
| 5    | Side-panel UI (FR-7)                         |
| 6    | Alpha with 10 users; gather metrics & refine |

---

## 15  Open questions & assumptions

1. Vision free-tier suffices for first 1 k sheets/month—confirm expected demand.
2. What pricing API has reliable Kenyan market values? (VehicleMarketValue vs local classifieds scrape).
3. Do we need offline support for other auction middlemen? (ADS, AAAJapan ([auctiondatasearch.jp][15], [https://aaajapan.com/][16])).
4. Confirm Gemini spending cap (US \$50/mo) acceptable.
5. Final decision on palette accent: sakura‑red or cobalt blue?
6. Which social handle format: `kaidokucars` or `kaidoku.cars`?

---

## 16  Risks & mitigations

| Risk                                             | Likelihood | Impact | Mitigation                                                                                        |
| ------------------------------------------------ | ---------- | ------ | ------------------------------------------------------------------------------------------------- |
| OCR fails due to low-res scans                   | Medium     | High   | Auto-retry with Azure Read API ([Microsoft Learn][11])                                            |
| KRA tax rates change again                       | Low        | Medium | Centralise rates in Convex config table                                                           |
| Chrome MV3 service-worker limits break long jobs | Medium     | Medium | Delegate all heavy work to Convex; BG script only handles messaging ([Chrome for Developers][14]) |

---

## 17  Appendix: reference data sources

* Google Vision pricing ([Google Cloud][10])
* Vision language support (Japanese, handwriting) ([Google Cloud Community][17])
* Azure Read language list ([Microsoft Learn][11])
* Gemini pricing ([Google AI for Developers][12])
* Convex startup plan ([Convex][8])
* Cloudflare R2 presigned docs ([Cloudflare Docs][7])
* KRA duty change ([Kenya Revenue Authority][4])
* Auction-sheet grading guide ([Prestige Motorsport][3])
* Content-script injection pattern ([Chrome for Developers][6])
* Used-car import volume to Kenya ([Provide Cars][1])

---

[1]: https://providecars.co.jp/top-10-japanese-used-car-exports-in-2024/?utm_source=chatgpt.com "Top 10 Japanese Used Car Exports in 2024 - Provide Cars"
[2]: https://www.jpctrade.com/auction_sheet_check.php?utm_source=chatgpt.com "how to check auction sheet - JPC Trade"
[3]: https://prestigemotorsport.com.au/auction-guide/ "How to Read a Japanese Auction Sheet - Prestige Motorsport"
[4]: https://www.kra.go.ke/news-center/press-release/2224-clarification-on-implementation-of-revised-current-retail-selling-price-crsp-list-for-used-motor-vehicles?utm_source=chatgpt.com "Clarification on Implementation of Revised Current Retail Selling ..."
[5]: https://mobilityforesights.com/product/kenya-used-car-market?utm_source=chatgpt.com "Kenya Used Car Market 2024-2030 - Mobility Foresights"
[6]: https://developer.chrome.com/docs/extensions/reference/api/action?utm_source=chatgpt.com "chrome.action | API - Chrome for Developers"
[7]: https://developers.cloudflare.com/r2/api/s3/presigned-urls/?utm_source=chatgpt.com "Presigned URLs · Cloudflare R2 docs"
[8]: https://www.convex.dev/pricing?utm_source=chatgpt.com "Plans and Pricing - Convex"
[9]: https://developer.chrome.com/docs/extensions/reference/api/sidePanel?utm_source=chatgpt.com "chrome.sidePanel | API - Chrome for Developers"
[10]: https://cloud.google.com/vision/pricing?utm_source=chatgpt.com "Pricing | Cloud Vision API - Google Cloud"
[11]: https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/language-support?utm_source=chatgpt.com "Language support - Azure AI Vision - Learn Microsoft"
[12]: https://ai.google.dev/gemini-api/docs/pricing?utm_source=chatgpt.com "Gemini Developer API Pricing | Gemini API | Google AI for Developers"
[13]: https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3?utm_source=chatgpt.com "Extensions / Manifest V3 - Chrome for Developers"
[14]: https://developer.chrome.com/docs/extensions/whats-new?utm_source=chatgpt.com "What's new in Chrome extensions - Chrome for Developers"
[15]: https://www.auctiondatasearch.jp/?utm_source=chatgpt.com "ADS | Auction Data Search | Japan Auto Auctions"
[16]: https://aaajapan.com/?utm_source=chatgpt.com "All Auto Auction Japan — AAAJapan.com"
[17]: https://www.googlecloudcommunity.com/gc/Developer-Tools/handwritten-text-recognition-using-Google-Cloud-Vision-V1-API/m-p/472759 "
	Solved: handwritten text recognition using  Google.Cloud.V... - Google Cloud Community
"
