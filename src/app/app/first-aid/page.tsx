"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, AlertTriangle, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n";
import type { Language } from "@/types";

const EMERGENCIES: string[] = [
  "heart attack",
  "stroke",
  "snake bite",
  "dog bite",
  "severe burn",
  "electric shock",
  "fracture",
  "head injury",
  "unconscious person",
  "choking in adult",
  "choking in child",
  "asthma attack",
  "severe bleeding",
  "poisoning",
  "heat stroke",
  "high fever in child",
  "diabetic low sugar",
  "fits / seizure",
  "drowning",
  "eye chemical burn",
];

export default function FirstAidPage() {
  const [lang, setLang] = useState<Language>("hi");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const runFirstAid = async (emergency: string) => {
    const trimmed = emergency.trim();
    if (!trimmed) return;
    setQuery(trimmed);
    setLoading(true);
    setError(null);
    setSteps(null);
    try {
      const res = await fetch("/api/first-aid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emergency: trimmed,
          language: lang,
        }),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data.steps) && data.steps.length > 0) {
        setSteps(data.steps);
      } else {
        throw new Error("No first aid steps returned");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : null;
      setError(
        message
          ? `First aid generation failed: ${message}`
          : "First aid generation failed. कृपया बाद में फिर कोशिश करें.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    runFirstAid(query);
  };

  return (
    <div className="min-h-screen" style={{ background: "#f0eada" }}>
      <div className="max-w-2xl mx-auto px-4 py-6 pb-20 space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-playfair)", color: "#3d1a2e" }}
          >
            {t(lang, "firstAidGuide")}
          </h2>
          <p className="text-sm mt-1" style={{ color: "#8a6a7a" }}>
            {t(lang, "typeFreelyHint")}
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl border border-[#e8d5c4] p-4 space-y-3"
        >
          <p
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#85325c" }}
          >
            {t(lang, "emergencyLabel")}
          </p>
          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. heart attack, snake bite, severe burn..."
            className="resize-none text-sm rounded-xl border-[#e8d5c4] focus-visible:ring-[#85325c]/30"
            style={{ minHeight: 70, background: "#faf6f0", color: "#3d1a2e" }}
          />
          <Button
            type="submit"
            disabled={loading || !query.trim()}
            className="w-full h-11 gap-2 rounded-xl font-semibold"
            style={{
              background: query.trim() ? "#85325c" : "#c4a8b8",
              color: "#f0eada",
              border: "none",
            }}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t(lang, "firstAidGenerating")}
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                {t(lang, "firstAidCta")}
              </>
            )}
          </Button>
        </motion.form>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="bg-white rounded-2xl border border-[#e8d5c4] p-4"
        >
          <p
            className="text-xs font-semibold mb-3 uppercase tracking-wider"
            style={{ color: "#85325c" }}
          >
            {t(lang, "commonEmergencies")}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {EMERGENCIES.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => runFirstAid(e)}
                className="text-xs text-left px-3 py-2 rounded-xl border bg-[#faf6f0] hover:border-[#85325c] transition-all"
                style={{ borderColor: "#e8d5c4", color: "#3d1a2e" }}
              >
                <span className="block font-semibold mb-0.5">{e}</span>
                <span
                  className="block text-[10px]"
                  style={{ color: "#9a7a8a" }}
                >
                  {t(lang, "tapForSteps")}
                </span>
              </button>
            ))}
          </div>
        </motion.section>

        <AnimatePresence>
          {steps && (
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="bg-white rounded-2xl border border-[#e8d5c4] p-4 space-y-3"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "#EAF3DE" }}
                >
                  <Sparkles size={16} style={{ color: "#3B6D11" }} />
                </div>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{
                      fontFamily: "var(--font-playfair)",
                      color: "#3d1a2e",
                    }}
                  >
                    Step-by-step first aid
                  </p>
                  <p className="text-[11px]" style={{ color: "#8a6a7a" }}>
                    सरल हिंदी में तुरंत करने योग्य कदम
                  </p>
                </div>
              </div>
              <ol className="space-y-2.5 mt-1">
                {steps.map((s, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
                      style={{ background: "#85325c", color: "#f0eada" }}
                    >
                      {i + 1}
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#4a2a3a" }}
                    >
                      {s}
                    </p>
                  </li>
                ))}
              </ol>
              <div
                className="flex gap-2 items-start p-2.5 rounded-lg mt-1"
                style={{ background: "#f8f0e8" }}
              >
                <AlertTriangle
                  size={14}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "#85325c" }}
                />
                <p
                  className="text-[11px] leading-relaxed"
                  style={{ color: "#6a4a5a" }}
                >
                  यह केवल प्राथमिक सहायता के लिए है। साँस रुकना, छाती में तेज़
                  दर्द, बेहोशी या बहुत ज़्यादा खून बहने पर तुरंत नज़दीकी अस्पताल
                  जाएँ या एम्बुलेंस (108) बुलाएँ।
                </p>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex gap-3 p-4 rounded-2xl border"
              style={{ background: "#FCEBEB", borderColor: "#F09595" }}
            >
              <AlertTriangle
                size={16}
                style={{ color: "#A32D2D", flexShrink: 0, marginTop: 1 }}
              />
              <p className="text-sm" style={{ color: "#A32D2D" }}>
                {error}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-xs pb-2" style={{ color: "#b89aaa" }}>
          ⚠️ AI आधारित first aid. हमेशा किसी नज़दीकी डॉक्टर या अस्पताल से सलाह
          लें।
        </p>
      </div>
    </div>
  );
}
