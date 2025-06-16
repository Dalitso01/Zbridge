const simulations = [
  {
    id: "fintech",
    title: "Fintech Startup in Africa",
    description:
      "You are part of a team launching a mobile payments startup in Africa. Tackle regulatory, technical, and marketing challenges.",
    tasks: [
      {
        id: "fintech1",
        question:
          "Draft a pitch deck slide explaining your unique value proposition for unbanked populations.",
        fileType: "pdf,docx",
      },
      {
        id: "fintech2",
        question:
          "Identify two regulatory hurdles for fintech in your country and propose solutions.",
        fileType: "",
      },
      {
        id: "fintech3",
        question: "Design a social media campaign to build trust in your new app.",
        fileType: "",
      },
    ],
  },
  {
    id: "agritech",
    title: "Smart Agriculture Solutions",
    description:
      "You are a consultant for a farming cooperative adopting smart agriculture technologies.",
    tasks: [
      {
        id: "agritech1",
        question: "Analyze the benefits and risks of using drones for crop monitoring.",
        fileType: "",
      },
      {
        id: "agritech2",
        question:
          "Draft a training outline for farmers on using mobile apps for weather forecasting.",
        fileType: "pdf,docx",
      },
      {
        id: "agritech3",
        question: "Propose a partnership with a local university to improve soil testing.",
        fileType: "",
      },
    ],
  },
  {
    id: "healthcare",
    title: "Healthcare Access Innovation",
    description:
      "You are a project manager for a telemedicine pilot in rural Africa.",
    tasks: [
      {
        id: "healthcare1",
        question: "Identify three barriers to telemedicine adoption and suggest solutions.",
        fileType: "",
      },
      {
        id: "healthcare2",
        question: "Draft a patient privacy policy for your telemedicine platform.",
        fileType: "pdf,docx",
      },
      {
        id: "healthcare3",
        question: "Design a poster to educate communities about remote consultations.",
        fileType: "",
      },
    ],
  },
  {
    id: "renewable",
    title: "Renewable Energy for Communities",
    description:
      "You are an engineer designing a solar microgrid for an off-grid village.",
    tasks: [
      {
        id: "renewable1",
        question: "Calculate the daily energy needs for a village of 100 households.",
        fileType: "",
      },
      {
        id: "renewable2",
        question: "Draft a proposal for funding from an international NGO.",
        fileType: "pdf,docx",
      },
      {
        id: "renewable3",
        question: "Create a community training plan for maintaining the microgrid.",
        fileType: "",
      },
    ],
  },
  {
    id: "edtech",
    title: "EdTech for African Classrooms",
    description:
      "You are launching an e-learning platform for secondary schools in Africa.",
    tasks: [
      {
        id: "edtech1",
        question: "Identify two challenges in digital content delivery and propose solutions.",
        fileType: "",
      },
      {
        id: "edtech2",
        question:
          "Draft a partnership proposal for local teachers to create content.",
        fileType: "pdf,docx",
      },
      {
        id: "edtech3",
        question: "Design a marketing flyer for parents and students.",
        fileType: "",
      },
    ],
  },
  {
    id: "logistics",
    title: "Logistics and Supply Chain in Africa",
    description:
      "You are a logistics manager optimizing delivery routes for a pan-African retailer.",
    tasks: [
      {
        id: "logistics1",
        question: "Analyze the impact of poor infrastructure on delivery times.",
        fileType: "",
      },
      {
        id: "logistics2",
        question: "Propose a solution using technology to track shipments.",
        fileType: "",
      },
      {
        id: "logistics3",
        question: "Draft a report for management on cost-saving opportunities.",
        fileType: "pdf,docx",
      },
    ],
  },
  {
    id: "publicpolicy",
    title: "Public Policy for Urban Development",
    description:
      "You are a policy analyst advising a city on affordable housing.",
    tasks: [
      {
        id: "publicpolicy1",
        question: "Identify three stakeholders in urban housing and their interests.",
        fileType: "",
      },
      {
        id: "publicpolicy2",
        question: "Draft a policy brief recommending incentives for developers.",
        fileType: "pdf,docx",
      },
      {
        id: "publicpolicy3",
        question: "Design a public awareness campaign for new housing policies.",
        fileType: "",
      },
    ],
  },
  {
    id: "tourism",
    title: "Sustainable Tourism Development",
    description:
      "You are a tourism officer promoting eco-friendly travel in Africa.",
    tasks: [
      {
        id: "tourism1",
        question:
          "List two environmental risks of mass tourism and suggest mitigation strategies.",
        fileType: "",
      },
      {
        id: "tourism2",
        question: "Draft a code of conduct for tourists visiting protected areas.",
        fileType: "pdf,docx",
      },
      {
        id: "tourism3",
        question: "Create a social media post to attract eco-conscious travelers.",
        fileType: "",
      },
    ],
  },
  {
    id: "media",
    title: "Media and Digital Storytelling",
    description:
      "You are a content creator launching a podcast on African innovation.",
    tasks: [
      {
        id: "media1",
        question: "Outline three episode topics that highlight African success stories.",
        fileType: "",
      },
      {
        id: "media2",
        question: "Draft a script for your first podcast episode.",
        fileType: "pdf,docx",
      },
      {
        id: "media3",
        question: "Design a logo and cover art for your podcast.",
        fileType: "",
      },
    ],
  },
  {
    id: "entrepreneurship",
    title: "Entrepreneurship Bootcamp",
    description:
      "You are a participant in a pan-African entrepreneurship bootcamp.",
    tasks: [
      {
        id: "entrepreneurship1",
        question:
          "Identify a pressing problem in your community and propose a business idea to solve it.",
        fileType: "",
      },
      {
        id: "entrepreneurship2",
        question: "Draft a one-page business plan summary.",
        fileType: "pdf,docx",
      },
      {
        id: "entrepreneurship3",
        question: "Prepare a 2-minute pitch for potential investors.",
        fileType: "",
      },
    ],
  },
  {
    id: "greenenergy",
    title: "Green Energy Startups",
    description:
      "You are part of a team launching a solar panel distribution business in West Africa. Tackle supply chain, financing, and community adoption challenges.",
    tasks: [
      {
        id: "greenenergy1",
        question: "Draft a business model for affordable solar panel distribution.",
        fileType: "pdf,docx",
      },
      {
        id: "greenenergy2",
        question: "Identify two barriers to adoption in rural communities and propose solutions.",
        fileType: "",
      },
      {
        id: "greenenergy3",
        question: "Create a marketing flyer for local stakeholders.",
        fileType: "",
      },
    ],
  },
  {
    id: "publichealth",
    title: "Public Health Campaign",
    description: "Work with the African Health Initiative to design a malaria awareness campaign.",
    partner: "African Health Initiative",
    tasks: [
      {
        id: "publichealth1",
        question: "Research and summarize the current state of malaria in the target region.",
        fileType: "pdf,docx",
      },
      {
        id: "publichealth2",
        question: "Design a poster for the campaign using key statistics and a strong call to action.",
        fileType: "pdf,docx",
      },
      {
        id: "publichealth3",
        question: "Draft a press release to announce the campaign launch.",
        fileType: "pdf,docx",
      },
    ],
  },
];

export default simulations;