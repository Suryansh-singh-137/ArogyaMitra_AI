"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const [allergies, setAllergies] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("sehat_allergies");
      if (raw) {
        const parsed = JSON.parse(raw) as string[];
        if (Array.isArray(parsed)) {
          setAllergies(
            parsed.filter((a) => typeof a === "string" && a.trim().length > 0),
          );
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const persist = (items: string[]) => {
    setAllergies(items);
    try {
      localStorage.setItem("sehat_allergies", JSON.stringify(items));
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } catch {
      // ignore
    }
  };

  const addAllergy = () => {
    const value = input.trim();
    if (!value) return;
    if (allergies.includes(value)) {
      setInput("");
      return;
    }
    const next = [...allergies, value];
    setInput("");
    persist(next);
  };

  const removeAllergy = (value: string) => {
    const next = allergies.filter((a) => a !== value);
    persist(next);
  };

  const clearAll = () => {
    persist([]);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addAllergy();
    }
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
            Health Profile
          </h2>
          <p className="text-sm mt-1" style={{ color: "#8a6a7a" }}>
            अपनी allergies यहाँ सेव करें — दवाई सुझाते समय AI इन्हें ध्यान में
            रखेगा
          </p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl border border-[#e8d5c4] p-4 space-y-3"
        >
          <p
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#85325c" }}
          >
            Allergies / एलर्जी
          </p>
          <p className="text-xs" style={{ color: "#8a6a7a" }}>
            जैसे: penicillin, sulpha drugs, paracetamol, peanuts, eggs, dust,
            आदि
          </p>
          <div className="flex gap-2 mt-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="नई allergy लिखें और Enter दबाएँ"
              className="text-sm rounded-xl border-[#e8d5c4]"
              style={{ background: "#faf6f0", color: "#3d1a2e" }}
            />
            <Button
              type="button"
              onClick={addAllergy}
              disabled={!input.trim()}
              className="h-10 px-3 rounded-xl"
              style={{
                background: input.trim() ? "#85325c" : "#c4a8b8",
                color: "#f0eada",
                border: "none",
              }}
            >
              <Plus size={16} />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {allergies.length === 0 && (
              <span
                className="text-xs"
                style={{ color: "#9a7a8a" }}
              >
                अभी कोई allergy सेव नहीं है।
              </span>
            )}
            {allergies.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => removeAllergy(a)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border hover:border-[#85325c] transition-all"
                style={{
                  borderColor: "#e0c8d0",
                  background: "#faf6f0",
                  color: "#85325c",
                }}
              >
                {a}
                <X size={12} />
              </button>
            ))}
          </div>

          {allergies.length > 0 && (
            <div className="flex justify-between items-center mt-2">
              <button
                type="button"
                onClick={clearAll}
                className="text-[11px] underline"
                style={{ color: "#9a7a8a" }}
              >
                Clear all allergies
              </button>
              <AnimatePresence>
                {saved && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="text-[11px]"
                    style={{ color: "#4a7a2a" }}
                  >
                    Saved ✓
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="bg-white rounded-2xl border border-[#e8d5c4] p-4 flex gap-3"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "#FCEBEB" }}
          >
            <AlertTriangle size={16} style={{ color: "#A32D2D" }} />
          </div>
          <div>
            <p
              className="text-sm font-semibold"
              style={{ color: "#3d1a2e" }}
            >
              डेटा केवल आपके फ़ोन में
            </p>
            <p className="text-xs mt-1" style={{ color: "#8a6a7a" }}>
              Allergies केवल आपके browser में localStorage में सेव होती हैं। यह
              server पर नहीं भेजी जातीं, सिर्फ़ AI prompt में जोड़ी जाती हैं ताकि
              unsafe दवाइयों को flag किया जा सके।
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

