# Kumisi Lake Sanctuary

A modern web platform for the Kumisi Lake Bird Sanctuary in Georgia, featuring conservation tracking, wildlife photography, AI-powered ornithology insights, and sanctuary management tools.

## Features

- **Public Sanctuary Portal** — Visitor information, migration updates, photo gallery, and healing waters education
- **Admin Dashboard** — Blog management, photo gallery moderation, species tracking, and analytics
- **AI Ornithology Guide** — Gemini-powered Q&A strictly focused on Lake Kumisi ecosystem
- **Migration Telemetry** — Live tracking visualization of tagged flocks along the Black Sea flyway
- **Responsive Design** — Mobile-first glassmorphism UI with Tailwind CSS

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS 4
- **Backend**: Node.js, Express, Vercel Serverless Functions
- **AI**: Google Gemini API (`@google/genai`)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- Gemini API key ([get one here](https://aistudio.google.com/apikey))

### Installation

```bash
# Clone the repository
git clone https://github.com/SatoruGoj0/Kumisi.git
cd Kumisi

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your GEMINI_API_KEY
```

### Development

```bash
npm run dev
```

The app runs at `http://localhost:3000` with hot module replacement.

### Production Build

```bash
npm run build
npm start
```

### Vercel Deployment

1. Import the repository in [Vercel](https://vercel.com)
2. Add environment variables:
   - `GEMINI_API_KEY` — Your Gemini API key
   - `APP_URL` — Your deployment URL
3. Deploy — Vercel automatically builds and serves the app

## Project Structure

```
├── api/                 # Vercel serverless API routes
│   └── index.ts         # Express app entry for Vercel
├── src/
│   ├── components/      # React components
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminLoginModal.tsx
│   │   ├── AnalyticsView.tsx
│   │   ├── ArticleModal.tsx
│   │   ├── BlogManagerView.tsx
│   │   ├── GalleryManagerView.tsx
│   │   ├── HeaderPublic.tsx
│   │   ├── NewEntryModal.tsx
│   │   ├── OrnithologyAiGuide.tsx
│   │   ├── PublicGalleryModal.tsx
│   │   ├── PublicSanctuary.tsx
│   │   ├── SettingsModal.tsx
│   │   ├── Sidebar.tsx
│   │   └── VolunteerModal.tsx
│   ├── data.ts          # Initial data constants
│   ├── index.css        # Global styles & Tailwind
│   ├── main.tsx         # React entry point
│   └── types.ts         # TypeScript interfaces
├── server.ts            # Express server (local dev + Vercel)
├── vercel.json          # Vercel routing configuration
└── vite.config.ts       # Vite build configuration
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Required for AI endpoints (draft posts, species insights) |
| `APP_URL` | Base URL of the deployed application |

## Admin Access

The admin panel is accessible via `?admin=true` query parameter or `#admin` hash. Demo passcode: `kumisi2024`

## License

ISC
