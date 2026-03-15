"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  History,
  Trash2,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  Info,
  Clock,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Diagnosis, Language } from "@/types";

interface HistoryEntry {
  id: string;
  diagnosis: Diagnosis;
  symptoms: string[];
  language: Language;
  timestamp: number;
}

const severityConfig = {
  mild: {
    icon: CheckCircle,
    bg: "#EAF3DE",
    border: "#97C459",
    text: "#3B6D11",
    bar: "#639922",
    label: "Mild",
  },
  moderate: {
    icon: Info,
    bg: "#FAEEDA",
    border: "#EF9F27",
    text: "#854F0B",
    bar: "#BA7517",
    label: "Moderate",
  },
  urgent: {
    icon: AlertTriangle,
    bg: "#FCEBEB",
    border: "#F09595",
    text: "#A32D2D",
    bar: "#E24B4A",
    label: "Urgent",
  },
};

function formatDate(ts: number): string {
  const d = new Date(ts);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffHrs = diffMs / (1000 * 60 * 60);
  if (diffHrs < 1) return "Just now";
  if (diffHrs < 24) return `${Math.floor(diffHrs)}h ago`;
  if (diffHrs < 48) return "Yesterday";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export default function HistoryPage() {
  const router = useRouter();
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("sehat_history");
      if (raw) setEntries(JSON.parse(raw));
    } catch {
      /* ignore parse errors */
    }
    setLoaded(true);
  }, []);

  const deleteEntry = (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    localStorage.setItem("sehat_history", JSON.stringify(updated));
  };

  const clearAll = () => {
    setEntries([]);
    localStorage.removeItem("sehat_history");
  };

  const revisitDiagnosis = (entry: HistoryEntry) => {
    sessionStorage.setItem("sehat_diagnosis", JSON.stringify(entry.diagnosis));
    sessionStorage.setItem("sehat_lang", entry.language);
    router.push("/app/result");
  };

  return (
    <div className="min-h-screen" style={{ background: "#f0eada" }}>
      <div className="max-w-2xl mx-auto px-4 py-6 pb-16 space-y-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between"
        >
          <div>
            <h2
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-playfair)", color: "#3d1a2e" }}
            >
              My History
            </h2>
            <p className="text-sm mt-1" style={{ color: "#8a6a7a" }}>
              मेरा इतिहास — Past diagnoses saved locally
            </p>
          </div>
          {entries.length > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all hover:border-red-300 hover:text-red-600 mt-1"
              style={{ border: "1px solid #e0c8d0", color: "#9a7a8a" }}
            >
              <Trash2 size={12} /> Clear all
            </button>
          )}
        </motion.div>

        {/* Stats bar */}
        {loaded && entries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="grid grid-cols-3 gap-3"
          >
            {[
              { label: "Total checks", value: entries.length, bg: "#f0eada" },
              {
                label: "Urgent cases",
                value: entries.filter((e) => e.diagnosis.severity === "urgent")
                  .length,
                bg: "#FCEBEB",
              },
              {
                label: "This week",
                value: entries.filter(
                  (e) => Date.now() - e.timestamp < 7 * 24 * 60 * 60 * 1000,
                ).length,
                bg: "#E1F5EE",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-xl p-3 text-center border border-[#e8d5c4]"
                style={{ background: s.bg }}
              >
                <p
                  className="text-xl font-bold"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    color: "#3d1a2e",
                  }}
                >
                  {s.value}
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: "#8a6a7a" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Empty state */}
        {loaded && entries.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div
              className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: "#85325c15" }}
            >
              <History size={28} style={{ color: "#85325c" }} />
            </div>
            <p
              className="font-semibold mb-1"
              style={{ fontFamily: "var(--font-playfair)", color: "#3d1a2e" }}
            >
              No diagnoses yet
            </p>
            <p className="text-sm mb-5" style={{ color: "#8a6a7a" }}>
              Your diagnosis history will appear here
            </p>
            <button
              onClick={() => router.push("/app")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium mx-auto hover:opacity-80"
              style={{ background: "#85325c", color: "#f0eada" }}
            >
              Start a diagnosis
            </button>
          </motion.div>
        )}

        {/* History entries */}
        <AnimatePresence>
          {entries.map((entry, i) => {
            const sev =
              severityConfig[entry.diagnosis.severity] || severityConfig.mild;
            const SevIcon = sev.icon;
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20, height: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white rounded-2xl border border-[#e8d5c4] overflow-hidden"
              >
                <div className="h-1" style={{ background: sev.bar }} />
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: sev.bg }}
                    >
                      <SevIcon size={16} style={{ color: sev.bar }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className="font-semibold text-sm leading-tight"
                          style={{
                            fontFamily: "var(--font-playfair)",
                            color: "#3d1a2e",
                          }}
                        >
                          {entry.diagnosis.condition}
                        </p>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Clock size={10} style={{ color: "#9a7a8a" }} />
                          <span
                            className="text-[10px]"
                            style={{ color: "#9a7a8a" }}
                          >
                            {formatDate(entry.timestamp)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: sev.bg, color: sev.text }}
                        >
                          {sev.label}
                        </span>
                        <span
                          className="text-[10px]"
                          style={{ color: "#9a7a8a" }}
                        >
                          {entry.symptoms.join(", ")}
                        </span>
                      </div>
                      <p
                        className="text-xs mt-2 line-clamp-2"
                        style={{ color: "#6a4a5a" }}
                      >
                        {entry.diagnosis.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3 pt-3 border-t border-[#f0e8e0]">
                    <button
                      onClick={() => revisitDiagnosis(entry)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition-all hover:opacity-80"
                      style={{ background: "#85325c", color: "#f0eada" }}
                    >
                      <RotateCcw size={12} /> View details{" "}
                      <ChevronRight size={12} />
                    </button>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="px-3 py-2 rounded-xl text-xs font-medium border transition-all hover:border-red-300 hover:text-red-500"
                      style={{ border: "1px solid #e0c8d0", color: "#9a7a8a" }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
