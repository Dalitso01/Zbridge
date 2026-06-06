// AI Feedback service — uses Claude API to give personalised task feedback

export async function getAIFeedback(question, userAnswer, modelAnswer, simulationTitle) {
  if (!userAnswer || userAnswer.trim().length < 20) {
    return "Please write a more detailed answer before requesting AI feedback.";
  }

  const prompt = `You are an expert career coach reviewing a simulation task submission from a Zambian student or professional.

Simulation: ${simulationTitle}
Task question: ${question}
Model answer guidance: ${modelAnswer}
Student's answer: ${userAnswer}

Give concise, constructive feedback in 3 parts:
1. STRENGTHS (1-2 things they did well)
2. GAPS (1-2 specific things missing or that could be stronger, referencing the Zambian/African context where relevant)
3. ONE ACTION (the single most impactful improvement they could make)

Keep your total response under 150 words. Be encouraging but honest. Write as if speaking directly to the student.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const data = await response.json();
    return data.content?.[0]?.text || "Unable to generate feedback. Please try again.";
  } catch (err) {
    return "AI feedback is temporarily unavailable. Please review the model answer above.";
  }
}
