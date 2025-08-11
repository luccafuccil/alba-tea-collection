"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useLocalStorage } from "./use-local-storage";
import { WeatherData } from "@/lib/types";
import { STORAGE_KEYS } from "@/lib/constants/ui";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface UseWeatherReturn {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  refreshWeather: () => void;
}

// Defaults to Rio de Janeiro coordinates if geolocation fails
const DEFAULT_COORDS: Coordinates = {
  latitude: -22.9068,
  longitude: -43.1729,
};

export const useWeather = (): UseWeatherReturn => {
  const [weather, setWeather] = useLocalStorage<WeatherData | null>(
    STORAGE_KEYS.weather,
    null
  );
  const [coords, setCoords] = useLocalStorage<Coordinates>(
    STORAGE_KEYS.coords,
    DEFAULT_COORDS
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const coordsRef = useRef(coords);

  useEffect(() => {
    coordsRef.current = coords;
  }, [coords]);

  const refreshWeather = useCallback(async () => {
    setLoading(true);
    setError(null);

    const getUserLocation = () => {
      return new Promise<Coordinates>((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocation is not supported"));
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const newCoords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setCoords(newCoords);
            resolve(newCoords);
          },
          (error) => {
            console.warn("Could not get user location:", error.message);
            resolve(coordsRef.current);
          },
          {
            timeout: 10000,
            enableHighAccuracy: false,
          }
        );
      });
    };

    const fetchWeatherData = async (
      coordinates: Coordinates
    ): Promise<WeatherData> => {
      try {
        const response = await fetch(
          `/api/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}`
        );

        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}: Failed to fetch weather data`
          );
        }

        const weatherData = await response.json();

        if (!weatherData || typeof weatherData.temperature === "undefined") {
          throw new Error("Invalid weather data format received");
        }

        if (weatherData.fallback && weatherData.error) {
          console.warn("Using fallback weather data:", weatherData.error);
        }

        return {
          temperature: weatherData.temperature,
          weathercode: weatherData.weathercode,
          city: weatherData.city || "Unknown Location",
          timestamp: new Date(weatherData.timestamp || new Date()),
        };
      } catch (fetchError) {
        console.error("Error in fetchWeatherData:", fetchError);
        throw fetchError;
      }
    };

    try {
      const coordinates = await getUserLocation();
      const weatherData = await fetchWeatherData(coordinates);
      setWeather(weatherData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch weather";
      setError(errorMessage);
      console.error("Weather fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [setWeather, setCoords]);

  useEffect(() => {
    const shouldRefreshWeather = () => {
      if (!weather) return true;

      const thirtyMinutesAgo = new Date();
      thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 30);

      return weather.timestamp
        ? new Date(weather.timestamp) < thirtyMinutesAgo
        : true;
    };

    if (shouldRefreshWeather()) {
      refreshWeather();
    } else {
      setLoading(false);
    }
  }, [weather, refreshWeather]);

  return {
    weather,
    loading,
    error,
    refreshWeather,
  };
};
