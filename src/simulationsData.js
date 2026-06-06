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
  }
];

export default simulations;
