// Vercel serverless function — keeps the Anthropic API key on the server.
// Set ANTHROPIC_API_KEY in Vercel → Project → Settings → Environment Variables.
const Anthropic = require("@anthropic-ai/sdk");

const MAX_MESSAGES = 20;
const MAX_CHARS = 4000;

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(503).json({ error: "AI is not configured on this server." });
  }

  const { system, messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages is required" });
  }

  // Only pass through plain text turns, and cap size to protect the API bill.
  const clean = messages.slice(-MAX_MESSAGES).map(m => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: String(m.content || "").slice(0, MAX_CHARS),
  }));
  while (clean.length && clean[0].role !== "user") clean.shift();
  if (!clean.length) return res.status(400).json({ error: "First message must be from the user" });

  try {
    const client = new Anthropic();
    const response = await client.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 2000,
      output_config: { effort: "low" },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: typeof system === "string" ? system.slice(0, MAX_CHARS) : undefined,
      messages: clean,
    });

    if (response.stop_reason === "refusal") {
      return res.status(200).json({ text: "Sorry, I can't help with that one. Try asking another way." });
    }
    const text = response.content
      .filter(b => b.type === "text")
      .map(b => b.text)
      .join("\n")
      .trim();
    return res.status(200).json({ text });
  } catch (err) {
    console.error("Claude API error:", err.status, err.message);
    const status = err instanceof Anthropic.RateLimitError ? 429 : 502;
    return res.status(status).json({ error: "AI service error" });
  }
};
