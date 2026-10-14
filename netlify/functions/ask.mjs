// Serves the Ask Pakistan API on Netlify. Gemini credentials come from
// Netlify AI Gateway (GEMINI_API_KEY / GOOGLE_GEMINI_BASE_URL) unless you set your own.
import { SOURCES, answerQuestion, normalizeModel } from '../../src/server/core.js';

const json = (status, payload) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

export default async (req) => {
  const { pathname } = new URL(req.url);
  if (pathname === '/api/health') {
    return json(200, { ok: true, sourcesConfigured: SOURCES.length, aiConfigured: Boolean(process.env.GEMINI_API_KEY) });
  }
  if (req.method !== 'POST') return json(405, { error: 'Method not allowed' });

  const raw = await req.text();
  if (raw.length > 8_000) return json(413, { error: 'Request too large' });
  let body;
  try { body = JSON.parse(raw); } catch { return json(400, { error: 'Invalid JSON' }); }

  try {
    const { status, payload } = await answerQuestion(body.question, {
      apiKey: process.env.GEMINI_API_KEY,
      model: normalizeModel(process.env.GEMINI_MODEL),
      baseUrl: process.env.GOOGLE_GEMINI_BASE_URL,
    });
    return json(status, payload);
  } catch (error) {
    console.error('Ask Pakistan:', error.message);
    return json(502, { error: `Unable to complete the request: ${error.message}` });
  }
};

export const config = { path: ['/api/ask', '/api/health'] };
