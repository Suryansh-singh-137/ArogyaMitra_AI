export type Language = "hi" | "bn" | "ta" | "te" | "mr" | "en";
export type AgeGroup = "child" | "adult" | "senior";
export type Severity = "mild" | "moderate" | "urgent";

export interface Symptom {
  id: string;
  emoji: string;
  labels: Record<Language, string>;
}

export interface Diagnosis {
  condition: string;
  possibleConditions: string[];
  severity: Severity;
  description: string;
  firstAid: string[];
  homeCareAdvice: string[];
  medicines: Medicine[];
  recommendedDoctor: string;
  hospitalRecommendation: string;
  dietRecommendation: string[];
  lifestyleAndExercise: string[];
  whenToSeek: string;
  // Optional flags from AI about allergy conflicts
  allergyConflicts?: string[];
}

export interface Medicine {
  name: string;
  dosage: string;
  note: string;
  price: string;
  // Whether this is a generic (Jan Aushadhi) option
  isGeneric?: boolean;
  // 1–2 generic alternatives for this medicine with approximate prices in India
  genericAlternatives?: {
    name: string;
    price: string;
  }[];
}

// Used in hospitals page (real GPS — distance as number)
export interface Hospital {
  id: number;
  name: string;
  type: string;
  distance: number; // kilometres e.g. 2.3
  lat: number;
  lon: number;
  phone?: string;
  address?: string;
  openingHours?: string;
}

export interface DiagnosisRequest {
  symptoms: string[];
  age: AgeGroup;
  language: Language;
  additionalInfo?: string;
  // Optional patient allergies injected into the AI prompt
  allergies?: string[];
}

export interface HistoryEntry {
  id: string;
  diagnosis: Diagnosis;
  symptoms: string[];
  language: Language;
  timestamp: number;
}
