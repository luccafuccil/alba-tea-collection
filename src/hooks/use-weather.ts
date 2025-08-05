"use client";

import { useState, useEffect } from "react";
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
          resolve(coords);
        },
        {
          timeout: 10000,
          enableHighAccuracy: false,
        }
      );
    });
  };

  const fetchCityName = async (
    latitude: number,
    longitude: number
  ): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();

      return (
        data.address?.city ||
        data.address?.town ||
        data.address?.village ||
        data.address?.state ||
        "Unknown Location"
      );
    } catch (error) {
      console.warn("Could not fetch city name:", error);
      return "Unknown Location";
    }
  };

  const fetchWeatherData = async (
    coordinates: Coordinates
  ): Promise<WeatherData> => {
    const [weatherResponse, cityName] = await Promise.all([
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current_weather=true`
      ),
      fetchCityName(coordinates.latitude, coordinates.longitude),
    ]);

    if (!weatherResponse.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const weatherData = await weatherResponse.json();

    return {
      temperature: Math.round(weatherData.current_weather.temperature),
      weathercode: weatherData.current_weather.weathercode,
      city: cityName,
      timestamp: new Date(),
    };
  };

  const refreshWeather = async () => {
    setLoading(true);
    setError(null);

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
  };

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
  }, []);

  return {
    weather,
    loading,
    error,
    refreshWeather,
  };
};
