const simulations = [
  {
    id: "fintech",
    title: "Fintech Startup in Africa",
    category: "Finance",
    partner: "Zanaco",
    duration: "3-4 hours",
    description: "You are part of a team launching a mobile payments startup in Africa. Tackle regulatory, technical, and marketing challenges.",
    tasks: [
      {
        id: "fintech1",
        question: "Draft a pitch deck slide explaining your unique value proposition for unbanked populations.",
        fileType: "pdf,docx",
        modelAnswer: "A strong answer identifies that 60%+ of Zambians lack formal banking access and proposes a USSD-based mobile money solution (like MTN Mobile Money or Airtel Money) requiring no smartphone. The UVP should highlight: zero monthly fees, works on any phone, instant transfers, and agent network coverage in rural areas. Key slide elements: problem statement with stats, solution diagram, revenue model (transaction fees), and a map showing underserved regions."
      },
      {
        id: "fintech2",
        question: "Identify two regulatory hurdles for fintech in your country and propose solutions.",
        fileType: "",
        modelAnswer: "Strong answers for Zambia typically identify: (1) Bank of Zambia licensing requirements — solution is to partner with an existing licensed bank as a banking-as-a-service provider rather than applying for a full licence; (2) KYC/AML compliance for low-income users who lack formal ID — solution is tiered KYC where low-value accounts (under K500) require only a phone number, with full verification only at higher tiers. Reference the BoZ National Payment Systems Act 2007."
      },
      {
        id: "fintech3",
        question: "Design a social media campaign to build trust in your new app.",
        fileType: "",
        modelAnswer: "Top answers focus on WhatsApp (the primary platform in Zambia) over Instagram/Facebook. Campaign should include: community champion program (training trusted local figures as brand ambassadors), short video testimonials in Bemba and Nyanja, radio partnerships with Lusaka stations like Hot FM, and a free first-transfer promotion. Avoid heavy data-reliant content — most users are on limited bundles."
      }
    ]
  },
  {
    id: "agritech",
    title: "Smart Agriculture Solutions",
    category: "Agriculture",
    partner: "Zambia Agriculture Research Institute",
    duration: "2-3 hours",
    description: "You are a consultant for a farming cooperative adopting smart agriculture technologies.",
    tasks: [
      {
        id: "agritech1",
        question: "Analyze the benefits and risks of using drones for crop monitoring.",
        fileType: "",
        modelAnswer: "Benefits: early pest/disease detection (reduces crop loss by up to 30%), precise fertiliser mapping (cuts input costs), faster surveying of large farms. Risks for Zambia specifically: high upfront cost (a basic agricultural drone costs $2,000-$8,000), ZCAA (Zambia Civil Aviation Authority) regulations require pilot licensing, limited repair expertise locally, and battery performance in high-heat conditions. Recommendation: cooperative ownership model where 10+ farmers share one drone and costs."
      },
      {
        id: "agritech2",
        question: "Draft a training outline for farmers on using mobile apps for weather forecasting.",
        fileType: "pdf,docx",
        modelAnswer: "Effective training outlines include: Session 1 (30 min) — smartphone basics for feature-phone users; Session 2 (45 min) — downloading and navigating the Ignitia or AccuWeather app; Session 3 (60 min) — interpreting 7-day forecasts and rainfall probability; Session 4 (45 min) — linking forecasts to planting/harvesting decisions. Deliver in Nyanja with visual handouts. Partner with Zambia Meteorological Department for local data accuracy."
      },
      {
        id: "agritech3",
        question: "Propose a partnership with a local university to improve soil testing.",
        fileType: "",
        modelAnswer: "Strong proposals target the University of Zambia School of Agricultural Sciences or Copperbelt University. Structure: cooperative provides field access and soil samples; university provides lab analysis and student fieldwork hours. Deliverable: quarterly soil health reports per plot with fertiliser recommendations. Funding angle: apply jointly for FISP (Farmer Input Support Programme) or World Bank agriculture grants. Include a data-sharing agreement so university can publish research."
      }
    ]
  },
  {
    id: "healthcare",
    title: "Healthcare Access Innovation",
    category: "Healthcare",
    partner: "Zambia Health Initiative",
    duration: "3-4 hours",
    description: "You are a project manager for a telemedicine pilot in rural Africa.",
    tasks: [
      {
        id: "healthcare1",
        question: "Identify three barriers to telemedicine adoption and suggest solutions.",
        fileType: "",
        modelAnswer: "Key Zambian barriers: (1) Connectivity — solution: design SMS-first consultation flow for areas with no data; partner with Airtel/MTN for zero-rated health data. (2) Device access — solution: community health post tablet-sharing model, one device serves 50+ patients. (3) Patient trust and digital literacy — solution: train community health workers (CHWs) as telemedicine facilitators; initial consultations are CHW-assisted, not solo. Reference MoH Community Health Strategy 2021-2026."
      },
      {
        id: "healthcare2",
        question: "Draft a patient privacy policy for your telemedicine platform.",
        fileType: "pdf,docx",
        modelAnswer: "Essential clauses for Zambia: data stored locally (not overseas servers) per proposed Zambia Data Protection Act; patient consent obtained in preferred language; minimum data collection (name, age, complaint only — no unnecessary demographic data); data retention of 7 years per MoH guidelines; breach notification within 72 hours. Policy must be available in English, Bemba, and Nyanja. Include clear opt-out mechanism for data sharing with government health systems."
      },
      {
        id: "healthcare3",
        question: "Design a poster to educate communities about remote consultations.",
        fileType: "",
        modelAnswer: "Effective health communication posters for rural Zambia: use high-contrast simple illustrations (not photos — doesn't print well on low-cost printers); maximum 20 words of text; include a USSD code prominently (*123# style); show the 3-step process visually (Call → Talk to nurse → Get advice); use green and white (associated with health/safety); include Ministry of Health logo for credibility. Distribute via churches, markets, and schools — not just clinics."
      }
    ]
  },
  {
    id: "renewable",
    title: "Renewable Energy for Communities",
    category: "Energy",
    partner: "ZESCO Innovation Fund",
    duration: "3-4 hours",
    description: "You are an engineer designing a solar microgrid for an off-grid village.",
    tasks: [
      {
        id: "renewable1",
        question: "Calculate the daily energy needs for a village of 100 households.",
        fileType: "",
        modelAnswer: "Standard calculation for rural Zambia: average household uses 3 lights (LED, 5W each) x 6 hours = 90Wh; phone charging = 10Wh/day; radio = 15Wh/day. Total per household: ~115Wh/day. For 100 households: 11,500Wh = 11.5kWh/day. Add 20% buffer for losses: 13.8kWh/day. Solar panel sizing: 13.8kWh ÷ 5 peak sun hours = 2.76kW installed capacity. Recommend: 12 x 250W panels. Battery storage: 2 days autonomy = 27.6kWh (approx 20 x 150Ah 12V batteries)."
      },
      {
        id: "renewable2",
        question: "Draft a proposal for funding from an international NGO.",
        fileType: "pdf,docx",
        modelAnswer: "Target funders: USAID Power Africa, EU Energy Initiative, or GIZ EnDev. Key proposal sections: Executive Summary (1 page max); Problem Statement with village-specific data (population, current energy source, cost burden); Technical Solution with system specs and diagram; Implementation Timeline (6-12 months); Budget Breakdown (equipment 60%, installation 20%, training 10%, M&E 10%); Sustainability Plan (user tariff of K20/month covers maintenance); Team Credentials. Keep to 10 pages. Lead with impact numbers — households served, hours of light gained, economic activity enabled."
      },
      {
        id: "renewable3",
        question: "Create a community training plan for maintaining the microgrid.",
        fileType: "",
        modelAnswer: "Training plan: identify and train 2 community technicians (ideally women — better community trust retention per IRENA data); 5-day technical training on panel cleaning, battery checks, inverter troubleshooting, and fault reporting; establish monthly maintenance checklist with photo documentation sent to NGO via WhatsApp; create a community energy committee of 5 elected members to handle tariff collection and dispute resolution; set up a mobile money account for maintenance fund. Partner with TEVETA for formal technician certification."
      }
    ]
  },
  {
    id: "edtech",
    title: "EdTech for African Classrooms",
    category: "Education",
    partner: "Zambia Ministry of Education",
    duration: "2-3 hours",
    description: "You are launching an e-learning platform for secondary schools in Africa.",
    tasks: [
      {
        id: "edtech1",
        question: "Identify two challenges in digital content delivery and propose solutions.",
        fileType: "",
        modelAnswer: "Challenge 1: Intermittent electricity — solution: solar-powered tablet charging stations, offline-first app design using service workers to cache all content. Challenge 2: Teacher digital literacy gap — solution: cascade training model where 1 master trainer trains 10 school champions who each train 5 teachers; provide printed quick-reference cards alongside digital tools. For Zambia specifically, also address the ECZ (Examinations Council of Zambia) curriculum alignment requirement — all content must map to Grade 10-12 syllabi."
      },
      {
        id: "edtech2",
        question: "Draft a partnership proposal for local teachers to create content.",
        fileType: "pdf,docx",
        modelAnswer: "Proposal should offer teachers: K500-K2,000 per module created (competitive with tutoring rates); recognition as named content authors (builds professional profile); 2-day content creation workshop in Lusaka; ongoing royalty of K50 per 100 student completions. In return, teachers provide: curriculum-aligned content in their subject, reviewed by Ministry of Education inspectors. Include IP clause: platform gets licence, teacher retains copyright. Target retired ECZ examiners first — they have the curriculum expertise and available time."
      },
      {
        id: "edtech3",
        question: "Design a marketing flyer for parents and students.",
        fileType: "",
        modelAnswer: "Key messages for Zambian parents: 'Better exam results' (ECZ Grade 12 pass rate improvement), 'Free to access' or clear affordable price, 'Works on any phone'. Distribution channels: PTA meetings, end-of-term report cards insert, church bulletins. For students: emphasise peer usage ('Join 5,000 students already using it'), show relatable Zambian student imagery, include a QR code to download. Print on A5 (cheaper than A4), two-colour print to reduce cost. Avoid English-only — include a Nyanja tagline."
      }
    ]
  },
  {
    id: "logistics",
    title: "Logistics and Supply Chain in Africa",
    category: "Logistics",
    partner: "Zambia Chamber of Commerce",
    duration: "3-4 hours",
    description: "You are a logistics manager optimizing delivery routes for a pan-African retailer.",
    tasks: [
      {
        id: "logistics1",
        question: "Analyze the impact of poor infrastructure on delivery times.",
        fileType: "",
        modelAnswer: "For Zambia: Great North Road and Great East Road are key corridors but subject to seasonal flooding (Dec-March). Average truck speed on rural roads: 40km/h vs 80km/h on tarmac — doubles delivery time. RTSA (Road Transport and Safety Agency) roadblocks add 30-90 minutes per checkpoint. Weighbridge compliance: overloaded trucks are a common cost-cutting measure but risk K50,000+ fines. Recommendation: maintain a road condition database updated via driver WhatsApp reports; use rainy season buffer stock of 6 weeks at district distribution points."
      },
      {
        id: "logistics2",
        question: "Propose a solution using technology to track shipments.",
        fileType: "",
        modelAnswer: "Best-fit solution for Zambia: GPS trackers (Teltonika FMB920, ~$50 each) installed on all fleet vehicles, integrated with a simple dashboard showing live location and estimated arrival. SMS alerts to depot managers when truck is 2 hours away. For informal transporters: share live Google Maps location via WhatsApp — no app needed. Total cost for 20-vehicle fleet: ~$3,000 hardware + $200/month SIM data. Consider: Africa's Talking SMS API for automated delay notifications to customers."
      },
      {
        id: "logistics3",
        question: "Draft a report for management on cost-saving opportunities.",
        fileType: "pdf,docx",
        modelAnswer: "Report structure: Executive Summary; Current Cost Baseline (fuel, labour, maintenance, third-party haulage); Top 3 Opportunities: (1) Route optimisation — eliminate empty return trips via load-matching platform, saves 20-30% fuel; (2) Fleet maintenance schedule — predictive maintenance reduces breakdown costs by 40%; (3) Consolidate suppliers — fewer, larger orders reduce last-mile frequency. Each opportunity should show: current cost, projected saving, implementation cost, payback period. Present in K (Kwacha) — not USD — for local management."
      }
    ]
  },
  {
    id: "entrepreneurship",
    title: "Entrepreneurship Bootcamp",
    category: "Business",
    partner: "BongoHive Zambia",
    duration: "4-5 hours",
    description: "You are a participant in a pan-African entrepreneurship bootcamp.",
    tasks: [
      {
        id: "entrepreneurship1",
        question: "Identify a pressing problem in your community and propose a business idea to solve it.",
        fileType: "",
        modelAnswer: "Strong answers ground the problem in specific Zambian data (e.g., 'Lusaka has 3 million people but only 400 registered pharmacies — many areas have 4+ hour travel to access medication'). The business idea should be viable given local infrastructure: mobile-first, low capital to start, clear revenue model. Marks for: specificity of the problem, evidence/data cited, realistic solution, named target customer, and awareness of existing competitors or alternatives."
      },
      {
        id: "entrepreneurship2",
        question: "Draft a one-page business plan summary.",
        fileType: "pdf,docx",
        modelAnswer: "One-page plan must include: Problem (2 sentences); Solution (2 sentences); Target Market (specific segment with size estimate); Revenue Model (how you make money — be specific, e.g. '15% commission on each transaction'); Traction (any early evidence — even 10 interviews); Team (founder background relevant to the problem); Ask (what you need — funding, mentorship, partnerships). Avoid generic language like 'disruptive' or 'innovative' — show, don't tell. Should be readable in 90 seconds."
      },
      {
        id: "entrepreneurship3",
        question: "Prepare a 2-minute pitch for potential investors.",
        fileType: "",
        modelAnswer: "Structure: Hook (10 sec — a surprising statistic or story); Problem (20 sec); Solution (20 sec — your product in one sentence); Traction (20 sec — what you've done so far); Market size (15 sec — how big is this?); Business model (15 sec); Ask (10 sec — specific amount and what it funds); Closing (10 sec — memorable statement). Practise transitions. Common mistakes: too much time on the problem, not enough on traction, vague ask. Investors in Zambia (BongoHive, FoundersBoost) prioritise team credibility and early customer validation over projections."
      }
    ]
  },
  {
    id: "publichealth",
    title: "Public Health Campaign",
    category: "Healthcare",
    partner: "Ministry of Health Zambia",
    duration: "3-4 hours",
    description: "Work with the Zambia Health Initiative to design a malaria awareness campaign.",
    tasks: [
      {
        id: "publichealth1",
        question: "Research and summarize the current state of malaria in the target region.",
        fileType: "pdf,docx",
        modelAnswer: "Zambia has one of the highest malaria burdens globally — approximately 6 million cases annually, with children under 5 and pregnant women most vulnerable. Southern, Eastern, and Western provinces have the highest incidence. Peak transmission: December-April (rainy season). Key facts: malaria accounts for ~30% of outpatient visits in public health facilities; indoor residual spraying (IRS) and insecticide-treated nets (ITNs) are the primary prevention tools; Zambia has achieved a 60% reduction since 2000 but progress has stalled. Source: Zambia National Malaria Elimination Strategic Plan 2021-2025."
      },
      {
        id: "publichealth2",
        question: "Design a poster for the campaign using key statistics and a strong call to action.",
        fileType: "pdf,docx",
        modelAnswer: "Poster essentials: one headline stat ('Malaria kills a Zambian child every 2 hours'); single clear call to action ('Sleep under your net EVERY night'); simple illustration of a bed net in use; green/white colour scheme (health association); Ministry of Health logo; USSD code for free net distribution (*660#). Avoid: cluttered text, medical jargon, fear-based imagery of sick children (reduces trust, especially among men who make household decisions). Test with 5 community members before printing. Print in A3 for market stalls, A4 for homes."
      },
      {
        id: "publichealth3",
        question: "Draft a press release to announce the campaign launch.",
        fileType: "pdf,docx",
        modelAnswer: "Press release format: Headline (action-oriented, e.g. 'Ministry of Health Launches Nationwide Net Distribution Drive Ahead of Rainy Season'); Dateline (Lusaka, [Date]); Lead paragraph (who, what, where, when, why); Quote from Minister or PS; Key statistics; Campaign details (duration, target reach, distribution points); Quote from community leader or beneficiary; Boilerplate (about Ministry of Health); Media contact. Send to: Zambia Daily Mail, Times of Zambia, ZNBC, and Hot FM. Embargo until launch date. Keep to one page."
      }
    ]
  },
  {
    id: "banking",
    title: "Microfinance & Collateral Lending",
    category: "Banking",
    partner: "Lupiya",
    duration: "3-4 hours",
    description: "You are a loan officer at a Zambian microfinance institution assessing borrowers and managing collateral-backed loans.",
    tasks: [
      {
        id: "banking1",
        question: "A small business owner applies for a K50,000 loan offering their delivery vehicle as collateral. Outline how you would assess this application.",
        fileType: "pdf,docx",
        modelAnswer: "A strong assessment covers: (1) Borrower capacity — review 6 months of mobile money/bank statements, existing debt, and business cash flow to confirm repayment ability (debt-service ratio ideally below 40% of net income). (2) Collateral valuation — independent assessment of the vehicle's current market value, accounting for depreciation, mileage, and condition; lend no more than 60-70% of value (loan-to-value ratio) to protect against default. (3) Verification — confirm the vehicle's ownership via the white book / RTSA registration, check it's not already pledged elsewhere. (4) Character — references, repayment history with other lenders (consult the TransUnion Zambia credit bureau). Document everything for the credit committee."
      },
      {
        id: "banking2",
        question: "Explain how you would manage the risk of loan default in a portfolio of collateral-backed loans.",
        fileType: "",
        modelAnswer: "Key risk management practices: diversify the portfolio across sectors so a downturn in one (e.g. agriculture in a drought year) doesn't sink the book; set conservative loan-to-value ratios (lend well below collateral value); require collateral that's liquid and easy to repossess and resell; monitor early-warning signs (missed payments, declining deposits) and intervene early with restructuring before default; maintain a loan-loss provision (a reserve fund) sized to expected default rates; and ensure legal documentation (a registered security interest under the Movable Property Security Interests Act) so repossession is enforceable. For Zambian MFIs, regular borrower contact and community ties matter as much as paperwork."
      },
      {
        id: "banking3",
        question: "Draft a clear, fair repayment plan communication to a borrower who has missed two payments.",
        fileType: "docx",
        modelAnswer: "An effective message is empathetic but clear: acknowledge the missed payments without judgment, state the current arrears amount precisely, and open a conversation rather than threaten. Offer concrete options: a short grace period, a restructured schedule with smaller installments over a longer term, or partial payment now to bring the account current. Be transparent about consequences of continued non-payment (additional interest, eventual collateral repossession) but frame repossession as a last resort. Include a specific call to action ('please call me by Friday to agree a plan') and your direct contact. Tone should preserve the relationship — most borrowers want to pay and a workable plan recovers more than aggressive collection."
      }
    ]
  },
  {
    id: "accounting",
    title: "Audit & Financial Reporting",
    category: "Accounting",
    partner: "ZICA",
    duration: "4-5 hours",
    description: "You are a trainee auditor at a Lusaka accounting firm working through a client's year-end audit.",
    tasks: [
      {
        id: "accounting1",
        question: "The client's inventory balance increased 60% year-on-year while sales were flat. What audit procedures would you perform and why?",
        fileType: "",
        modelAnswer: "This is a red flag for overstated inventory (a common way to inflate profit/assets). Procedures: (1) Attend a physical stock count and test counts against records. (2) Test inventory valuation — confirm it's held at the lower of cost and net realisable value per IAS 2; check for obsolete or slow-moving stock that should be written down. (3) Cut-off testing — ensure purchases near year-end are recorded in the correct period. (4) Analytical review — compare inventory days/turnover to prior years and industry norms; a sharp rise with flat sales suggests obsolescence or error. (5) Inquire with management and corroborate explanations with evidence. Document professional scepticism throughout."
      },
      {
        id: "accounting2",
        question: "Explain how you would account for a piece of equipment purchased for K200,000 with a 10-year useful life, including depreciation.",
        fileType: "pdf,docx",
        modelAnswer: "Under IAS 16: capitalise the K200,000 as a non-current asset (Property, Plant & Equipment) — it's not an expense because it provides benefit over many years. Depreciate it over the 10-year useful life. Using straight-line: K200,000 ÷ 10 = K20,000 depreciation expense per year, reducing the asset's carrying value annually. Journal each year: Dr Depreciation expense K20,000, Cr Accumulated depreciation K20,000. After year 3, carrying value = K200,000 − (3 × K20,000) = K140,000. Note any residual value would reduce the depreciable amount. Review useful life and residual value annually, and test for impairment under IAS 36 if there are indicators."
      },
      {
        id: "accounting3",
        question: "Identify three ethical threats an auditor might face and how the ZICA/IFAC code addresses them.",
        fileType: "",
        modelAnswer: "Per the IFAC/ZICA Code of Ethics: (1) Self-interest threat — e.g. audit fees being a large share of firm income, or owning shares in the client. Safeguard: rotate clients, prohibit financial interests, cap fee dependency. (2) Familiarity threat — long association with the client weakens objectivity. Safeguard: rotate the engagement partner (every 7 years for listed entities). (3) Self-review threat — auditing your own firm's prior work (e.g. if the firm also did the bookkeeping). Safeguard: separate teams, or decline non-audit services for audit clients. The fundamental principles — integrity, objectivity, professional competence, confidentiality, professional behaviour — guide all judgments. When threats can't be reduced to an acceptable level, decline or withdraw."
      }
    ]
  },
  {
    id: "mining",
    title: "Mining Operations & Sustainability",
    category: "Mining",
    partner: "Zambia Chamber of Mines",
    duration: "3-4 hours",
    description: "You are an analyst at a Copperbelt mining company balancing production targets with environmental and community obligations.",
    tasks: [
      {
        id: "mining1",
        question: "Copper prices have dropped 20%. Recommend how the operation should respond without resorting to mass layoffs.",
        fileType: "pdf,docx",
        modelAnswer: "Strong recommendations protect both viability and jobs: (1) Focus mining on higher-grade ore to maintain revenue per tonne (high-grading) while prices are low. (2) Cut discretionary and capital spending, defer non-critical expansion. (3) Renegotiate supplier contracts and energy costs (ZESCO tariffs are a major mining input). (4) Reduce overtime and use natural attrition rather than retrenchment. (5) Hedge a portion of future production to lock in prices. (6) Engage government on the mineral royalty tax structure, which in Zambia is price-linked and rises with copper prices. Frame layoffs as a last resort given the social impact on Copperbelt communities and the long-term cost of losing skilled labour."
      },
      {
        id: "mining2",
        question: "Draft a community engagement plan for a mine expanding into land near a village.",
        fileType: "docx",
        modelAnswer: "An effective plan centres on Free, Prior and Informed Consent: (1) Early, genuine consultation with traditional leaders (the chief/induna) and affected households — before decisions are finalised, not after. (2) Transparent disclosure of the expansion's footprint, environmental impact (dust, water, blasting), and timeline. (3) Fair compensation and resettlement aligned with the Lands Act and IFC Performance Standards — replacement land or housing, not just cash. (4) Local benefit: prioritise local hiring, fund a community development project (clinic, borehole, school). (5) A grievance mechanism so residents can raise concerns and get responses. (6) Ongoing dialogue via a community liaison committee. Reference ZEMA (Zambia Environmental Management Agency) requirements for an Environmental Impact Assessment."
      },
      {
        id: "mining3",
        question: "Explain the environmental rehabilitation obligations a mine must plan for, and why they matter.",
        fileType: "",
        modelAnswer: "Under Zambian law (the Mines and Minerals Development Act and ZEMA regulations), mines must plan and fund rehabilitation from the start, not at closure. Obligations include: progressive rehabilitation of mined-out areas during operations; safe management of tailings dams to prevent collapse and water contamination (a major risk after global tailings disasters); treatment of acid mine drainage; reshaping and revegetating land; and a financial assurance / environmental bond set aside so funds exist even if the company fails. These matter because abandoned mines impose huge costs on communities and government, contaminate water sources people depend on, and damage the sector's social licence to operate. Planning early is far cheaper than remediation later."
      }
    ]
  },
  {
    id: "marketing",
    title: "Marketing & Brand Strategy",
    category: "Marketing",
    partner: "Airtel Zambia",
    duration: "2-3 hours",
    description: "You are a marketing associate launching a new product for a major Zambian consumer brand.",
    tasks: [
      {
        id: "marketing1",
        question: "Design a go-to-market strategy for a new mobile data bundle targeting university students.",
        fileType: "pdf,docx",
        modelAnswer: "A strong strategy: (1) Positioning — affordable, social-media-optimised bundles (zero-rated WhatsApp/TikTok) priced for student budgets. (2) Channels — campus brand ambassadors, university WiFi-zone activations, and heavy WhatsApp/TikTok promotion rather than expensive TV. (3) Pricing — micro-bundles (daily K5-K10) that match irregular student cash flow, plus a discounted semester bundle. (4) Partnerships — bundle with e-learning platforms or campus events. (5) Launch tactic — a referral mechanic ('refer 3 friends, get free data') leveraging tight student networks. (6) Metrics — track activation rate, cost per acquisition, and 30-day retention. Ground it in the reality that students are price-sensitive, mobile-first, and influenced by peers."
      },
      {
        id: "marketing2",
        question: "A competitor launches a cheaper rival product. Draft your response strategy.",
        fileType: "",
        modelAnswer: "Avoid a reflexive price war (it erodes margins for everyone). Better response: (1) Reinforce differentiation — emphasise network quality, coverage, or added value the competitor lacks. (2) Add value rather than cut price — bundle extras (free streaming, loyalty rewards) so perceived value rises without headline price dropping. (3) Segment — defend price-sensitive customers with a targeted value tier while keeping premium customers on higher-margin plans. (4) Strengthen retention — loyalty programmes and contract incentives raise switching costs. (5) Monitor — track churn and competitor uptake before overreacting. Only match price selectively if you're genuinely losing share in a key segment. Communicate confidence, not panic."
      },
      {
        id: "marketing3",
        question: "Create a social media content calendar outline for a one-month brand awareness campaign.",
        fileType: "docx",
        modelAnswer: "A practical Zambian-context calendar: Week 1 (Awareness) — teaser posts, brand story, behind-the-scenes; emphasise WhatsApp Status and TikTok where reach is highest. Week 2 (Engagement) — polls, user-generated content contest with a local hashtag, influencer collaborations with Zambian micro-influencers (more affordable and trusted than celebrities). Week 3 (Conversion) — product demos, customer testimonials in local languages, limited-time offer. Week 4 (Retention/community) — recap, thank-you posts, loyalty teaser. For each post specify: platform, format (image/video/Status), caption tone, posting time (evenings and weekends get higher engagement), and a single KPI per week. Keep production lightweight — phone-shot vertical video outperforms polished studio content on these platforms."
      }
    ]
  },
  {
    id: "law",
    title: "Corporate Law & Compliance",
    category: "Law",
    partner: "LAZ",
    duration: "4-5 hours",
    description: "You are a junior associate at a Lusaka law firm advising businesses on compliance and contracts.",
    tasks: [
      {
        id: "law1",
        question: "A client wants to register a new private limited company in Zambia. Outline the steps and key legal requirements.",
        fileType: "pdf,docx",
        modelAnswer: "Steps under the Companies Act 2017, via PACRA (Patents and Companies Registration Agency): (1) Name clearance — search and reserve the company name. (2) Prepare the application (Form 4) with registered office address, share capital, and details of directors (minimum one resident director) and shareholders. (3) Submit the Articles of Association (or adopt the standard articles). (4) Pay the registration fee. (5) Receive the Certificate of Incorporation. After incorporation: register for a TPIN with ZRA (tax), register for VAT if turnover exceeds the threshold, register with NAPSA (social security) and the Workers' Compensation fund if hiring, and obtain any sector-specific licences. Advise the client on ongoing obligations: annual returns to PACRA and tax filings."
      },
      {
        id: "law2",
        question: "Review this scenario: a supplier contract has no dispute-resolution clause. Explain the risk and draft a suitable clause.",
        fileType: "docx",
        modelAnswer: "Risk: without a dispute-resolution clause, any disagreement defaults to litigation in the Zambian courts, which can be slow, costly, and public — and there's no agreed process, so parties may waste time arguing about *how* to resolve before addressing *what*. A suitable clause should establish a tiered process: first, good-faith negotiation between senior representatives within a set period (e.g. 14 days); if unresolved, mediation; and finally binding arbitration under the Arbitration Act 2000, seated in Lusaka, conducted in English, before a single arbitrator. Specify governing law (laws of Zambia). Arbitration is often preferable for commercial contracts — it's private, faster, and the award is enforceable. Always tailor to the contract's value and the parties' relationship."
      },
      {
        id: "law3",
        question: "Explain an employer's key obligations under Zambian employment law when terminating an employee.",
        fileType: "",
        modelAnswer: "Under the Employment Code Act 2019: (1) Valid reason — termination must be for a fair reason (misconduct, poor performance, redundancy, or operational requirements), not arbitrary. (2) Due process — for misconduct/performance, follow a fair procedure: notice of the allegation, a hearing where the employee can respond, and the right to representation. (3) Notice — give the contractual or statutory notice period, or pay in lieu. (4) Redundancy — if the role is redundant, consult, follow selection criteria fairly, and pay redundancy benefits as prescribed. (5) Final dues — pay all accrued leave, salary, and benefits promptly. (6) Documentation — keep records and issue a certificate of service. Failure to follow process exposes the employer to an unfair dismissal claim before the courts or the Labour Commissioner. Advise employers to document everything."
      }
    ]
  },
  {
    id: "hr",
    title: "Human Resources Management",
    category: "Human Resources",
    partner: "ZIHRM",
    duration: "2-3 hours",
    description: "You are an HR officer at a growing Zambian company handling recruitment, culture, and employee relations.",
    tasks: [
      {
        id: "hr1",
        question: "Design a fair and effective recruitment process for hiring five new sales staff.",
        fileType: "pdf,docx",
        modelAnswer: "A fair, effective process: (1) Job analysis — clear job description and person specification with objective criteria. (2) Sourcing — advertise widely (company channels, GoBeans/job boards, LinkedIn, and notice boards) to reach a diverse pool, not just referrals. (3) Screening — shortlist against the criteria using a consistent scorecard to reduce bias. (4) Structured interviews — same core questions for all candidates, scored independently by a panel; include a practical sales scenario. (5) Verification — check references and verify qualifications. (6) Decision — document the scoring rationale. (7) Onboarding plan. Throughout, comply with the Employment Code Act and avoid discrimination (gender, tribe, disability, HIV status). Structured, criteria-based hiring is both fairer and a better predictor of performance than gut feel."
      },
      {
        id: "hr2",
        question: "Two employees have an ongoing conflict affecting the team. Outline how you would handle it.",
        fileType: "",
        modelAnswer: "A measured approach: (1) Act early — don't let it fester. (2) Meet each employee separately first to understand each perspective without taking sides. (3) Identify the root cause — is it workload, role clarity, personality, or a specific incident? (4) Facilitate a joint conversation in a neutral setting, setting ground rules for respectful dialogue, and focus on the work impact rather than personal blame. (5) Agree concrete, behavioural commitments from both and document them. (6) Follow up to confirm resolution holds. (7) Escalate to formal disciplinary process only if conduct breaches policy and informal resolution fails. Keep it confidential, stay neutral, and protect team morale. The goal is a working relationship, not friendship."
      },
      {
        id: "hr3",
        question: "Propose three low-cost initiatives to improve employee retention.",
        fileType: "",
        modelAnswer: "Low-cost, high-impact initiatives: (1) Career development — structured growth paths, internal promotion, and access to free/low-cost training (like ZBRIDGE simulations or online courses); people leave when they stop growing, and this costs little. (2) Recognition — a consistent, genuine recognition programme (peer shout-outs, employee of the month, public thanks from leadership) that costs almost nothing but strongly drives engagement. (3) Flexibility and voice — flexible hours where possible, regular feedback channels, and acting on employee input so people feel heard. Retention is driven more by management quality, growth, and recognition than by salary alone (though pay must be fair). For a Zambian SME with tight budgets, these culture levers are the most cost-effective."
      }
    ]
  },
  {
    id: "realestate",
    title: "Real Estate & Property Development",
    category: "Real Estate",
    partner: "ZIESCO Properties",
    duration: "3-4 hours",
    description: "You are an analyst evaluating property investment and development opportunities in Lusaka.",
    tasks: [
      {
        id: "realestate1",
        question: "Evaluate whether to develop a vacant plot in Lusaka into residential units or commercial space.",
        fileType: "pdf,docx",
        modelAnswer: "A sound evaluation compares both options on: (1) Demand — research the local market; residential demand is strong in growing suburbs (e.g. along the Kafue or Great East Road corridors), while commercial suits high-traffic, accessible areas. (2) Zoning — confirm the plot's permitted use with the Lusaka City Council; changing zoning is slow and uncertain. (3) Financials — build a model comparing development cost, projected rental yield, and payback for each; residential typically offers steadier occupancy, commercial higher yield but more vacancy risk. (4) Infrastructure — water, ZESCO power reliability, road access, and drainage materially affect viability and cost. (5) Risk — construction cost inflation, currency exposure on imported materials, and financing cost. Recommend with a clear financial case, not just intuition."
      },
      {
        id: "realestate2",
        question: "Explain the key legal checks before purchasing land in Zambia.",
        fileType: "",
        modelAnswer: "Essential due diligence: (1) Title verification — conduct a search at the Ministry of Lands to confirm the seller holds valid title (most Zambian land is leasehold, typically 99 years, under the Lands Act). (2) Confirm there are no encumbrances — mortgages, caveats, or disputes registered against the title. (3) Verify the seller's identity and right to sell. (4) Check for customary land issues — land under customary tenure requires the chief's and council's consent to convert and sell; many disputes arise here. (5) Confirm the plot's boundaries via a survey diagram and that it matches the physical site. (6) Confirm rates and ground rent are paid up. (7) Use a conveyancing lawyer and ensure the transfer is registered. Buying land without a title search is the single biggest avoidable risk."
      },
      {
        id: "realestate3",
        question: "Draft a tenant screening and lease summary process for a residential rental.",
        fileType: "docx",
        modelAnswer: "A clear process: Screening — collect an application with proof of income (payslips or business records showing rent is affordable, ideally rent under 30% of income), references from previous landlords and employer, and ID verification. Assess reliability without unlawful discrimination. Lease essentials — put everything in writing: parties, property description, rent amount and due date, deposit (typically 1-3 months, with clear conditions for return), lease term and renewal, who pays utilities and rates, maintenance responsibilities, and rules on subletting and notice for termination. Comply with the Landlord and Tenant Act. Conduct a documented inspection with photos at move-in and move-out to resolve deposit disputes fairly. A clear lease and good screening prevent most rental problems."
      }
    ]
  },
  {
    id: "tourism",
    title: "Tourism & Hospitality Management",
    category: "Tourism",
    partner: "Zambia Tourism Agency",
    duration: "2-3 hours",
    description: "You manage a lodge near a major Zambian tourist destination, balancing guest experience, revenue, and community impact.",
    tasks: [
      {
        id: "tourism1",
        question: "Tourist numbers drop sharply in the low season. Propose strategies to maintain revenue.",
        fileType: "pdf,docx",
        modelAnswer: "Strong low-season strategies: (1) Target the domestic and regional market — discounted packages for Zambian and SADC residents (who travel year-round), promoted via local channels and mobile money payment options. (2) Diversify revenue — host conferences, weddings, and corporate retreats that aren't weather-dependent; offer the venue for events. (3) Dynamic pricing — lower rates to fill rooms (a discounted occupied room beats an empty one) while protecting peak-season pricing. (4) Experience packages — bundle activities (guided walks, cultural visits, birding which peaks in different seasons) to add value rather than just cut price. (5) Partnerships — work with tour operators and the Zambia Tourism Agency on promotions. (6) Use the quiet period for staff training and maintenance. Diversifying who you serve and what you offer smooths the seasonal swing."
      },
      {
        id: "tourism2",
        question: "Design a guest experience plan that incorporates the local community authentically.",
        fileType: "docx",
        modelAnswer: "An authentic, beneficial plan: (1) Source locally — buy food and crafts from nearby farmers and artisans, creating income and a genuine local flavour. (2) Offer optional, respectful cultural experiences co-designed with the community (village visits, traditional cooking, storytelling) where the community sets the terms and receives fair payment — not staged performances. (3) Hire and train locally, with pathways to senior roles. (4) Support a community project (school, clinic) and let guests contribute transparently. (5) Educate guests on local customs and responsible behaviour. (6) Ensure the community has a voice in tourism decisions affecting them. The principle: tourism should benefit the community as partners, not treat them as a backdrop. This also differentiates the lodge — travellers increasingly seek authentic, ethical experiences."
      },
      {
        id: "tourism3",
        question: "Write a response to a serious negative online review about poor service.",
        fileType: "",
        modelAnswer: "An effective response: respond promptly and publicly (other travellers are reading). Thank the guest for the feedback and apologise sincerely for the specific failure without being defensive. Acknowledge what went wrong, take responsibility, and briefly explain the concrete steps you're taking to fix it (e.g. 'we've retrained our front-desk team on check-in times'). Avoid arguing, blaming the guest, or making excuses — that damages the brand more than the original review. Offer to make it right and move the detailed conversation offline ('please email me directly so I can address this personally'). Keep it warm, professional, and concise. A well-handled negative review can actually build trust by showing prospective guests how you treat problems."
      }
    ]
  }
];

export default simulations;
