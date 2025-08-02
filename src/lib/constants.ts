import { TeaType, ProfileLevel, FormField } from "./types";

// Fixed tea types and profile levels for now
export const TEA_TYPES = [
  { value: "black" as TeaType, label: "Black" },
  { value: "green" as TeaType, label: "Green" },
  { value: "white" as TeaType, label: "White" },
  { value: "oolong" as TeaType, label: "Oolong" },
  { value: "puerh" as TeaType, label: "Pu-erh" },
] as const;

export const PROFILE_LEVELS = [
  { value: "beginner" as ProfileLevel, label: "Beginner" },
  { value: "connoisseur" as ProfileLevel, label: "Connoisseur" },
  { value: "master" as ProfileLevel, label: "Master" },
] as const;

// Tea images mapped by type
// Might integrate with something like Unsplash in the future
export const TEA_TYPE_IMAGES = {
  black: "/images/teas/black_tea.png",
  white: "/images/teas/white_tea.png",
  green: "/images/teas/green_tea.png",
  oolong: "/images/teas/oolong_tea.jpg",
  puerh: "/images/teas/puerh_tea.jpg",
} as const;

export const TEA_FORM_FIELDS: FormField[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    placeholder: "Enter tea name...",
    validate: (value: string) => {
      if (!value?.trim()) return "Name is required";
      const words = value.trim().split(/\s+/);
      if (words.length > 5) return "Name should be 5 words or less";
      return undefined;
    },
  },
  {
    name: "type",
    label: "Type",
    type: "select",
    required: true,
    options: [
      { value: "", label: "Select tea type..." },
      ...TEA_TYPES.map((type) => ({ value: type.value, label: type.label })),
    ],
  },
  {
    name: "brewTime",
    label: "Brewing Time (minutes)",
    type: "number",
    placeholder: "3-5 minutes typical",
    validate: (value: number) => {
      if (value && (value < 0 || value > 30)) {
        return "Brewing time should be between 0-30 minutes";
      }
      return undefined;
    },
  },
  {
    name: "infusionIngredients",
    label: "Infusion Ingredients",
    type: "text",
    placeholder: "e.g. chamomile, mint, etc.",
    conditional: {
      field: "type",
      value: "infusion",
    },
  },
  {
    name: "description",
    label: "Description or Notes",
    type: "textarea",
    placeholder: "Describe this tea...",
    validate: (value: string) => {
      if (value) {
        const words = value.trim().split(/\s+/);
        if (words.length > 30) return "Description should be 30 words or less";
      }
      return undefined;
    },
  },
  {
    name: "tastingNotes",
    label: "Tasting Notes",
    type: "text",
    placeholder: "Floral, citrus, earthy... (separated by commas)",
  },
];

export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
} as const;

export const STORAGE_KEYS = {
  teas: "alba_teas",
  profile: "alba_profile",
  preferences: "alba_preferences",
  weather: "alba_weather",
} as const;

export const ANIMATIONS = {
  modal: {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
    transition: { duration: 0.2 },
  },
  slideInRight: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
    transition: { type: "tween", duration: 0.3 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
} as const;

export const WEATHER_CODES = {
  0: "clear",
  1: "mainly-clear",
  2: "partly-cloudy",
  3: "overcast",
  45: "fog",
  48: "depositing-rime-fog",
  51: "light-drizzle",
  53: "moderate-drizzle",
  55: "dense-drizzle",
  61: "slight-rain",
  63: "moderate-rain",
  65: "heavy-rain",
  80: "slight-rain-showers",
  81: "moderate-rain-showers",
  82: "violent-rain-showers",
  95: "thunderstorm",
} as const;

export const VALIDATION = {
  MAX_NAME_WORDS: 5,
  MAX_DESCRIPTION_WORDS: 30,
  MAX_BREW_TIME: 30,
  MIN_BREW_TIME: 0,
} as const;
