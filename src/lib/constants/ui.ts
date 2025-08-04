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
