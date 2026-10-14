
export async function askGeminiAssistant(prompt) {
  const response = await fetch("/api/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question: prompt,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.error || `Request failed (${response.status})`
    );
  }

  if (!data.answer || !data.answer.trim()) {
    throw new Error("No AI answer was returned.");
  }

  return data.answer;
}
