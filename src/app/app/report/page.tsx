"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Camera,
  FileText,
  Sparkles,
  Copy,
  CheckCheck,
  X,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Language } from "@/types";

const LANGUAGES = [
  { code: "hi" as Language, native: "हिंदी" },
  { code: "en" as Language, native: "English" },
  { code: "bn" as Language, native: "বাংলা" },
  { code: "ta" as Language, native: "தமிழ்" },
  { code: "te" as Language, native: "తెలుగు" },
];

// Compress image to under ~800KB before sending
async function compressImage(
  file: File,
): Promise<{ base64: string; mediaType: string }> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      const MAX = 1200;
      if (width > MAX || height > MAX) {
        if (width > height) {
          height = Math.round((height * MAX) / width);
          width = MAX;
        } else {
          width = Math.round((width * MAX) / height);
          height = MAX;
        }
      }
      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);

      let quality = 0.8;
      let dataUrl = canvas.toDataURL("image/jpeg", quality);
      while (dataUrl.length > 800 * 1024 * 1.37 && quality > 0.3) {
        quality -= 0.1;
        dataUrl = canvas.toDataURL("image/jpeg", quality);
      }
      resolve({ base64: dataUrl.split(",")[1], mediaType: "image/jpeg" });
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = url;
  });
}

export default function ReportAnalyser() {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window === "undefined") return "hi";
    try {
      const stored = localStorage.getItem("sehat_lang_default") as
        | Language
        | null;
      return stored || "hi";
    } catch {
      return "hi";
    }
  });
  const [imageData, setImageData] = useState<{
    base64: string;
    mediaType: string;
  } | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sehat_lang_default") as
        | Language
        | null;
      if (stored) setLang(stored);
    } catch {
      // ignore
    }
  }, []);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload a JPG or PNG image");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setError("Image too large. Please use under 20MB.");
      return;
    }
    setError(null);
    setResult(null);
    setCompressing(true);
    setPreview(URL.createObjectURL(file));
    try {
      setImageData(await compressImage(file));
    } catch {
      setError("Could not process image. Try another photo.");
      setPreview(null);
    } finally {
      setCompressing(false);
    }
  };

  const analyzeReport = async () => {
    if (!imageData) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/analyze-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: imageData.base64,
          mediaType: imageData.mediaType,
          language: lang,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
      if (!data.explanation) throw new Error("No response from AI");
      setResult(data.explanation);
    } catch (err: any) {
      setError(
        err.message?.includes("vision") || err.message?.includes("model")
          ? "Vision not available on your OpenRouter plan. Try upgrading or use a different model."
          : `Analysis failed: ${err.message || "Please try again."}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImageData(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="min-h-screen" style={{ background: "#f0eada" }}>
      <div className="max-w-2xl mx-auto px-4 py-6 pb-16 space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-playfair)", color: "#3d1a2e" }}
          >
            Report Analyser
          </h2>
          <p className="text-sm mt-1" style={{ color: "#8a6a7a" }}>
            रिपोर्ट की फोटो लें → Claude AI सरल भाषा में समझाएगा
          </p>
        </motion.div>

        {/* Supported types */}
        <div className="bg-white rounded-2xl border border-[#e8d5c4] p-4">
          <p
            className="text-xs font-semibold mb-2.5 uppercase tracking-wider"
            style={{ color: "#85325c" }}
          >
            Supported
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              ["Blood CBC", "खून की जाँच"],
              ["Sugar / HbA1c", "शुगर रिपोर्ट"],
              ["Thyroid TSH", "थायरॉइड"],
              ["Prescription", "डॉक्टर पर्ची"],
            ].map(([l, h], i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-2.5 rounded-xl"
                style={{ background: "#faf6f0", border: "1px solid #e8d5c4" }}
              >
                <FileText
                  size={13}
                  style={{ color: "#85325c", flexShrink: 0 }}
                />
                <div>
                  <p
                    className="text-xs font-medium"
                    style={{ color: "#3d1a2e" }}
                  >
                    {l}
                  </p>
                  <p className="text-[10px]" style={{ color: "#9a7a8a" }}>
                    {h}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Language */}
        <div className="bg-white rounded-2xl border border-[#e8d5c4] p-4">
          <p
            className="text-xs font-semibold mb-3 uppercase tracking-wider"
            style={{ color: "#85325c" }}
          >
            Explain in
          </p>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code);
                  try {
                    localStorage.setItem("sehat_lang_default", l.code);
                  } catch {
                    // ignore
                  }
                }}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium transition-all border",
                  lang === l.code
                    ? "border-transparent text-white"
                    : "bg-[#faf6f0] border-[#e0c8d0] hover:border-[#85325c]",
                )}
                style={
                  lang === l.code
                    ? { background: "#85325c", color: "#f0eada" }
                    : { color: "#85325c" }
                }
              >
                {l.native}
              </button>
            ))}
          </div>
        </div>

        {/* Upload */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />

        {!preview ? (
          <div
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const f = e.dataTransfer.files[0];
              if (f) handleFile(f);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            className={cn(
              "border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all",
              dragOver
                ? "border-[#85325c] bg-[#85325c]/5"
                : "border-[#85325c]/30 bg-white hover:border-[#85325c]/60",
            )}
            onClick={() => fileRef.current?.click()}
          >
            <div
              className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: "#85325c15" }}
            >
              <Upload size={28} style={{ color: "#85325c" }} />
            </div>
            <p
              className="font-semibold mb-1"
              style={{ fontFamily: "var(--font-playfair)", color: "#3d1a2e" }}
            >
              Upload your report
            </p>
            <p className="text-sm mb-4" style={{ color: "#8a6a7a" }}>
              रिपोर्ट की फोटो यहाँ डालें
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  fileRef.current?.click();
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium hover:opacity-80"
                style={{ background: "#85325c", color: "#f0eada" }}
              >
                <Camera size={15} /> Take photo
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  fileRef.current?.click();
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border hover:border-[#85325c]"
                style={{
                  border: "1px solid #e0c8d0",
                  color: "#85325c",
                  background: "white",
                }}
              >
                <Upload size={15} /> Browse
              </button>
            </div>
            <p className="text-xs mt-3" style={{ color: "#b89aaa" }}>
              Auto-compressed · JPG PNG · Max 20MB
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#e8d5c4] overflow-hidden">
            <div className="relative">
              <img
                src={preview}
                alt="Report"
                className="w-full object-contain max-h-72"
                style={{ background: "#faf6f0" }}
              />
              <button
                onClick={reset}
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "#85325c" }}
              >
                <X size={14} className="text-white" />
              </button>
              {compressing && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: "rgba(240,234,218,0.85)" }}
                >
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                    >
                      <Sparkles size={14} style={{ color: "#85325c" }} />
                    </motion.div>
                    <span className="text-sm" style={{ color: "#85325c" }}>
                      Compressing image...
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 flex gap-3">
              <Button
                onClick={analyzeReport}
                disabled={loading || compressing || !imageData}
                className="flex-1 h-11 gap-2 font-semibold rounded-xl"
                style={{
                  background: "#85325c",
                  color: "#f0eada",
                  border: "none",
                }}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                    >
                      <Sparkles size={16} />
                    </motion.div>
                    Analysing...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Analyse Report
                  </>
                )}
              </Button>
              <button
                onClick={() => fileRef.current?.click()}
                className="px-4 rounded-xl border text-sm font-medium hover:border-[#85325c] transition-colors"
                style={{ border: "1px solid #e0c8d0", color: "#85325c" }}
              >
                Change
              </button>
            </div>
          </div>
        )}

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex gap-3 p-4 rounded-2xl border"
              style={{ background: "#FCEBEB", borderColor: "#F09595" }}
            >
              <AlertCircle
                size={16}
                style={{ color: "#A32D2D", flexShrink: 0, marginTop: 1 }}
              />
              <p className="text-sm" style={{ color: "#A32D2D" }}>
                {error}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-2xl border border-[#e8d5c4] p-5 space-y-3"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "linear",
                  }}
                >
                  <Sparkles size={18} style={{ color: "#85325c" }} />
                </motion.div>
                <div>
                  <p
                    className="font-semibold text-sm"
                    style={{ color: "#3d1a2e" }}
                  >
                    Claude Sonnet reading report...
                  </p>
                  <p className="text-xs" style={{ color: "#9a7a8a" }}>
                    रिपोर्ट समझी जा रही है
                  </p>
                </div>
              </div>
              {[80, 60, 70, 45].map((w, i) => (
                <motion.div
                  key={i}
                  className="h-3 rounded-full"
                  style={{ width: `${w}%`, background: "#e8d5c4" }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.2,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-[#e8d5c4] overflow-hidden"
            >
              <div className="h-1" style={{ background: "#639922" }} />
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: "#EAF3DE" }}
                    >
                      <FileText size={14} style={{ color: "#3B6D11" }} />
                    </div>
                    <p
                      className="font-semibold text-sm"
                      style={{
                        fontFamily: "var(--font-playfair)",
                        color: "#3d1a2e",
                      }}
                    >
                      Report Explanation
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(result);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:opacity-80"
                    style={{ background: copied ? "#EAF3DE" : "#f0eada" }}
                  >
                    {copied ? (
                      <CheckCheck size={13} style={{ color: "#3B6D11" }} />
                    ) : (
                      <Copy size={13} style={{ color: "#85325c" }} />
                    )}
                  </button>
                </div>
                <p
                  className="text-sm leading-relaxed whitespace-pre-wrap"
                  style={{ color: "#3d1a2e" }}
                >
                  {result}
                </p>
                <div className="flex gap-2 mt-4 pt-3 border-t border-[#e8d5c4]">
                  <button
                    onClick={() =>
                      window.open(
                        `https://wa.me/?text=${encodeURIComponent(`🏥 ArogyaMitra AI Report\n\n${result}`)}`,
                        "_blank",
                      )
                    }
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border hover:border-[#85325c]"
                    style={{ border: "1px solid #e0c8d0", color: "#85325c" }}
                  >
                    📤 Share on WhatsApp
                  </button>
                  <button
                    onClick={reset}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium hover:opacity-80"
                    style={{ background: "#85325c", color: "#f0eada" }}
                  >
                    New report
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-xs pb-4" style={{ color: "#b89aaa" }}>
          ⚠️ AI explanation only. Always consult a doctor.
        </p>
      </div>
    </div>
  );
}
