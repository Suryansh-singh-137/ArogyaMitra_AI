import type { DiagnosisRequest, Diagnosis, Language } from "@/types";
import { getOfflineDiagnosis } from "./conditions";

const OPENROUTER_BASE = "https://openrouter.ai/api/v1";
const MODEL = "anthropic/claude-sonnet-4-5"; // Claude Sonnet via OpenRouter

const SYSTEM_PROMPT = `You are ArogyaMitra AI, a compassionate health assistant for rural India.
Help people understand their symptoms and get basic guidance.
Always respond in the language specified. Keep language simple and clear.
Never use medical jargon. Always recommend seeing a real doctor for serious issues.
Respond ONLY in valid JSON. No markdown, no backticks, no preamble.`;

function buildPrompt(req: DiagnosisRequest): string {
  const ageMap = {
    child: "child (0-12 years)",
    adult: "adult (13-60 years)",
    senior: "senior (60+ years)",
  };
  return `Patient symptoms: ${req.symptoms.join(", ")}
Age group: ${ageMap[req.age]}
Language to respond in: ${req.language}
Additional info: ${req.additionalInfo || "none"}

Respond with this EXACT JSON structure and nothing else:
{
  "condition": "name of likely condition in ${req.language}",
  "severity": "mild",
  "description": "2-3 sentence explanation in ${req.language} in very simple words",
  "firstAid": ["step 1 in ${req.language}", "step 2", "step 3", "step 4"],
  "medicines": [
    {
      "name": "medicine name in English",
      "dosage": "how much and when in ${req.language}",
      "note": "important note in ${req.language}",
      "price": "approximate price in rupees e.g. ₹5-10"
    }
  ],
  "whenToSeek": "when to visit a doctor, in ${req.language}"
}

Rules:
- severity must be exactly one of: "mild", "moderate", or "urgent"
- Set "urgent" for: chest pain, difficulty breathing, high fever in infants, unconsciousness
- Set "moderate" for: persistent fever 2+ days, severe pain, vomiting blood
- Only suggest OTC medicines available at Jan Aushadhi stores under ₹50
- Keep ALL text in ${req.language} except medicine names and JSON keys
- Return ONLY the JSON object — no explanation, no markdown`;
}

function buildHeaders(apiKey: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
    "HTTP-Referer": "https://arogyamitra-ai.vercel.app", // your deployed URL
    "X-Title": "ArogyaMitra AI",
  };
}

// ── Server-side call via OpenRouter → Claude Sonnet ──────────────────────────
export async function callOpenRouter(
  req: DiagnosisRequest,
): Promise<Diagnosis> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY not set in .env.local");

  const response = await fetch(`${OPENROUTER_BASE}/chat/completions`, {
    method: "POST",
    headers: buildHeaders(apiKey),
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.3,
      max_tokens: 1000,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildPrompt(req) },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenRouter API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const text: string = data.choices[0].message.content;
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean) as Diagnosis;
}

// ── Report analysis — Claude Sonnet supports vision via OpenRouter ────────────
export async function analyzeReport(
  imageBase64: string,
  mediaType: string,
  language: Language,
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY not set");

  const prompt = `Analyze this medical report or prescription image.
Explain it in very simple ${language} language for a rural patient with limited medical knowledge.
Cover: what the values/medicines mean, which results are normal, which need attention, and what to do next.
Keep it short, warm, and reassuring. Avoid medical jargon.`;

  const response = await fetch(`${OPENROUTER_BASE}/chat/completions`, {
    method: "POST",
    headers: buildHeaders(apiKey),
    body: JSON.stringify({
      model: MODEL, // Claude Sonnet supports vision
      max_tokens: 700,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: { url: `data:${mediaType};base64,${imageBase64}` },
            },
            { type: "text", text: prompt },
          ],
        },
      ],
    }),
  });

  if (!response.ok) throw new Error("OpenRouter vision error");
  const data = await response.json();
  return data.choices[0].message.content as string;
}

// ── Client-side helper → calls our Next.js API route ────────────────────────
export async function getDiagnosis(req: DiagnosisRequest): Promise<Diagnosis> {
  if (typeof window !== "undefined" && !navigator.onLine) {
    return getOfflineDiagnosis(req.symptoms, req.language);
  }
  try {
    const res = await fetch("/api/diagnose", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    return (await res.json()) as Diagnosis;
  } catch (err) {
    console.warn("Falling back to offline diagnosis:", err);
    return getOfflineDiagnosis(req.symptoms, req.language);
  }
}
