import express from 'express';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let aiClient: GoogleGenAI | null = null;
function getAIClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not defined.');
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

export async function createApp() {
  const app = express();

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', serverTime: new Date().toISOString() });
  });

  // AI draft blog post endpoint
  app.post('/api/ai/draft-post', async (req, res) => {
    try {
      const { topic, category } = req.body;
      const prompt = `You are a chief conservation writer for Kumisi Lake Sanctuary in Georgia. 
Write a compelling, professional blog post (about 200 words) on the topic: "${topic || 'Avian telemetry and wetland protection'}". 
Category: ${category || 'Conservation News'}. 
Include a catchy title, summary, and article body formatted in paragraph style. Return a valid JSON object with fields: "title", "summary", "content", "category", "tag".`;

      const ai = getAIClient();
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const text = response.text;
      if (!text) {
        throw new Error('No response from Gemini API');
      }

      const parsed = JSON.parse(text);
      res.json({ success: true, data: parsed });
    } catch (err: any) {
      console.error('Error generating draft post:', err);
      // Fallback draft if API key is unconfigured or call fails
      res.json({
        success: false,
        fallback: {
          title: 'Seasonal Water Level & Avian Telemetry Insights',
          summary: 'Recent telemetry reports show strong correlation between shallow lagoon replenishment and migratory waterfowl nesting density.',
          content: 'Lake Kumisi has observed remarkable migratory patterns during the recent seasonal cycle. Satellite tracking tags attached to Dalmatian Pelicans indicate increased foraging time around the northern reed banks. Community volunteers and local scientists continue to document species counts to ensure optimal wetland conservation policies.',
          category: 'Conservation News',
          tag: 'Telemetry'
        },
        error: err.message
      });
    }
  });

// AI Species info query with strict Kumisi Lake topic guardrail
  app.post('/api/ai/species-insight', async (req, res) => {
    try {
      const { query } = req.body;
      const q = (query || '').toLowerCase().trim();

      // Hardcoded relevance check: Must be strictly about Lake Kumisi ecosystem
      const kumisiKeywords = [
        'kumisi', 'кумиси', 'lake', 'sanctuary', 'pelican', 'stork', 'mud', 'peloid',
        'bird', 'avian', 'migrat', 'flyway', 'georgia', 'gardabani', 'wetland', 'reeds',
        'roost', 'nest', 'feather', 'species', 'sulfide', 'balneolog', 'ecosystem',
        'conservation', 'telemetry', 'flock', 'ring', 'water', 'wildlife', 'fauna', 'flora',
        'heron', 'egret', 'duck', 'goose', 'swan', 'falcon', 'eagle', 'kingfisher'
      ];

      const isKumisiRelated = kumisiKeywords.some((kw) => q.includes(kw));

      if (!isKumisiRelated) {
        return res.json({
          success: true,
          answer: 'I am specialized strictly in Lake Kumisi Sanctuary. I can only answer questions related to Lake Kumisi, its bird migration, mineral mud, or Georgia wetland conservation.',
          blocked: true
        });
      }

      const prompt = `You are a professional ornithologist at Kumisi Lake Sanctuary in Georgia. Answer this visitor query in 2-3 informative sentences strictly focused on Kumisi Lake: "${query}"`;

      const ai = getAIClient();
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      res.json({ success: true, answer: response.text });
    } catch (err: any) {
      res.json({
        success: false,
        answer: 'Kumisi Lake Sanctuary hosts over 270 bird species along the Black Sea flyway, offering vital roosting grounds for migrating pelicans, kingfishers, and stilts.',
        error: err.message
      });
    }
  });

  // Vite development middleware or static production serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  return app;
}

// Local development entry point
if (process.env.VERCEL !== '1' && process.env.NODE_ENV !== 'production') {
  const PORT = 3000;
  createApp().then((app) => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`\n==================================================`);
      console.log(` Kumisi Sanctuary Server is active!`);
      console.log(` Local:   http://localhost:${PORT}`);
      const networkInterfaces = os.networkInterfaces();
      for (const interfaceName of Object.keys(networkInterfaces)) {
        for (const net of networkInterfaces[interfaceName] || []) {
          if (net.family === 'IPv4' && !net.internal) {
            console.log(` Network: http://${net.address}:${PORT}`);
          }
        }
      }
      console.log(`==================================================\n`);
    });
  });
}
