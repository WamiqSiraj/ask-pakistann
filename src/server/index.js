// Ask Pakistan — source-grounded public information assistant.
// Replace: src/server/index.js. Requires Node 20+, GEMINI_API_KEY in .env.
import http from 'node:http';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { SOURCES, answerQuestion, normalizeModel } from './core.js';

function loadEnv() {
  const candidates = [
    path.resolve(import.meta.dirname, '../../.env'),
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), 'frontend/.env'),
  ];
  for (const envPath of candidates) {
    if (existsSync(envPath)) {
      try {
        process.loadEnvFile?.(envPath);
        break;
      } catch {}
    }
  }
}

loadEnv();

const PORT = Number(process.env.API_PORT || 3001);

function getApiKey() {
  if (!process.env.GEMINI_API_KEY) {
    loadEnv();
  }
  return process.env.GEMINI_API_KEY;
}

function getModel() {
  if (!process.env.GEMINI_MODEL) {
    loadEnv();
  }
  return normalizeModel(process.env.GEMINI_MODEL);
}



const hits = new Map();

function send(res, status, payload, req) {
  const origin = req?.headers?.origin || '*';
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  });
  res.end(JSON.stringify(payload));
}

http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return send(res, 200, {}, req);
  if (req.url === '/api/health' && req.method === 'GET') return send(res, 200, { ok: true, sourcesConfigured: SOURCES.length, aiConfigured: Boolean(getApiKey()) }, req);
  if (req.url !== '/api/ask' || req.method !== 'POST') return send(res, 404, { error: 'Not found' }, req);
  const apiKey = getApiKey();
  if (!apiKey) return send(res, 503, { error: 'Set GEMINI_API_KEY in your .env file.' }, req);
  const ip = req.socket.remoteAddress || 'unknown';
  const history = (hits.get(ip) || []).filter(t => Date.now() - t < 60_000);
  if (history.length >= 12) return send(res, 429, { error: 'Too many requests. Try again in one minute.' }, req);
  history.push(Date.now()); hits.set(ip, history);
  try {
    let raw = '';
    for await (const chunk of req) {
      raw += chunk;
      if (raw.length > 8_000) return send(res, 413, { error: 'Request too large' }, req);
    }
    let body;
    try { body = JSON.parse(raw); } catch { return send(res, 400, { error: 'Invalid JSON' }, req); }
    const { status, payload } = await answerQuestion(body.question, { apiKey, model: getModel(), baseUrl: process.env.GOOGLE_GEMINI_BASE_URL });
    return send(res, status, payload, req);
  } catch (error) {
    console.error('Ask Pakistan:', error.message);
    return send(res, 502, { error: `Unable to complete the request: ${error.message}` }, req);
  }
}).listen(PORT, () => console.log(`Ask Pakistan source-grounded API: http://localhost:${PORT}`));
