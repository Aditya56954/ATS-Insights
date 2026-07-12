const SYSTEM_PROMPT = `
You are an expert ATS Resume Analyzer.

Return ONLY valid JSON.

Use exactly this schema:

{
  "overallScore": 0,
  "atsCompatibility": 0,
  "matchedKeywords": [],
  "missingKeywords": [],
  "sections": [],
  "formattingIssues": [],
  "strengths": [],
  "improvements": [],
  "summary": ""
}
`;

function buildPrompt(resumeText, jobDescription = "") {
  return `
${SYSTEM_PROMPT}

Resume:

${resumeText}

${
  jobDescription
    ? `Job Description:\n${jobDescription}`
    : ""
}
`;
}

function safeParseJSON(text) {
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}

export const analyzeResume = async (
  resumeText,
  jobDescription = ""
) => {

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: buildPrompt(resumeText, jobDescription),
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error(data);
    throw new Error(
      data.error?.message || "Gemini API request failed"
    );
  }

  const text =
    data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("No response received from Gemini.");
  }

  return safeParseJSON(text);
};