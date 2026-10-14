// src/services/newsService.js

const MODELS_NEWS = ["gemini-3.5-flash", "gemini-2.0-flash-lite", "gemini-1.5-flash-002"];

export const fetchAINews = async () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) return [];

  const timestamp = new Date().toISOString();
  const prompt = `Current Time: ${timestamp}. Generate exactly 4 unique public service announcements for Pakistan citizens (NADRA, Passport, FBR, Transport, Health, Education). Return ONLY valid JSON array with keys: "id", "title", "category", "date", "summary", "department". No markdown.`;

  for (const model of MODELS_NEWS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, responseMimeType: "application/json" }
        }),
      });

      if (response.status === 429 || response.status === 503) continue;
      if (!response.ok) continue;

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) continue;

      const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanJson);

    } catch (e) { continue; }
  }
  console.error("All news models failed");
  return [];
};