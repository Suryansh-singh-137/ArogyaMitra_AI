import { NextRequest, NextResponse } from "next/server";
import { callOpenRouter } from "@/lib/ai";
import { getOfflineDiagnosis } from "@/lib/conditions";
import type { DiagnosisRequest } from "@/types";

export async function POST(req: NextRequest) {
  let body: DiagnosisRequest | null = null;
  try {
    body = (await req.json()) as DiagnosisRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    if (!body.symptoms || body.symptoms.length === 0) {
      return NextResponse.json(
        { error: "No symptoms provided" },
        { status: 400 },
      );
    }

    // Sanitize inputs
    const validAges = ["child", "adult", "senior"];
    const validLangs = ["hi", "bn", "ta", "te", "mr", "en"];
    if (!validAges.includes(body.age)) body.age = "adult";
    if (!validLangs.includes(body.language)) body.language = "hi";

    const diagnosis = await callOpenRouter(body);
    return NextResponse.json(diagnosis);
  } catch (err: any) {
    console.error("Diagnosis error:", err.message || err);
    // Graceful fallback — never show a blank screen
    try {
      const fallback = getOfflineDiagnosis(
        body.symptoms || [],
        body.language || "hi",
      );
      return NextResponse.json(fallback);
    } catch {
      return NextResponse.json({ error: "Diagnosis failed" }, { status: 500 });
    }
  }
}
