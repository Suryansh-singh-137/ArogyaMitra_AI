"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  Stethoscope,
  ChevronRight,
  Sparkles,
  Send,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { SYMPTOMS } from "@/lib/conditions";
import { getDiagnosis } from "@/lib/ai";
import { t } from "@/lib/i18n";
import type { Language, AgeGroup } from "@/types";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
  ModalFooter,
} from "@/components/ui/animated-modal";

const LANGUAGES: { code: Language; label: string; native: string }[] = [
  { code: "hi", label: "Hindi", native: "हिंदी" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "en", label: "English", native: "English" },
];

const AGE_GROUPS: AgeGroup[] = ["child", "adult", "senior"];

const KEYWORD_MAP: Record<string, string[]> = {
  fever: [
    "बुखार",
    "fever",
    "ज्वर",
    "জ্বর",
    "காய்ச்சல்",
    "జ్వరం",
    "ताप",
    "temp",
    "hot",
    "tez bukhar",
  ],
  cough: [
    "खांसी",
    "cough",
    "কাশি",
    "இருமல்",
    "దగ్గు",
    "खोकला",
    "khansi",
    "khaansi",
  ],
  headache: [
    "सिरदर्द",
    "headache",
    "মাথা",
    "தலைவலி",
    "తలనొప్పి",
    "डोकेदुखी",
    "sir dard",
    "sar dard",
  ],
  stomach: [
    "पेट",
    "stomach",
    "পেট",
    "வயிறு",
    "కడుపు",
    "pet dard",
    "abdominal",
    "tummy",
  ],
  chest: [
    "छाती",
    "chest",
    "বুক",
    "மார்பு",
    "ఛాతీ",
    "seena",
    "dil",
    "heart",
    "heartbeat",
    "dhadkan",
    "घबराहट",
    "rukkna",
  ],
  throat: ["गला", "throat", "গলা", "தொண்டை", "గొంతు", "gala", "sore", "निगलना"],
  body: [
    "बदन",
    "body ache",
    "শরীর",
    "உடல்",
    "శరీర",
    "badan",
    "body pain",
    "dard",
  ],
  dizzy: [
    "चक्कर",
    "dizzy",
    "dizziness",
    "মাথা ঘোরা",
    "தலைச்சுற்றல்",
    "chakkar",
    "ghoomna",
  ],
  diarrhea: [
    "दस्त",
    "diarrhea",
    "loose motion",
    "ডায়রিয়া",
    "வயிற்றுப்போக்கு",
    "dast",
    "latrine",
  ],
  vomiting: [
    "उल्टी",
    "vomit",
    "বমি",
    "வாந்தி",
    "వాంతులు",
    "ulti",
    "nausea",
    "ji machlana",
  ],
  rash: [
    "चकत्ते",
    "rash",
    "র্যাশ",
    "தடிப்பு",
    "దద్దుర్లు",
    "skin",
    "itching",
    "khujli",
    "daane",
  ],
  breathless: [
    "सांस",
    "breath",
    "শ্বাসকষ্ট",
    "மூச்சு",
    "శ్వాస",
    "breathing",
    "sans",
    "dam",
    "suffocate",
  ],
};

function extractSymptomsFromText(text: string): string[] {
  const lower = text.toLowerCase();
  return Object.entries(KEYWORD_MAP)
    .filter(([, kws]) => kws.some((kw) => lower.includes(kw.toLowerCase())))
    .map(([id]) => id);
}

export default function SymptomChecker() {
  const router = useRouter();
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
  const [showLangModal, setShowLangModal] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [age, setAge] = useState<AgeGroup>("adult"); // default adult
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [inputMode, setInputMode] = useState<"chips" | "text">("chips");
  const [voiceError, setVoiceError] = useState("");
  const recognitionRef = useRef<{ abort?: () => void } | null>(null);

  // On first load, ask for preferred language across the app
  useEffect(() => {
    try {
      const stored = localStorage.getItem("sehat_lang_default") as
        | Language
        | null;
      if (!stored) setShowLangModal(true);
    } catch {
      setShowLangModal(true);
    }
  }, []);

  const toggleSymptom = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // FIX 3: Extract symptoms from text AND allow text-only diagnosis
  const handleTextSubmit = () => {
    if (!textInput.trim()) return;
    const found = extractSymptomsFromText(textInput);
    if (found.length > 0) {
      setSelected((prev) => new Set([...prev, ...found]));
    }
    // Even if no keywords matched, text itself will be sent as additionalInfo
  };

  // Voice: start recognition directly (browser will prompt for mic). Use Chrome for best support.
  const startVoice = () => {
    setVoiceError("");
    const hasSpeechAPI =
      "webkitSpeechRecognition" in window || "SpeechRecognition" in window;

    if (!hasSpeechAPI) {
      setVoiceError("Voice not supported in this browser. Please use Chrome.");
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort?.();
      } catch {
        /* ignore */
      }
      recognitionRef.current = null;
    }

    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    const rec = new SR();
    recognitionRef.current = rec;

    const langMap: Record<Language, string> = {
      hi: "hi-IN",
      bn: "bn-IN",
      ta: "ta-IN",
      te: "te-IN",
      mr: "mr-IN",
      en: "en-IN",
    };

    rec.lang = langMap[lang];
    rec.continuous = false;
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    setListening(true);

    rec.onstart = () => setListening(true);

    rec.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript?.trim();
      if (transcript) {
        setTextInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
        const found = extractSymptomsFromText(transcript);
        if (found.length > 0) {
          setSelected((prev) => new Set([...prev, ...found]));
        }
      }
      setListening(false);
    };

    rec.onerror = (e: any) => {
      if (recognitionRef.current === rec) recognitionRef.current = null;
      setListening(false);
      if (e.error === "not-allowed") {
        setVoiceError(
          "Microphone blocked. Allow microphone when the browser asks, then try again.",
        );
      } else if (e.error === "network") {
        setVoiceError(
          "Voice needs internet. Type your symptoms instead — works offline!",
        );
      } else if (e.error === "no-speech") {
        setVoiceError("No speech detected. Speak clearly and try again.");
      } else if (e.error === "aborted") {
        /* ignore */
      } else {
        setVoiceError(
          "Voice unavailable. Please type your symptoms in the box above.",
        );
      }
      if (e.error !== "aborted") setTimeout(() => setVoiceError(""), 5000);
    };

    rec.onend = () => {
      if (recognitionRef.current === rec) recognitionRef.current = null;
      setListening(false);
    };

    try {
      rec.start();
    } catch {
      setListening(false);
      setVoiceError("Could not start voice. Please type your symptoms.");
    }
  };

  const handleDiagnose = async () => {
    // FIX 3: allow diagnosis with EITHER chips OR text (no chips required)
    const hasSymptoms = selected.size > 0 || textInput.trim().length > 3;
    if (!hasSymptoms) return;

    setLoading(true);
    try {
      // If text was typed but no chips matched, still send the text
      const symptomsArray =
        selected.size > 0 ? Array.from(selected) : ["general"]; // fallback so API doesn't get empty array

      // Read saved allergies from localStorage to inject into the AI prompt
      let allergies: string[] | undefined;
      try {
        const raw = localStorage.getItem("sehat_allergies");
        if (raw) {
          const parsed = JSON.parse(raw) as string[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            allergies = parsed.filter(
              (a) => typeof a === "string" && a.trim().length > 0,
            );
          }
        }
      } catch {
        allergies = undefined;
      }

      const diagnosis = await getDiagnosis({
        symptoms: symptomsArray,
        age,
        language: lang,
        additionalInfo: textInput.trim() || undefined,
        allergies,
      });
      sessionStorage.setItem("sehat_diagnosis", JSON.stringify(diagnosis));
      sessionStorage.setItem("sehat_lang", lang);
      sessionStorage.setItem("sehat_symptoms", JSON.stringify(symptomsArray));
      router.push("/app/result");
    } catch {
      setLoading(false);
    }
  };

  // FIX 3: can diagnose with chips OR free text
  const canDiagnose = selected.size > 0 || textInput.trim().length > 3;

  return (
    <div className="min-h-screen" style={{ background: "#f0eada" }}>
      <div className="max-w-2xl mx-auto px-4 py-6 pb-32 space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-playfair)", color: "#3d1a2e" }}
          >
            {t(lang, "selectSymptoms")}
          </h2>
          <p className="text-sm mt-1" style={{ color: "#8a6a7a" }}>
            {t(lang, "typeFreelyHint")}
          </p>
        </motion.div>

        {/* Language */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl border border-[#e8d5c4] p-4"
        >
          <p
            className="text-xs font-semibold mb-3 uppercase tracking-wider"
            style={{ color: "#85325c" }}
          >
            Language / भाषा
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
                  "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border",
                  lang === l.code
                    ? "border-transparent text-white shadow-sm"
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
        </motion.section>

        {/* Text + voice — always visible at top */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.07 }}
          className="bg-white rounded-2xl border border-[#e8d5c4] p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <p
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "#85325c" }}
            >
              {t(lang, "describeProblem")}
            </p>
            {/* mode toggle */}
            <div
              className="flex rounded-lg p-0.5"
              style={{ background: "#f0eada", border: "1px solid #e0c8d0" }}
            >
              {(["chips", "text"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setInputMode(mode)}
                  className="px-3 py-1 rounded-md text-xs font-medium transition-all"
                  style={
                    inputMode === mode
                      ? { background: "#85325c", color: "#f0eada" }
                      : { color: "#85325c" }
                  }
                >
                {mode === "chips" ? "Chips" : "Free text"}
                </button>
              ))}
            </div>
          </div>

          {/* Textarea with voice + send inside */}
          <div className="relative">
            <Textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleTextSubmit();
                }
              }}
              placeholder={
                lang === "hi"
                  ? "अपने लक्षण लिखें... जैसे: मेरा दिल की धड़कन रुक रही है, सांस नहीं आ रही"
                  : lang === "bn"
                    ? "আপনার উপসর্গ লিখুন... যেমন: বুকে ব্যথা হচ্ছে"
                    : lang === "ta"
                      ? "உங்கள் பிரச்சினையை விவரிக்கவும்..."
                      : lang === "te"
                        ? "మీ సమస్యను వివరించండి..."
                        : "Describe your problem freely... e.g. my heartbeat stopped, I have chest pain and can't breathe"
              }
              className="pr-24 resize-none text-sm rounded-xl border-[#e8d5c4] focus-visible:ring-[#85325c]/30"
              style={{ minHeight: 90, background: "#faf6f0", color: "#3d1a2e" }}
              rows={3}
            />
            <div className="absolute right-2 bottom-2 flex gap-1.5">
              {textInput && (
                <button
                  onClick={() => setTextInput("")}
                  className="w-7 h-7 rounded-lg flex items-center justify-center hover:opacity-80"
                  style={{ background: "#e8d5c4" }}
                >
                  <X size={12} style={{ color: "#85325c" }} />
                </button>
              )}
              {/* Voice button — touch-manipulation helps tap reliability on mobile */}
              <button
                type="button"
                onClick={() => { if (!listening) startVoice(); }}
                aria-label={t(lang, "voicePrompt")}
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center transition-all touch-manipulation",
                  listening ? "cursor-not-allowed" : "hover:opacity-80",
                )}
                style={{ background: listening ? "#85325c" : "#e8d5c4" }}
                title={listening ? "Listening..." : t(lang, "voicePrompt")}
              >
                {listening ? (
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                  >
                    <Mic size={14} className="text-white" />
                  </motion.div>
                ) : (
                  <Mic size={14} style={{ color: "#85325c" }} />
                )}
              </button>
              {/* Send / extract button */}
              <button
                onClick={handleTextSubmit}
                disabled={!textInput.trim()}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-80 disabled:opacity-40"
                style={{ background: "#85325c" }}
                title="Extract symptoms from text"
              >
                <Send size={13} className="text-white" />
              </button>
            </div>
          </div>

          <p className="text-[11px] mt-1.5" style={{ color: "#8a6a7a" }}>
            Voice works in Chrome — tap the mic to speak, or type above.
          </p>

          {/* Voice error message */}
          <AnimatePresence>
            {voiceError && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start justify-between gap-2 px-3 py-2.5 rounded-xl"
                style={{ background: "#FCEBEB", border: "1px solid #F7C1C1" }}
              >
                <div className="flex items-start gap-2">
                  <span className="text-sm flex-shrink-0 mt-0.5">⚠️</span>
                  <div>
                    <p
                      className="text-xs font-medium"
                      style={{ color: "#A32D2D" }}
                    >
                      {voiceError}
                    </p>
                    <p
                      className="text-[11px] mt-0.5"
                      style={{ color: "#A32D2D", opacity: 0.75 }}
                    >
                      💡 Tip: Type your symptoms in the box — works without
                      internet!
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setVoiceError("")}
                  className="flex-shrink-0 mt-0.5"
                >
                  <X size={12} style={{ color: "#A32D2D" }} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Listening indicator */}
          <AnimatePresence>
            {listening && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg"
                style={{ background: "#85325c15" }}
              >
                <div className="flex gap-0.5">
                  {[0, 0.15, 0.3].map((d) => (
                    <motion.span
                      key={d}
                      className="w-1 h-3 rounded-full"
                      style={{ background: "#85325c" }}
                      animate={{ scaleY: [1, 2, 1] }}
                      transition={{ repeat: Infinity, duration: 0.5, delay: d }}
                    />
                  ))}
                </div>
                <span
                  className="text-xs font-medium"
                  style={{ color: "#85325c" }}
                >
                  Listening... {lang === "hi" ? "बोलें" : "speak now"}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hint when text is entered but no chips matched */}
          <AnimatePresence>
            {textInput.trim().length > 3 && selected.size === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs px-1"
                style={{ color: "#85325c" }}
              >
                ✓ Your description will be sent directly to AI — no chips needed
              </motion.p>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Symptom chips — only in chips mode */}
        <AnimatePresence>
          {inputMode === "chips" && (
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-[#e8d5c4] p-4"
            >
        <p
          className="text-xs font-semibold mb-3 uppercase tracking-wider"
          style={{ color: "#85325c" }}
        >
          {t(lang, "orTapSymptoms")}
        </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SYMPTOMS.map((symptom, i) => {
                  const isSelected = selected.has(symptom.id);
                  return (
                    <motion.button
                      key={symptom.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.025 }}
                      onClick={() => toggleSymptom(symptom.id)}
                      className={cn(
                        "flex items-center gap-2 p-3 rounded-xl border text-left transition-all duration-200 relative overflow-hidden",
                        isSelected
                          ? "border-[#85325c]"
                          : "bg-[#faf6f0] border-[#e8d5c4] hover:border-[#85325c]/50",
                      )}
                      style={
                        isSelected
                          ? { background: "#f0eada", borderColor: "#85325c" }
                          : {}
                      }
                    >
                      {isSelected && (
                        <motion.div
                          className="absolute inset-0 rounded-xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          style={{ background: "#85325c0d" }}
                        />
                      )}
                      <span className="text-lg relative z-10">
                        {symptom.emoji}
                      </span>
                      <span
                        className="text-xs font-medium relative z-10 leading-tight"
                        style={{ color: isSelected ? "#85325c" : "#3d1a2e" }}
                      >
                        {symptom.labels[lang]}
                      </span>
                      {isSelected && (
                        <motion.div
                          className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          style={{ background: "#85325c" }}
                        >
                          <span className="text-white text-[8px] font-bold">
                            ✓
                          </span>
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Age selector */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="bg-white rounded-2xl border border-[#e8d5c4] p-4"
        >
          <p
            className="text-xs font-semibold mb-3 uppercase tracking-wider"
            style={{ color: "#85325c" }}
          >
            {t(lang, "selectAge")}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {AGE_GROUPS.map((a) => (
              <button
                key={a}
                onClick={() => setAge(a)}
                className={cn(
                  "py-3 px-2 rounded-xl border text-center transition-all duration-200 text-sm font-medium",
                  age === a
                    ? "border-[#85325c] text-white shadow-sm"
                    : "bg-[#faf6f0] border-[#e8d5c4] hover:border-[#85325c]/50",
                )}
                style={
                  age === a
                    ? { background: "#85325c", color: "#f0eada" }
                    : { color: "#3d1a2e" }
                }
              >
                {t(lang, a)}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Selected chips summary */}
        <AnimatePresence>
          {selected.size > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-2xl border border-[#e8d5c4] p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <p
                  className="text-xs font-semibold"
                  style={{ color: "#85325c" }}
                >
                  {selected.size} symptom{selected.size !== 1 ? "s" : ""}{" "}
                  selected
                </p>
                <button
                  onClick={() => setSelected(new Set())}
                  className="text-xs underline"
                  style={{ color: "#9a7a8a" }}
                >
                  Clear all
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {Array.from(selected).map((id) => {
                  const sym = SYMPTOMS.find((s) => s.id === id);
                  return sym ? (
                    <Badge
                      key={id}
                      variant="outline"
                      className="text-xs gap-1 border-[#e0c8d0] cursor-pointer hover:border-[#85325c]"
                      style={{ color: "#85325c" }}
                      onClick={() => toggleSymptom(id)}
                    >
                      {sym.emoji} {sym.labels[lang]} ×
                    </Badge>
                  ) : null;
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Global language selection modal on first app visit */}
      {showLangModal && (
        <Modal defaultOpen>
          <ModalBody>
            <ModalContent className="bg-white">
              <h4
                className="text-lg font-bold mb-1 text-center"
                style={{ fontFamily: "var(--font-playfair)", color: "#3d1a2e" }}
              >
                स्वास्थ्य सहायक भाषा चुनें
              </h4>
              <p
                className="text-xs text-center mb-4"
                style={{ color: "#8a6a7a" }}
              >
                Choose app language for all screens
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => {
                      setLang(l.code);
                      try {
                        localStorage.setItem("sehat_lang_default", l.code);
                      } catch {
                        // ignore
                      }
                      setShowLangModal(false);
                    }}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium border transition-all",
                      lang === l.code
                        ? "border-transparent text-white shadow-sm"
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
              <ModalFooter className="justify-center mt-4 pt-3 border-t border-[#e8d5c4] gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 rounded-lg border-[#e0c8d0]"
                  style={{ color: "#85325c" }}
                  onClick={() => setShowLangModal(false)}
                >
                  Continue in default (हिंदी)
                </Button>
              </ModalFooter>
            </ModalContent>
          </ModalBody>
        </Modal>
      )}

      {/* Sticky CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 md:left-64 p-4 border-t border-[#e0cfc0] z-30"
        style={{
          background: "rgba(240,234,218,0.97)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-2xl mx-auto space-y-1.5">
          <Button
            onClick={handleDiagnose}
            disabled={!canDiagnose || loading}
            className="w-full h-12 text-base font-semibold rounded-xl gap-2"
            style={{
              background: canDiagnose ? "#85325c" : "#c4a8b8",
              color: "#f0eada",
              border: "none",
            }}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Sparkles size={16} />
                </motion.div>
                {t(lang, "analyzing")}
              </span>
            ) : (
              <>
                <Stethoscope size={18} />
                {t(lang, "diagnose")}
                <ChevronRight size={16} />
              </>
            )}
          </Button>
          <p className="text-center text-[11px]" style={{ color: "#9a7a8a" }}>
            {t(lang, "disclaimer")}
          </p>
        </div>
      </div>
    </div>
  );
}
