import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function limitWords(str: string, maxWords: number): string {
  const words = str.trim().split(/\s+/);
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ");
  }
  return str;
}

export function limitCharacters(str: string, maxChars: number): string {
  if (str.length > maxChars) {
    return str.slice(0, maxChars);
  }
  return str;
}
