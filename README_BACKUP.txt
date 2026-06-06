ZBRIDGE — Full Clean Backup
============================
Date: June 2026
Theme: Cyber/neon (cyan on near-black, Space Grotesk + JetBrains Mono)

WHAT'S INSIDE
- src/        all source code (every page enhanced to cyber theme)
- public/     static assets + service-worker.js (offline support)
- config files (package.json etc.)

HOW TO RUN
1. Open terminal in this folder
2. npm install
3. npm start
4. Opens at http://localhost:3000

KEY NOTES
- Data file is simulationsData.js (NOT simulations.js — renamed to avoid
  a Windows/Linux case-sensitivity clash that would break Vercel deploys).
- Simulations.js (capital) = route redirect to the list page.
- AI features (ZBridgeGuide chatbot + simulation AI feedback) work locally
  but need a Vercel serverless backend + Anthropic API key to work on the
  live site. Until then they show fallback messages.

ENHANCED PAGES
Home, SimulationsList, SimulationRunner (model answers + AI feedback +
certificate + WhatsApp notify), StudentDashboard (XP/levels/badges),
Forum, Library, Podcast, Contact, PrivacyPolicy, AboutSection.

FILES ADDED THIS PROJECT
- theme.js               cyber design system
- components/Grid.js     MUI v7 Grid compatibility shim
- components/ZBridgeGuide.js   AI chatbot assistant
- aiFeedback.js          AI feedback service
- Certificate.js         branded PDF certificate generator
- notifications.js       WhatsApp/SMS via Africa's Talking
- public/service-worker.js     offline caching
