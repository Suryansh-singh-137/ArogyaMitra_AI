import { NextRequest, NextResponse } from "next/server";
import { callOpenRouter } from "@/lib/ai";
import { getOfflineDiagnosis } from "@/lib/conditions";
import type { DiagnosisRequest } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as DiagnosisRequest;

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
  } catch (err) {
    console.error("Diagnosis error:", err);
    // Graceful fallback — never show a blank screen
    try {
      const body = (await req.clone().json()) as DiagnosisRequest;
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
