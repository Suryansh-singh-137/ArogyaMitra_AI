"use client";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ModalContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const ModalContext = React.createContext<ModalContextValue | null>(null);

export function Modal({
  children,
  defaultOpen = false,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

export function ModalTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(ModalContext);
  if (!ctx) return null;
  return (
    <button
      type="button"
      onClick={() => ctx.setOpen(true)}
      className={cn(
        "relative px-4 py-2 rounded-xl font-medium overflow-hidden",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function ModalBody({ children }: { children: React.ReactNode }) {
  const ctx = React.useContext(ModalContext);
  if (!ctx) return null;

  return (
    <AnimatePresence>
      {ctx.open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => ctx.setOpen(false)}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
            className="relative z-10 w-full max-w-md mx-4"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ModalContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white p-4 sm:p-6 border border-neutral-200 shadow-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ModalFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mt-4 pt-3 border-t border-neutral-200 flex justify-end gap-2",
        className,
      )}
    >
      {children}
    </div>
  );
}

