export type Solution = 
  | "All Business Solutions"
  | "AI Business Solutions"
  | "Cloud and AI Platforms"
  | "Security"
  | "All CSAs";

export interface Event {
  id: string;
  title: string;
  solution: Solution;
  startDate: string;
  endDate?: string;
  time?: string;
  location: string;
  registrationUrl?: string;
  vivaEngageUrl?: string;
}

export const SOLUTIONS: Solution[] = [
  "All Business Solutions",
  "AI Business Solutions",
  "Cloud and AI Platforms",
  "Security",
  "All CSAs"
];

export const LOCATION_OPTIONS = [
  "마이크로소프트 13층",
  "Digital(한국어)",
  "Digital(영어, KUDO 통역)",
  "Digital(영어, 한국어 자막)",
  "직접입력"
] as const;

export const getSolutionColor = (solution: Solution): string => {
  const colors: Record<Solution, string> = {
    "All Business Solutions": "oklch(0.60 0.16 45)",
    "AI Business Solutions": "oklch(0.62 0.15 35)",
    "Cloud and AI Platforms": "oklch(0.65 0.12 160)",
    "Security": "oklch(0.55 0.15 240)",
    "All CSAs": "oklch(0.60 0.18 290)"
  };
  return colors[solution];
};
