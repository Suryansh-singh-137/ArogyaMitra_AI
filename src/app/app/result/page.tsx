"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Phone,
  Share2,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  Info,
  Pill,
  Hospital,
  Navigation,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";
import type { Diagnosis, Language } from "@/types";

const severityConfig = {
  mild: {
    icon: CheckCircle,
    bg: "#EAF3DE",
    border: "#97C459",
    text: "#3B6D11",
    label: "Mild",
    bar: "#639922",
  },
  moderate: {
    icon: Info,
    bg: "#FAEEDA",
    border: "#EF9F27",
    text: "#854F0B",
    label: "Moderate",
    bar: "#BA7517",
  },
  urgent: {
    icon: AlertTriangle,
    bg: "#FCEBEB",
    border: "#F09595",
    text: "#A32D2D",
    label: "Urgent",
    bar: "#E24B4A",
  },
};

export default function DiagnosisResult() {
  const router = useRouter();
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [lang, setLang] = useState<Language>("hi");

  useEffect(() => {
    const raw = sessionStorage.getItem("sehat_diagnosis");
    const l = (sessionStorage.getItem("sehat_lang") as Language) || "hi";
    if (!raw) {
      router.push("/app");
      return;
    }
    const parsed = JSON.parse(raw) as Diagnosis;
    setDiagnosis(parsed);
    setLang(l);
    // Save to history
    try {
      const symptoms = JSON.parse(
        sessionStorage.getItem("sehat_symptoms") || "[]",
      ) as string[];
      const existing = JSON.parse(
        localStorage.getItem("sehat_history") || "[]",
      );
      const entry = {
        id: Date.now().toString(),
        diagnosis: parsed,
        symptoms,
        language: l,
        timestamp: Date.now(),
      };
      const updated = [entry, ...existing].slice(0, 50); // keep last 50
      localStorage.setItem("sehat_history", JSON.stringify(updated));
    } catch {
      /* ignore */
    }
  }, [router]);

  if (!diagnosis) return null;

  const sev = severityConfig[diagnosis.severity];
  const SevIcon = sev.icon;
  const isUrgent = diagnosis.severity === "urgent";

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      `🏥 ArogyaMitra AI — Health Report\n\n` +
        `Condition: ${diagnosis.condition}\n` +
        `Severity: ${sev.label}\n\n` +
        `${diagnosis.description}\n\n` +
        `First Aid:\n${diagnosis.firstAid.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n\n` +
        `When to see doctor: ${diagnosis.whenToSeek}\n\n` +
        `💊 Powered by ArogyaMitra AI — Free health assistant for rural India`,
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div
      className="min-h-screen pb-32 w-full max-w-full overflow-x-hidden"
      style={{ background: "#f0eada" }}
    >
      {/* Header */}
      <header
        style={{ background: "#85325c" }}
        className="sticky top-0 z-50 w-full"
      >
        <div className="w-full max-w-lg mx-auto px-3 sm:px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => router.push("/app")}
            className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors"
          >
            <ArrowLeft size={16} className="text-white" />
          </button>
          <div
            style={{ fontFamily: "var(--font-playfair)", color: "#f0eada" }}
            className="font-bold text-base"
          >
            {t(lang, "appName")}
          </div>
          <button
            onClick={shareOnWhatsApp}
            className="ml-auto w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors"
          >
            <Share2 size={14} className="text-white" />
          </button>
        </div>
      </header>

      {/* Emergency bar */}
      {isUrgent && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="sticky top-[52px] z-40 border-b"
          style={{ background: "#FCEBEB", borderColor: "#F09595" }}
        >
          <div className="max-w-lg mx-auto px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle size={14} style={{ color: "#A32D2D" }} />
              <span
                className="text-sm font-semibold"
                style={{ color: "#A32D2D" }}
              >
                {t(lang, "urgent")} — {t(lang, "callEmergency")}
              </span>
            </div>
            <a href="tel:108">
              <Button
                size="sm"
                className="h-7 gap-1 text-xs"
                style={{
                  background: "#A32D2D",
                  color: "white",
                  border: "none",
                }}
              >
                <Phone size={12} /> 108
              </Button>
            </a>
          </div>
        </motion.div>
      )}

      <main className="w-full max-w-lg mx-auto px-3 sm:px-4 py-4 sm:py-5 space-y-4">
        {/* Diagnosis card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border overflow-hidden"
          style={{ background: sev.bg, borderColor: sev.border }}
        >
          <div className="h-1.5" style={{ background: sev.bar }} />
          <div className="p-4">
            <div className="flex items-start gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: sev.bar + "22" }}
              >
                <SevIcon size={20} style={{ color: sev.bar }} />
              </div>
              <div>
                <Badge
                  className="text-xs mb-1.5 font-semibold px-2 py-0.5 rounded-full border-0"
                  style={{ background: sev.bar + "28", color: sev.text }}
                >
                  {sev.label}
                </Badge>
                <h2
                  className="text-xl font-bold leading-tight"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    color: sev.text,
                  }}
                >
                  {diagnosis.condition}
                </h2>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: sev.text + "cc" }}
            >
              {diagnosis.description}
            </p>
          </div>
        </motion.div>

        {/* First Aid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border bg-white p-4"
          style={{ borderColor: "#e8d5c4" }}
        >
          <h3
            className="font-bold text-base mb-3 flex items-center gap-2"
            style={{ fontFamily: "var(--font-playfair)", color: "#3d1a2e" }}
          >
            <span className="text-lg">🩹</span> {t(lang, "firstAid")}
          </h3>
          <div className="space-y-2.5">
            {diagnosis.firstAid.map((step, i) => (
              <div key={i} className="flex gap-3 items-start">
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
                  {step}
                </p>
              </div>
            ))}
          </div>
          {diagnosis.whenToSeek && (
            <>
              <Separator className="my-3" style={{ background: "#e8d5c4" }} />
              <div
                className="flex gap-2 items-start p-2.5 rounded-lg"
                style={{ background: "#f8f0e8" }}
              >
                <Clock
                  size={14}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "#85325c" }}
                />
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "#6a4a5a" }}
                >
                  {diagnosis.whenToSeek}
                </p>
              </div>
            </>
          )}
        </motion.div>

        {/* Medicines */}
        {diagnosis.medicines.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl border bg-white p-4"
            style={{ borderColor: "#e8d5c4" }}
          >
            <h3
              className="font-bold text-base mb-1 flex items-center gap-2"
              style={{ fontFamily: "var(--font-playfair)", color: "#3d1a2e" }}
            >
              <Pill size={18} style={{ color: "#85325c" }} />{" "}
              {t(lang, "medicines")}
            </h3>
            <p className="text-xs mb-3" style={{ color: "#9a7a8a" }}>
              Available at Jan Aushadhi stores
            </p>
            <div className="space-y-2.5">
              {diagnosis.medicines.map((med, i) => (
                <div
                  key={i}
                  className="flex gap-3 p-3 rounded-xl border"
                  style={{ background: "#faf6f0", borderColor: "#e8d5c4" }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "#85325c22" }}
                  >
                    <Pill size={16} style={{ color: "#85325c" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className="font-semibold text-sm"
                        style={{ color: "#3d1a2e" }}
                      >
                        {med.name}
                      </p>
                      <Badge
                        variant="outline"
                        className="text-xs flex-shrink-0 border-[#e0c8d0]"
                        style={{ color: "#85325c" }}
                      >
                        {med.price}
                      </Badge>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "#6a4a5a" }}>
                      {med.dosage}
                    </p>
                    {med.note && (
                      <p
                        className="text-xs mt-1 italic"
                        style={{ color: "#9a7a8a" }}
                      >
                        {med.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p
              className="text-[11px] mt-3 text-center italic"
              style={{ color: "#9a7a8a" }}
            >
              ⚠️ {t(lang, "disclaimer")}
            </p>
          </motion.div>
        )}

        {/* Hospitals — real GPS via dedicated page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border bg-white p-4"
          style={{ borderColor: "#e8d5c4" }}
        >
          <h3
            className="font-bold text-base mb-3 flex items-center gap-2"
            style={{ fontFamily: "var(--font-playfair)", color: "#3d1a2e" }}
          >
            <Hospital size={18} style={{ color: "#85325c" }} />{" "}
            {t(lang, "hospitals")}
          </h3>
          <div
            className="p-4 rounded-xl text-center"
            style={{ background: "#faf6f0", border: "1px solid #e8d5c4" }}
          >
            <MapPin
              size={24}
              className="mx-auto mb-2"
              style={{ color: "#85325c" }}
            />
            <p
              className="text-sm font-medium mb-1"
              style={{ color: "#3d1a2e" }}
            >
              Find real hospitals near you
            </p>
            <p className="text-xs mb-3" style={{ color: "#8a6a7a" }}>
              GPS-based search using OpenStreetMap
            </p>
            <button
              onClick={() => router.push("/app/hospitals")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium mx-auto hover:opacity-80 transition-opacity"
              style={{ background: "#85325c", color: "#f0eada" }}
            >
              <Navigation size={14} /> Show Hospitals Near Me
            </button>
          </div>
        </motion.div>

        {/* Bottom actions — fixed with generous offset so bar and buttons stay visible */}
        {/* Bottom actions */}
        <div
          className="fixed bottom-0 left-0 right-0 border-t border-[#e0cfc0] z-30 p-4"
          style={{
            background: "rgba(240,234,218,0.98)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="md:pl-64">
            <div className="max-w-2xl mx-auto flex gap-3">
              <Button
                onClick={shareOnWhatsApp}
                variant="outline"
                className="flex-1 h-11 gap-2 rounded-xl border-[#85325c] font-semibold"
                style={{ color: "#85325c" }}
              >
                <Share2 size={16} /> {t(lang, "shareWhatsApp")}
              </Button>
              <Button
                onClick={() => router.push("/app")}
                className="flex-1 h-11 gap-1.5 rounded-xl font-semibold"
                style={{
                  background: "#85325c",
                  color: "#f0eada",
                  border: "none",
                }}
              >
                {t(lang, "backHome")} <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
