import { TeaType, ProfileLevel, FormField } from "../types";

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
    validate: (value: unknown) => {
      if (!value || typeof value !== "string" || !value.trim()) {
        return "Name is required";
      }
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
    validate: (value: unknown) => {
      if (value !== undefined && value !== null && value !== "") {
        const numValue = Number(value);
        if (isNaN(numValue) || numValue < 0 || numValue > 30) {
          return "Brewing time should be between 0-30 minutes";
        }
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
    validate: (value: unknown) => {
      if (value && typeof value === "string") {
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
    placeholder: "Floral, citrus, earthy...",
  },
];
