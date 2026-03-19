"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, RefObject } from "react";

/* ─── hooks ─────────────────────────────────────────────────────────────── */
const useInView = (
  threshold = 0.15,
): [RefObject<HTMLDivElement | null>, boolean] => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

/* ─── illustrations ──────────────────────────────────────────────────────── */
const DoctorIllustration = () => (
  <svg
    viewBox="0 0 320 380"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", maxWidth: 320 }}
  >
    <circle cx="160" cy="200" r="150" fill="#e8d5c4" opacity="0.35" />
    <ellipse cx="160" cy="290" rx="62" ry="75" fill="#85325c" />
    <ellipse cx="160" cy="295" rx="58" ry="70" fill="#f5ede0" />
    <rect x="130" y="240" width="60" height="120" rx="8" fill="#f5ede0" />
    <path d="M160 250 L140 230 L138 280 Z" fill="#85325c" opacity="0.15" />
    <path d="M160 250 L180 230 L182 280 Z" fill="#85325c" opacity="0.15" />
    <path
      d="M145 265 Q130 280 132 298 Q134 318 148 318 Q162 318 162 305 Q162 295 155 292"
      stroke="#85325c"
      strokeWidth="3.5"
      fill="none"
      strokeLinecap="round"
    />
    <circle cx="155" cy="290" r="7" fill="#85325c" />
    <circle cx="155" cy="290" r="4" fill="#f0eada" />
    <rect x="148" y="168" width="24" height="32" rx="10" fill="#d4956a" />
    <ellipse cx="160" cy="150" rx="46" ry="52" fill="#e8a87c" />
    <ellipse cx="160" cy="108" rx="46" ry="28" fill="#3d1a0e" />
    <path
      d="M114 120 Q108 100 120 88 Q140 72 160 72 Q180 72 200 88 Q212 100 206 120"
      fill="#3d1a0e"
    />
    <circle cx="160" cy="82" r="18" fill="#3d1a0e" />
    <path
      d="M148 76 Q160 68 172 76"
      stroke="#5a2a14"
      strokeWidth="2"
      fill="none"
    />
    <ellipse cx="147" cy="148" rx="6" ry="7" fill="white" />
    <ellipse cx="173" cy="148" rx="6" ry="7" fill="white" />
    <circle cx="148" cy="149" r="4" fill="#2d1810" />
    <circle cx="174" cy="149" r="4" fill="#2d1810" />
    <circle cx="150" cy="147" r="1.5" fill="white" />
    <circle cx="176" cy="147" r="1.5" fill="white" />
    <path
      d="M141 139 Q148 135 155 138"
      stroke="#3d1a0e"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M165 138 Q172 135 179 139"
      stroke="#3d1a0e"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M158 155 Q156 165 158 168 Q162 170 166 168 Q168 165 162 155"
      fill="none"
      stroke="#c4845a"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M148 174 Q160 184 172 174"
      stroke="#c4845a"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    <ellipse cx="138" cy="168" rx="10" ry="6" fill="#e88c6a" opacity="0.4" />
    <ellipse cx="182" cy="168" rx="10" ry="6" fill="#e88c6a" opacity="0.4" />
    <rect
      x="178"
      y="260"
      width="38"
      height="48"
      rx="4"
      fill="#85325c"
      opacity="0.85"
    />
    <rect x="181" y="264" width="32" height="40" rx="2" fill="#f5ede0" />
    <rect
      x="185"
      y="272"
      width="20"
      height="2.5"
      rx="1"
      fill="#85325c"
      opacity="0.5"
    />
    <rect
      x="185"
      y="278"
      width="16"
      height="2.5"
      rx="1"
      fill="#85325c"
      opacity="0.4"
    />
    <rect
      x="185"
      y="284"
      width="18"
      height="2.5"
      rx="1"
      fill="#85325c"
      opacity="0.4"
    />
    <rect x="192" y="255" width="12" height="8" rx="3" fill="#85325c" />
    <path
      d="M102 260 Q88 280 92 305 Q96 320 108 318"
      stroke="#f5ede0"
      strokeWidth="18"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M218 260 Q232 275 228 298 Q226 312 216 318"
      stroke="#f5ede0"
      strokeWidth="18"
      strokeLinecap="round"
      fill="none"
    />
    <ellipse cx="96" cy="314" rx="14" ry="10" fill="#d4956a" />
    <ellipse cx="218" cy="316" rx="14" ry="10" fill="#d4956a" />
    <path
      d="M52 180 Q52 173 58 173 Q64 173 64 180 Q64 187 52 195 Q40 187 40 180 Q40 173 46 173 Q52 173 52 180Z"
      fill="#85325c"
      opacity="0.25"
      transform="scale(0.8) translate(15,10)"
    />
    <path
      d="M268 120 Q268 114 273 114 Q278 114 278 120 Q278 126 268 133 Q258 126 258 120 Q258 114 263 114 Q268 114 268 120Z"
      fill="#85325c"
      opacity="0.2"
    />
    <path
      d="M36 130 Q36 125 40 125 Q44 125 44 130 Q44 135 36 140 Q28 135 28 130 Q28 125 32 125 Q36 125 36 130Z"
      fill="#85325c"
      opacity="0.15"
    />
    <path
      d="M240 160 L242 155 L244 160 L249 162 L244 164 L242 169 L240 164 L235 162Z"
      fill="#85325c"
      opacity="0.3"
    />
    <path
      d="M75 220 L76.5 216 L78 220 L82 221.5 L78 223 L76.5 227 L75 223 L71 221.5Z"
      fill="#85325c"
      opacity="0.2"
    />
  </svg>
);

const VillagerIllustration = () => (
  <svg
    viewBox="0 0 200 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", maxWidth: 180 }}
  >
    <circle cx="100" cy="120" r="90" fill="#d4b896" opacity="0.2" />
    <ellipse cx="100" cy="175" rx="42" ry="45" fill="#c9956a" opacity="0.85" />
    <rect x="62" y="145" width="76" height="75" rx="6" fill="#b8845a" />
    <path
      d="M85 155 L85 195"
      stroke="#f0eada"
      strokeWidth="1.5"
      opacity="0.4"
    />
    <path
      d="M100 152 L100 200"
      stroke="#f0eada"
      strokeWidth="1.5"
      opacity="0.4"
    />
    <path
      d="M115 155 L115 195"
      stroke="#f0eada"
      strokeWidth="1.5"
      opacity="0.4"
    />
    <rect x="90" y="110" width="20" height="26" rx="8" fill="#d4956a" />
    <ellipse cx="100" cy="92" rx="36" ry="38" fill="#c8845a" />
    <ellipse cx="100" cy="60" rx="38" ry="20" fill="#85325c" />
    <path
      d="M62 62 Q100 42 138 62 Q138 58 100 50 Q62 58 62 62Z"
      fill="#6e2249"
    />
    <path
      d="M62 65 Q68 55 100 52 Q132 55 138 65"
      fill="#9e3d6e"
      opacity="0.5"
    />
    <ellipse cx="100" cy="56" rx="12" ry="8" fill="#9e3d6e" />
    <ellipse cx="86" cy="90" rx="5" ry="6" fill="white" />
    <ellipse cx="114" cy="90" rx="5" ry="6" fill="white" />
    <circle cx="87" cy="91" r="3.5" fill="#2d1810" />
    <circle cx="115" cy="91" r="3.5" fill="#2d1810" />
    <circle cx="88" cy="90" r="1" fill="white" />
    <circle cx="116" cy="90" r="1" fill="white" />
    <path
      d="M80 82 Q86 79 92 81"
      stroke="#3d1a0e"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M108 81 Q114 79 120 82"
      stroke="#3d1a0e"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M90 103 Q100 111 110 103"
      stroke="#a06040"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    <ellipse cx="80" cy="100" rx="8" ry="5" fill="#e07a5a" opacity="0.35" />
    <ellipse cx="120" cy="100" rx="8" ry="5" fill="#e07a5a" opacity="0.35" />
    <path d="M90 97 Q100 101 110 97" fill="#3d1a0e" opacity="0.6" />
    <rect x="130" y="155" width="22" height="36" rx="4" fill="#2d1810" />
    <rect
      x="132"
      y="158"
      width="18"
      height="28"
      rx="2"
      fill="#85325c"
      opacity="0.9"
    />
    <rect
      x="134"
      y="161"
      width="14"
      height="20"
      rx="1"
      fill="#f0eada"
      opacity="0.8"
    />
    <rect
      x="136"
      y="163"
      width="10"
      height="2"
      rx="1"
      fill="#85325c"
      opacity="0.6"
    />
    <rect
      x="136"
      y="167"
      width="8"
      height="1.5"
      rx="1"
      fill="#85325c"
      opacity="0.4"
    />
    <rect
      x="136"
      y="171"
      width="9"
      height="1.5"
      rx="1"
      fill="#85325c"
      opacity="0.4"
    />
  </svg>
);

const PhoneIllustration = () => (
  <svg
    viewBox="0 0 200 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", maxWidth: 160 }}
  >
    <rect x="30" y="20" width="140" height="260" rx="24" fill="#85325c" />
    <rect x="34" y="24" width="132" height="252" rx="21" fill="#2d0f1e" />
    <rect x="40" y="40" width="120" height="220" rx="10" fill="#f0eada" />
    <rect x="40" y="40" width="120" height="20" rx="10" fill="#85325c" />
    <circle cx="100" cy="30" r="6" fill="#1a0810" />
    <rect x="40" y="60" width="120" height="36" fill="#85325c" />
    <circle cx="58" cy="78" r="10" fill="#f0eada" opacity="0.3" />
    <rect x="74" y="72" width="60" height="5" rx="2" fill="#f0eada" />
    <rect
      x="74"
      y="80"
      width="40"
      height="3.5"
      rx="1"
      fill="#f0eada"
      opacity="0.6"
    />
    <rect x="46" y="103" width="30" height="14" rx="7" fill="#85325c" />
    <rect x="80" y="103" width="30" height="14" rx="7" fill="#e8d5c4" />
    <rect x="114" y="103" width="30" height="14" rx="7" fill="#e8d5c4" />
    <rect
      x="48"
      y="107"
      width="26"
      height="6"
      rx="2"
      fill="#f0eada"
      opacity="0.9"
    />
    <rect
      x="46"
      y="125"
      width="52"
      height="28"
      rx="8"
      fill="#f5ede0"
      stroke="#85325c"
      strokeWidth="1.5"
    />
    <rect
      x="104"
      y="125"
      width="52"
      height="28"
      rx="8"
      fill="#85325c"
      opacity="0.15"
      stroke="#85325c"
      strokeWidth="1.5"
    />
    <rect
      x="46"
      y="159"
      width="52"
      height="28"
      rx="8"
      fill="#f5ede0"
      stroke="#e8d5c4"
      strokeWidth="1"
    />
    <rect
      x="104"
      y="159"
      width="52"
      height="28"
      rx="8"
      fill="#85325c"
      opacity="0.15"
      stroke="#85325c"
      strokeWidth="1.5"
    />
    <rect
      x="50"
      y="133"
      width="36"
      height="5"
      rx="2"
      fill="#85325c"
      opacity="0.6"
    />
    <rect
      x="50"
      y="141"
      width="28"
      height="3"
      rx="1"
      fill="#85325c"
      opacity="0.3"
    />
    <rect
      x="108"
      y="133"
      width="36"
      height="5"
      rx="2"
      fill="#85325c"
      opacity="0.7"
    />
    <rect
      x="108"
      y="141"
      width="28"
      height="3"
      rx="1"
      fill="#85325c"
      opacity="0.4"
    />
    <rect
      x="50"
      y="167"
      width="30"
      height="4"
      rx="2"
      fill="#85325c"
      opacity="0.5"
    />
    <rect
      x="108"
      y="167"
      width="36"
      height="5"
      rx="2"
      fill="#85325c"
      opacity="0.7"
    />
    <rect x="46" y="198" width="110" height="34" rx="10" fill="#85325c" />
    <rect
      x="68"
      y="208"
      width="66"
      height="14"
      rx="4"
      fill="#f0eada"
      opacity="0.9"
    />
    <rect x="40" y="240" width="120" height="20" fill="#f5f0e8" />
    <circle cx="70" cy="250" r="5" fill="#85325c" opacity="0.6" />
    <circle cx="100" cy="250" r="5" fill="#85325c" opacity="0.3" />
    <circle cx="130" cy="250" r="5" fill="#85325c" opacity="0.3" />
    <rect
      x="75"
      y="272"
      width="50"
      height="4"
      rx="2"
      fill="#85325c"
      opacity="0.3"
    />
  </svg>
);

/* ─── sub-components ─────────────────────────────────────────────────────── */
interface FeatureCardProps {
  icon: string;
  title: string;
  desc: string;
  delay: number;
}
const FeatureCard = ({ icon, title, desc, delay }: FeatureCardProps) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className="feat-card"
      style={{
        background: "white",
        borderRadius: 20,
        padding: "clamp(1.25rem, 4vw, 2rem) clamp(1.25rem, 4vw, 1.75rem)",
        border: "1.5px solid #e8d5c4",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `all 0.65s ease ${delay}s`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "#f0eada",
          opacity: 0.6,
        }}
      />
      <div
        className="feature-icon"
        style={{ fontSize: "clamp(1.75rem, 4vw, 2rem)", marginBottom: "1rem" }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
          fontWeight: 600,
          color: "#3d1a2e",
          fontFamily: "var(--font-playfair)",
          marginBottom: "0.6rem",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: "clamp(0.85rem, 1.5vw, 0.9rem)",
          color: "#7a5a6a",
          lineHeight: 1.65,
        }}
      >
        {desc}
      </div>
    </div>
  );
};

interface HowStepProps {
  num: string;
  title: string;
  desc: string;
  delay: number;
}
const HowStep = ({ num, title, desc, delay }: HowStepProps) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        gap: "clamp(0.75rem, 3vw, 1.25rem)",
        alignItems: "flex-start",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-24px)",
        transition: `all 0.6s ease ${delay}s`,
      }}
    >
      <div
        style={{
          width: "clamp(36px, 8vw, 44px)",
          height: "clamp(36px, 8vw, 44px)",
          borderRadius: "50%",
          background: "#85325c",
          color: "#f0eada",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
          fontWeight: 700,
          flexShrink: 0,
          fontFamily: "var(--font-playfair)",
        }}
      >
        {num}
      </div>
      <div>
        <div
          style={{
            fontSize: "clamp(0.9rem, 2vw, 1rem)",
            fontWeight: 600,
            color: "#3d1a2e",
            marginBottom: 4,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "clamp(0.8rem, 1.5vw, 0.875rem)",
            color: "#8a6a7a",
            lineHeight: 1.6,
          }}
        >
          {desc}
        </div>
      </div>
    </div>
  );
};

/* ─── main page ──────────────────────────────────────────────────────────── */
export default function LandingPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [statsRef, statsInView] = useInView();

  const languages = ["हिंदी", "বাংলা", "தமிழ்", "తెలుగు", "मराठी", "ਪੰਜਾਬੀ"];

  const features: FeatureCardProps[] = [
    {
      delay: 0,
      icon: "🔊",
      title: "Voice symptom input",
      desc: "Speak your symptoms in Hindi or any regional language — no typing needed. Designed for low-literacy users.",
    },
    {
      delay: 0.1,
      icon: "🩺",
      title: "AI diagnosis",
      desc: "Get an instant assessment — mild, moderate, or urgent — with plain-language explanations you can actually understand.",
    },
    {
      delay: 0.2,
      icon: "💊",
      title: "Generic medicine guide",
      desc: "Brand vs generic suggestions with 1–2 Jan Aushadhi alternatives and prices for India — right inside your diagnosis.",
    },
    {
      delay: 0.3,
      icon: "🚑",
      title: "First Aid Guide",
      desc: "Tap any of 20 emergencies like heart attack or snake bite and get step-by-step first aid in Hindi in seconds.",
    },
    {
      delay: 0.4,
      icon: "⚠️",
      title: "Allergy-aware profile",
      desc: "Save medicine and food allergies once. Every diagnosis prompt reminds AI to flag conflicts and suggest safer options.",
    },
    {
      delay: 0.5,
      icon: "📍",
      title: "Hospitals & outbreaks",
      desc: "Filter nearby hospitals by specialty via OpenStreetMap and stay updated on India-specific WHO disease outbreak alerts.",
    },
  ];

  const stats = [
    { number: "108M+", label: "Indians far from a hospital" },
    { number: "5+", label: "Indian languages supported" },
    { number: "80+", label: "Common conditions covered" },
    { number: "Free", label: "Always free for rural users" },
  ];

  const impactCards = [
    {
      n: "1 in 3",
      l: "rural Indians can't read",
      sub: "Voice-first solves this",
    },
    { n: "40km", l: "avg. distance to hospital", sub: "in rural Bihar & UP" },
    { n: "₹0", l: "cost to use ArogyaMitra AI", sub: "Free, always" },
    { n: "30 sec", l: "to get a diagnosis", sub: "vs 3hr clinic wait" },
  ];

  return (
    <div
      style={{
        fontFamily: "var(--font-montserrat)",
        background: "#f0eada",
        minHeight: "100vh",
        overflowX: "clip",
      }}
    >
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: #85325c; color: #f0eada; }
        .nav-link { color: #3d1a2e; text-decoration: none; font-size: 0.9rem; font-weight: 500; opacity: 0.75; transition: opacity 0.2s; }
        .nav-link:hover { opacity: 1; }
        .lang-tag { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 500; }
        .dot-pattern { background-image: radial-gradient(#85325c18 1.5px, transparent 1.5px); background-size: 24px 24px; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .float { animation: float 4s ease-in-out infinite; }
        .hero-text   { animation: fadeUp 0.8s ease both; }
        .hero-text-2 { animation: fadeUp 0.8s ease 0.15s both; }
        .hero-text-3 { animation: fadeUp 0.8s ease 0.30s both; }
        .hero-text-4 { animation: fadeUp 0.8s ease 0.45s both; }
        .btn-cta { background: #85325c; color: #f0eada; border: none; border-radius: 50px; padding: 0.95rem 2.2rem; font-size: 1rem; font-weight: 500; cursor: pointer; font-family: var(--font-montserrat); transition: all 0.2s; }
        .btn-cta:hover { background: #6e2249; transform: translateY(-2px); }
        .btn-outline { background: transparent; color: #85325c; border: 1.5px solid #85325c; border-radius: 50px; padding: 0.95rem 2rem; font-size: 1rem; font-weight: 500; cursor: pointer; font-family: var(--font-montserrat); transition: all 0.2s; }
        .btn-outline:hover { background: #85325c; color: #f0eada; }
        .feat-card-hover { transition: transform 0.25s; }
        .feat-card-hover:hover { transform: translateY(-4px); }
        @media (max-width: 1024px) {
          .how-flex { flex-direction: column !important; gap: 2.5rem !important; }
          .impact-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .hide-desktop { display: flex !important; align-items: center; justify-content: center; }
          .hero-grid   { flex-direction: column !important; padding: 2rem 5vw 1.5rem !important; gap: 1.5rem !important; }
          .hero-illustration { min-height: 280px !important; gap: 0.5rem !important; }
          .feats-grid  { grid-template-columns: 1fr !important; gap: 1rem !important; }
          .stats-grid  { grid-template-columns: 1fr 1fr !important; gap: 1.5rem 1rem !important; }
          .hero-section-mobile { padding: 2rem 5vw !important; }
          .nav-inner { padding-left: 5vw !important; padding-right: 5vw !important; }
          section { padding-left: 5vw !important; padding-right: 5vw !important; }
          .nav-min-height { min-height: 56px !important; }
          .btn-cta { padding: 0.8rem 1.8rem !important; font-size: 0.9rem !important; }
          .hero-title { font-size: clamp(1.8rem, 6vw, 2.8rem) !important; }
          .feature-padding { padding: 1.5rem !important; }
          .how-steps { gap: 1.25rem !important; }
        }
        @media (max-width: 640px) {
          .hero-grid { padding: 1.5rem 4vw 1rem !important; gap: 1.25rem !important; }
          .hero-section-mobile { padding: 1.5rem 4vw !important; }
          .heroes-badge { font-size: 0.75rem !important; padding: 4px 10px !important; }
          .hero-paragraph { font-size: 0.95rem !important; }
          .hero-illustration { min-height: 240px !important; }
          .stats-grid { grid-template-columns: 1fr !important; gap: 1.25rem !important; }
          .impact-grid { grid-template-columns: 1fr !important; }
          .impact-card { padding: 1.5rem 1rem !important; }
          .how-section { padding: 3rem 4vw !important; }
          .btn-cta { padding: 0.7rem 1.5rem !important; font-size: 0.85rem !important; }
          .lang-tags { gap: 6px !important; }
          .lang-tag { padding: 3px 10px !important; font-size: 0.75rem !important; }
          section { padding-left: 4vw !important; padding-right: 4vw !important; }
          .nav-inner { padding-left: 4vw !important; padding-right: 4vw !important; }
        }
        @media (max-width: 480px) {
          .hero-grid { padding: 1rem 3vw !important; gap: 1rem !important; }
          .hero-section-mobile { padding: 1rem 3vw !important; }
          .nav-inner { padding-left: 3vw !important; padding-right: 3vw !important; }
          section { padding-left: 3vw !important; padding-right: 3vw !important; }
          .hero-title { font-size: clamp(1.4rem, 5.5vw, 2rem) !important; line-height: 1.15 !important; }
          .hero-paragraph { font-size: 0.9rem !important; margin-bottom: 1.25rem !important; }
          .hero-illustration { min-height: 200px !important; }
          .stats-section { padding: 2rem 3vw !important; }
          .feat-card { padding: 1.25rem !important; }
          .feature-icon { font-size: 1.6rem !important; }
          .btn-flex { gap: 0.5rem !important; }
          .btn-cta { padding: 0.65rem 1.2rem !important; font-size: 0.8rem !important; width: 100% !important; }
          .how-section { padding: 2.5rem 3vw !important; }
          .cta-section { padding: 3rem 3vw !important; }
          .footer { padding: 1.5rem 3vw !important; }
        }
        @media (max-width: 360px) {
          .hero-grid { padding: 0.75rem 2vw !important; }
          .hero-title { font-size: clamp(1.2rem, 5vw, 1.6rem) !important; }
          .lang-tags { gap: 4px !important; }
        }
        @media (min-width: 769px) {
          .hide-desktop { display: none !important; }
          .mobile-menu-dropdown { display: none !important; }
        }
      `}</style>

      {/* ── Navbar ── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(240,234,218,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #e0cfc0",
          padding: "0 5vw",
        }}
        className="nav-inner"
      >
        <div
          style={{
            maxWidth: 1160,
            margin: "0 auto",
            minHeight: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
          className="nav-min-height"
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                overflow: "hidden",
                flexShrink: 0,
                background: "#85325c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="/logo.png"
                alt="ArogyaMitra AI"
                width={34}
                height={34}
                className="object-contain"
              />
            </div>
            <span
              style={{
                fontFamily: "var(--font-playfair)",
                fontWeight: 700,
                fontSize: "clamp(0.95rem, 4vw, 1.15rem)",
                color: "#3d1a2e",
              }}
            >
              ArogyaMitra AI
            </span>
          </div>
          <div
            className="hide-mobile"
            style={{ display: "flex", gap: "2rem", alignItems: "center" }}
          >
            <a href="#features" className="nav-link">
              Features
            </a>
            <a href="#how" className="nav-link">
              How it works
            </a>
            <a href="#impact" className="nav-link">
              Impact
            </a>
            <Link href="/developers" className="nav-link">
              Developers
            </Link>
            <button
              className="btn-cta"
              style={{ 
                padding: "0.6rem 1.4rem", 
                fontSize: "0.85rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
              onClick={() => {
                try {
                  router.push("/app");
                } catch {
                  // ignore navigation errors
                }
              }}
            >
              <span style={{ fontWeight: 600 }}>जांच करें</span>
              <span style={{ opacity: 0.5, fontWeight: 400 }}>|</span>
              <span style={{ opacity: 0.9 }}>Examine</span>
            </button>
          </div>
          <button
            className="hide-desktop"
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.4rem",
              color: "#85325c",
              padding: 12,
              width: 44,
              height: 44,
              minWidth: 44,
              minHeight: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "-12px",
            }}
            aria-label="menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div
            className="mobile-menu-dropdown"
            style={{
              width: "100%",
              maxWidth: 1160,
              margin: "0 auto",
              padding: "0 5vw 1rem",
              borderTop: "1px solid #e0cfc0",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                paddingTop: "0.75rem",
              }}
            >
              <a
                href="#features"
                className="nav-link"
                style={{ padding: "0.75rem 0", display: "block" }}
                onClick={() => setMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#how"
                className="nav-link"
                style={{ padding: "0.75rem 0", display: "block" }}
                onClick={() => setMenuOpen(false)}
              >
                How it works
              </a>
              <a
                href="#impact"
                className="nav-link"
                style={{ padding: "0.75rem 0", display: "block" }}
                onClick={() => setMenuOpen(false)}
              >
                Impact
              </a>
              <Link
                href="/developers"
                className="nav-link"
                style={{ padding: "0.75rem 0", display: "block" }}
                onClick={() => setMenuOpen(false)}
              >
                Developers
              </Link>
              <button
                className="btn-cta"
                style={{
                  marginTop: "0.75rem",
                  padding: "0.75rem 1.25rem",
                  fontSize: "0.9rem",
                  alignSelf: "flex-start",
                  width: "auto",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/app");
                }}
              >
                <span style={{ fontWeight: 600 }}>जांच करें</span>
                <span style={{ opacity: 0.5, fontWeight: 400 }}>|</span>
                <span style={{ opacity: 0.9 }}>Examine</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "5rem 5vw 3rem",
          display: "flex",
          alignItems: "center",
          gap: "3rem",
          flexWrap: "wrap",
        }}
        className="hero-grid hero-section-mobile"
      >
        <div style={{ flex: "1 1 280px", minWidth: 0 }}>
          <div
            className="hero-text heroes-badge"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "white",
              border: "1.5px solid #e8d5c4",
              borderRadius: 50,
              padding: "6px 16px",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#85325c",
              }}
            />
            <span
              style={{
                fontSize: "clamp(0.72rem, 2vw, 0.82rem)",
                color: "#85325c",
                fontWeight: 500,
              }}
            >
             Examine India  · Built for Accessibility
            </span>
          </div>
          <h1
            className="hero-text-2 hero-title"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2rem, 6vw, 4rem)",
              fontWeight: 700,
              color: "#3d1a2e",
              lineHeight: 1.12,
              marginBottom: "1.5rem",
            }}
          >
            Your health,
            <br />
            <span style={{ color: "#85325c", fontStyle: "italic" }}>
              in your language.
            </span>
          </h1>
          <p
            className="hero-text-3 hero-paragraph"
            style={{
              fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
              color: "#6a4a5a",
              lineHeight: 1.75,
              marginBottom: "2rem",
              maxWidth: 480,
            }}
          >
            AI-powered symptom checker, report analysis, and medicine guidance —
            available in Hindi, Bengali, Tamil, Telugu and more. Works offline.
            Free forever.
          </p>
          <div
            className="hero-text-4 btn-flex"
            style={{
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
              marginBottom: "2.5rem",
            }}
          >
            <button 
              className="btn-cta" 
              onClick={() => router.push("/app")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px"
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>🩺</span>
              <span style={{ fontWeight: 600 }}>जांच करें</span>
              <span style={{ opacity: 0.5, fontSize: "0.9em", fontWeight: 400 }}>|</span>
              <span style={{ opacity: 0.9, fontSize: "0.95em", fontWeight: 500 }}>Examine</span>
            </button>
          </div>
          <div
            className="hero-text-4 lang-tags"
            style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
          >
            {languages.map((l, i) => (
              <span
                key={i}
                className="lang-tag"
                style={{
                  background: i === 0 ? "#85325c" : "white",
                  color: i === 0 ? "#f0eada" : "#85325c",
                  border: "1px solid #e0c8d0",
                }}
              >
                {l}
              </span>
            ))}
          </div>
        </div>
        <div
          className="hero-illustration"
          style={{
            flex: "1 1 300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: "1rem",
            position: "relative",
            minHeight: 360,
          }}
        >
          <div className="float" style={{ animationDelay: "0s" }}>
            <DoctorIllustration />
          </div>
          <div
            className="float"
            style={{ animationDelay: "1.5s", marginBottom: "-1rem" }}
          >
            <VillagerIllustration />
          </div>
          <div
            style={{
              position: "absolute",
              top: 30,
              right: 20,
              background: "white",
              borderRadius: 14,
              padding: "10px 14px",
              border: "1.5px solid #e8d5c4",
              boxShadow: "0 4px 20px #85325c18",
              fontSize: "clamp(0.65rem, 2vw, 0.75rem)",
            }}
          >
            <div style={{ color: "#85325c", fontWeight: 600 }}>
              ✓ Diagnosis ready
            </div>
            <div style={{ color: "#8a6a7a", marginTop: 2 }}>
              बुखार · Viral fever
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 60,
              left: 0,
              background: "#85325c",
              borderRadius: 14,
              padding: "10px 14px",
              fontSize: "clamp(0.65rem, 2vw, 0.75rem)",
            }}
          >
            <div style={{ color: "#f0eada", fontWeight: 600 }}>
              📍 Hospital nearby
            </div>
            <div
              style={{
                color: "#f0eada",
                opacity: 0.8,
                marginTop: 2,
              }}
            >
              PHC — 2.3 km away
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section
        className="stats-section"
        ref={statsRef}
        style={{ background: "#85325c", padding: "3rem 5vw", margin: "1rem 0" }}
      >
        <div
          className="stats-grid"
          style={{
            maxWidth: 1160,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
            gap: "2rem 1rem",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                opacity: statsInView ? 1 : 0,
                transform: statsInView ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.5s ease ${i * 0.1}s`,
              }}
            >
              <div
                style={{
                  fontSize: "clamp(1.5rem, 5vw, 2.8rem)",
                  fontWeight: 700,
                  color: "#f0eada",
                  fontFamily: "var(--font-playfair)",
                  lineHeight: 1,
                }}
              >
                {s.number}
              </div>
              <div
                style={{
                  fontSize: "clamp(0.75rem, 1.5vw, 0.85rem)",
                  color: "#e8d5c4",
                  marginTop: 6,
                  opacity: 0.85,
                  lineHeight: 1.4,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section
        id="features"
        style={{ maxWidth: 1160, margin: "0 auto", padding: "5rem 5vw" }}
      >
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div
            style={{
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "#85325c",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "0.75rem",
            }}
          >
            What we offer
          </div>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.6rem, 5vw, 2.8rem)",
              fontWeight: 700,
              color: "#3d1a2e",
              lineHeight: 1.2,
            }}
          >
            Healthcare that speaks
            <br />
            <span style={{ color: "#85325c", fontStyle: "italic" }}>
              your language
            </span>
          </h2>
        </div>
        <div
          className="feats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: "1.25rem",
          }}
        >
          {features.map((f, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                if (f.title.startsWith("First Aid")) {
                  router.push("/app/first-aid");
                } else if (f.title.startsWith("Allergy")) {
                  router.push("/app/profile");
                } else if (f.title.startsWith("Hospitals")) {
                  router.push("/app/hospitals");
                } else if (f.title.includes("Report")) {
                  router.push("/app/report");
                } else {
                  router.push("/app");
                }
              }}
              style={{ textAlign: "left" }}
              className="feat-card-hover"
            >
              <FeatureCard {...f} />
            </button>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section
        id="how"
        style={{ background: "white", padding: "5rem 5vw" }}
        className="how-section"
      >
        <div
          className="how-flex"
          style={{
            maxWidth: 1160,
            margin: "0 auto",
            display: "flex",
            gap: "4rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 340px" }}>
            <div
              style={{
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "#85325c",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "0.75rem",
              }}
            >
              Simple as 1-2-3
            </div>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.6rem, 5vw, 2.6rem)",
                fontWeight: 700,
                color: "#3d1a2e",
                lineHeight: 1.2,
                marginBottom: "2.5rem",
              }}
            >
              From symptoms
              <br />
              to{" "}
              <span style={{ color: "#85325c", fontStyle: "italic" }}>
                answers
              </span>{" "}
              in 30s
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.75rem",
              }}
              className="how-steps"
            >
              <HowStep
                delay={0}
                num="1"
                title="Choose your language"
                desc="Pick Hindi, Bengali, Tamil, Telugu or any supported language. Tap the mic and describe how you feel."
              />
              <HowStep
                delay={0.15}
                num="2"
                title="Select your symptoms"
                desc="Tap from common symptoms or speak freely. Add your age group for a more accurate result."
              />
              <HowStep
                delay={0.3}
                num="3"
                title="Get your diagnosis"
                desc="Receive a clear diagnosis, first-aid steps, safe OTC medicines, and your nearest hospital — all in your language."
              />
            </div>
          </div>
          <div
            style={{
              flex: "1 1 260px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              className="dot-pattern"
              style={{ borderRadius: 32, padding: "clamp(1.5rem, 4vw, 2rem)" }}
            >
              <div className="float" style={{ animationDelay: "0.5s" }}>
                <PhoneIllustration />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Impact ── */}
      <section
        id="impact"
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "5rem 5vw",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "0.82rem",
            fontWeight: 600,
            color: "#85325c",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "0.75rem",
          }}
        >
          Why this matters
        </div>
        <h2
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1.6rem, 5vw, 2.8rem)",
            fontWeight: 700,
            color: "#3d1a2e",
            lineHeight: 1.2,
            marginBottom: "1rem",
          }}
        >
          The problem is{" "}
          <span style={{ color: "#85325c", fontStyle: "italic" }}>
            enormous
          </span>
        </h2>
        <p
          style={{
            fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
            color: "#7a5a6a",
            maxWidth: 580,
            margin: "0 auto 3.5rem",
            lineHeight: 1.75,
          }}
        >
          A farmer in Bihar with chest pain may have to travel 40km to reach a
          hospital. We&apos;re the triage layer that helps them decide — rest at
          home or go now.
        </p>
        <div
          className="impact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            gap: "1.5rem",
          }}
        >
          {impactCards.map((s, i) => {
            const [ref, inView] = useInView();
            return (
              <div
                key={i}
                ref={ref}
                className="impact-card"
                style={{
                  background: "white",
                  borderRadius: 20,
                  padding:
                    "clamp(1.5rem, 4vw, 1.75rem) clamp(1rem, 3vw, 1.25rem)",
                  border: "1.5px solid #e8d5c4",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "scale(1)" : "scale(0.95)",
                  transition: `all 0.5s ease ${i * 0.1}s`,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(1.8rem, 5vw, 2.4rem)",
                    fontWeight: 700,
                    color: "#85325c",
                    lineHeight: 1,
                  }}
                >
                  {s.n}
                </div>
                <div
                  style={{
                    fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
                    color: "#3d1a2e",
                    fontWeight: 500,
                    margin: "6px 0 4px",
                  }}
                >
                  {s.l}
                </div>
                <div
                  style={{
                    fontSize: "clamp(0.7rem, 1.5vw, 0.78rem)",
                    color: "#9a7a8a",
                  }}
                >
                  {s.sub}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="cta-section"
        style={{
          background: "#3d1a2e",
          padding: "5rem 5vw",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -60,
            left: -60,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "#85325c",
            opacity: 0.3,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            right: -40,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "#85325c",
            opacity: 0.2,
          }}
        />
        <div style={{ position: "relative", maxWidth: 620, margin: "0 auto" }}>
          <div
            style={{
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "#e8d5c4",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "1rem",
              opacity: 0.8,
            }}
          >
            Join the mission
          </div>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.6rem, 6vw, 3.2rem)",
              fontWeight: 700,
              color: "#f0eada",
              lineHeight: 1.15,
              marginBottom: "1.25rem",
            }}
          >
            Healthcare for every
            <br />
            <span style={{ color: "#e8a87c", fontStyle: "italic" }}>
              corner of India
            </span>
          </h2>
          <p
            style={{
              fontSize: "clamp(0.9rem, 2vw, 1rem)",
              color: "#e8d5c4",
              marginBottom: "2.5rem",
              lineHeight: 1.7,
              opacity: 0.9,
            }}
          >
            Free.In your language.No sign-up needed.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                background: "#f0eada",
                color: "#85325c",
                border: "none",
                borderRadius: 50,
                padding: "clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.4rem)",
                fontSize: "clamp(0.85rem, 2vw, 1rem)",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "var(--font-montserrat)",
                transition: "all 0.2s",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px"
              }}
              onClick={() => router.push("/app")}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#fff";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#f0eada";
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>🩺</span>
              <span>जांच करें</span>
              <span style={{ opacity: 0.4, fontWeight: 400 }}>|</span>
              <span style={{ opacity: 0.9 }}>Examine</span>
            </button>
            <button
              style={{
                background: "transparent",
                color: "#f0eada",
                border: "1.5px solid rgba(240,234,218,0.4)",
                borderRadius: 50,
                padding: "clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)",
                fontSize: "clamp(0.85rem, 2vw, 1rem)",
                cursor: "pointer",
                fontFamily: "var(--font-montserrat)",
                transition: "all 0.2s",
              }}
              onClick={() => {
                window.open(
                  "https://github.com/Suryansh-singh-137/ArogyaMitra_AI",
                  "_blank",
                );
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "#f0eada";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(240,234,218,0.4)";
              }}
            >
              View on GitHub →
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="footer"
        style={{
          background: "#2d1020",
          padding: "2rem 5vw",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginBottom: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              overflow: "hidden",
              flexShrink: 0,
              background: "#85325c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/logo.png"
              alt="ArogyaMitra AI"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
          <span
            style={{
              fontFamily: "var(--font-playfair)",
              color: "#f0eada",
              fontWeight: 600,
              fontSize: "clamp(0.9rem, 2vw, 1rem)",
            }}
          >
            ArogyaMitra AI
          </span>
        </div>
        <p
          style={{
            fontSize: "clamp(0.7rem, 1.5vw, 0.82rem)",
            color: "#8a6a7a",
            lineHeight: 1.6,
          }}
        >
          Built with ❤️ for rural India · Hackathon project · Not a substitute
          for professional medical advice
        </p>
      </footer>
    </div>
  );
}
