# serponado-jarvis

JARVIS beobachtet den SEO-Contest 2026 für das Keyword **Serponado**.

## Features
- 📊 Live-Rankings via DataForSEO
- 🔍 Teilnehmer-Monitor mit KI-Bewertung
- 🤖 Chat mit JARVIS (powered by Claude)

## Setup

### 1. Dependencies installieren
```bash
npm install
```

### 2. Environment Variables

In Vercel unter **Settings → Environment Variables**:

```
DATAFORSEO_LOGIN=deine@email.de
DATAFORSEO_PASSWORD=dein_passwort
ANTHROPIC_API_KEY=sk-ant-...
```

### 3. Lokal entwickeln
```bash
npm run dev
```

### 4. Deployen
```bash
# Vercel CLI
vercel deploy
```

Oder: GitHub Repo mit Vercel verbinden → automatisches Deploy bei jedem Push.

## Projektstruktur
```
serponado-jarvis/
├── api/
│   ├── rankings.js     # DataForSEO live SERP
│   ├── competitors.js  # Teilnehmer-Crawler
│   ├── analyze.js      # Claude Seiten-Analyse
│   └── chat.js         # Jarvis Chat
├── src/
│   ├── components/
│   │   ├── Rankings.jsx
│   │   ├── Competitors.jsx
│   │   └── Chat.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── vercel.json
```
