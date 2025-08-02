// 'Infusion ingredients' field read only for now
// Infusion will be added as part of a future customization feature
export interface Tea {
  id: string;
  name: string;
  type: TeaType;
  description?: string;
  tastingNotes?: string;
  brewTime?: number;
  infusionIngredients?: string;
  favorite?: boolean;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TeaType = "black" | "green" | "white" | "oolong" | "puerh";

export interface Profile {
  id: string;
  name: string;
  photo: string;
  level: ProfileLevel;
  createdAt?: Date;
}

export type ProfileLevel = "beginner" | "connoisseur" | "master";

export interface WeatherData {
  temperature: number;
  weathercode: number;
  city?: string;
  timestamp?: Date;
}

export type ModalVariant = "default" | "form" | "confirm" | "fullscreen";
export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
export type CardSize = "small" | "medium" | "large" | "compact";

export interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "select"
    | "number"
    | "checkbox"
    | "checkbox-group";
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  validate?: (value: any) => string | undefined;
  conditional?: {
    field: string;
    value: any;
  };
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

// Filter Types static for now
export type TeaFilterType = "all" | "favorite" | TeaType;

// Store Types only for Tea management
// Store will be part of a future state management solution
export interface TeaStore {
  teas: Tea[];
  addTea: (tea: Omit<Tea, "id">) => void;
  updateTea: (id: string, updates: Partial<Tea>) => void;
  deleteTea: (id: string) => void;
  toggleFavorite: (id: string) => void;
  getTea: (id: string) => Tea | undefined;
  getTeasByType: (type: TeaType) => Tea[];
  getFavoriteTeas: () => Tea[];
}

export interface AppStore {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;

  modals: Record<string, boolean>;
  openModal: (id: string) => void;
  closeModal: (id: string) => void;

  profile: Profile | null;
  setProfile: (profile: Profile) => void;

  weather: WeatherData | null;
  setWeather: (weather: WeatherData) => void;
}
