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
- AI features (ZBridgeGuide chatbot + simulation AI feedback) go through
  api/claude.js, a Vercel serverless function. To switch them on, add
  ANTHROPIC_API_KEY in Vercel -> Project -> Settings -> Environment Variables
  and redeploy. Without the key they show friendly fallback messages.
  (They don't run under plain `npm start`; use `vercel dev` to test locally.)
- vercel.json sends every page URL to the app, so refreshing a page like
  /Simulation/fintech works instead of showing a 404.
- Accounts use Firebase (email/password + Google). Profiles are stored in
  Firestore at users/{uid}; firestore.rules lets each user see only their own.
  Without Firebase settings the site runs in "demo mode" (no real accounts).

FIREBASE SETUP (one time)
1. console.firebase.google.com -> Add project (Google Analytics optional).
2. Build -> Authentication -> Get started -> enable "Email/Password" and "Google".
3. Authentication -> Settings -> Authorized domains -> add your Vercel domain(s).
4. Build -> Firestore Database -> Create database (production mode, region
   europe-west or nearest), then Rules tab -> paste firestore.rules -> Publish.
5. Project settings (gear) -> Your apps -> Web (</>) -> register app -> copy the
   config values into Vercel env vars named as in .env.example -> Redeploy.

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
