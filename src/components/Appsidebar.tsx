"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  FileText,
  MapPin,
  History,
  Menu,
  X,
  Wifi,
  WifiOff,
  ChevronRight,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    href: "/app",
    icon: Stethoscope,
    label: "Symptom Check",
    labelHi: "लक्षण जाँच",
    desc: "AI diagnosis",
  },
  {
    href: "/app/report",
    icon: FileText,
    label: "Report Analyser",
    labelHi: "रिपोर्ट विश्लेषण",
    desc: "Photo your report",
  },
  {
    href: "/app/hospitals",
    icon: MapPin,
    label: "Nearby Hospitals",
    labelHi: "नज़दीकी अस्पताल",
    desc: "Find care near you",
  },
  {
    href: "/app/history",
    icon: History,
    label: "My History",
    labelHi: "मेरा इतिहास",
    desc: "Past diagnoses",
  },
];

interface AppSidebarProps {
  isOnline: boolean;
}

export default function AppSidebar({ isOnline }: AppSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <Image src="/logo.png" alt="ArogyaMitra AI" width={36} height={36} className="object-contain" />
          </div>
          <div>
            <h1
              className="font-bold text-white text-lg leading-none"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              ArogyaMitra AI
            </h1>
            <p className="text-[11px] mt-0.5" style={{ color: "#e8d5c4" }}>
              स्वास्थ्य सहायक
            </p>
          </div>
        </div>
        {/* Online status */}
        <div className="mt-3 flex items-center gap-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: isOnline ? "#97C459" : "#F09595" }}
          />
          <span
            className="text-[11px]"
            style={{ color: "#e8d5c4", opacity: 0.75 }}
          >
            {isOnline ? "Online — AI ready" : "Offline mode"}
          </span>
          {isOnline ? (
            <Wifi size={10} style={{ color: "#97C459" }} />
          ) : (
            <WifiOff size={10} style={{ color: "#F09595" }} />
          )}
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <p
          className="text-[10px] font-semibold uppercase tracking-widest px-3 py-2"
          style={{ color: "#e8d5c4", opacity: 0.5 }}
        >
          Features
        </p>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                isActive
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white",
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-xl bg-white/15"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 relative z-10 transition-colors",
                  isActive
                    ? "bg-white/20"
                    : "bg-white/10 group-hover:bg-white/15",
                )}
              >
                <Icon
                  size={16}
                  className={isActive ? "text-white" : "text-white/80"}
                />
              </div>
              <div className="flex-1 min-w-0 relative z-10">
                <p className="text-sm font-medium leading-none">{item.label}</p>
                <p className="text-[11px] mt-0.5 opacity-60">{item.labelHi}</p>
              </div>
              {isActive && (
                <ChevronRight size={14} className="relative z-10 opacity-60" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Emergency strip */}
      <div className="p-3">
        <a
          href="tel:108"
          className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all hover:opacity-90"
          style={{ background: "#A32D2D22", border: "1px solid #F0959540" }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "#A32D2D" }}
          >
            <Phone size={14} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Emergency — 108</p>
            <p className="text-[11px]" style={{ color: "#F09595" }}>
              Free ambulance service
            </p>
          </div>
        </a>

        {/* Disclaimer */}
        <p
          className="text-[10px] text-center mt-3 leading-relaxed px-1"
          style={{ color: "#e8d5c4", opacity: 0.45 }}
        >
          AI assistant only. Not a substitute for medical advice.
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex flex-col w-64 flex-shrink-0 h-screen sticky top-0"
        style={{ background: "#85325c" }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div
        className="md:hidden flex items-center justify-between px-4 py-3 sticky top-0 z-50"
        style={{ background: "#85325c" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
            <Image src="/logo.png" alt="ArogyaMitra AI" width={28} height={28} className="object-contain" />
          </div>
          <span
            className="font-bold text-white text-base"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            ArogyaMitra AI
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center"
        >
          {mobileOpen ? (
            <X size={16} className="text-white" />
          ) : (
            <Menu size={16} className="text-white" />
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-72 md:hidden"
              style={{ background: "#85325c" }}
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
