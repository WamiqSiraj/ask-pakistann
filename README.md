# Ask Pakistan — React application + government source retrieval API

This package is built from your uploaded frontend project and retains its existing pages, Redux Toolkit store and UI. It adds a source-grounded Gemini backend, configured government URLs, and a single-command development runner.

## Run locally (Node 22 recommended)

1. In this folder run `npm install` (or `npm ci`).
2. Copy `.env.example` to `.env`.
3. Insert your private Gemini API key as `GEMINI_API_KEY` in `.env`.
4. Run `npm run dev` (launches both the API on port 3001 and Vite on port 5173).
5. Open `http://localhost:5173`.

To confirm the backend is running, open `http://localhost:3001/api/health`.

## What is implemented

- Existing React pages and navigation remain intact.
- Questions from the existing search box send POST requests to `/api/ask`.
- Backend selects relevant entries from 15 curated public-sector website URLs and fetches publicly accessible HTML.
- Gemini generates an answer constrained to successfully retrieved source text and includes the source URLs in the answer shown in the existing UI.
- Responses acknowledge when a relevant page cannot be retrieved or verified.
- No Gemini secret is shipped in this archive or used in frontend JavaScript.

## Limits

This is **not** an index of 29,000 websites. Sites that require JavaScript, reject bots, redirect, or serve PDFs may not be retrievable by this version. URL entries are starting points and are not automatically validated for ongoing currency. The free Gemini API tier is usage-limited and availability depends on Google. Source retrieval is best-effort and does not prove a procedure is current or correct. Do not use this as the sole basis for consequential decisions.

The backend is a development prototype, not an internet-facing production service. Before deploying publicly add controlled crawling/indexing, domain validation, durable caching, abuse protection and proper deployment configuration.
