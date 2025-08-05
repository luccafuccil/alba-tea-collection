"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  IconCloud,
  IconSun,
  IconCloudRain,
  IconRefresh,
} from "@tabler/icons-react";
import { Card } from "@/components/ui/card";
import { IconButton } from "@/components/ui/button";
import { useWeather } from "@/hooks/use-weather";
import { WEATHER_CODES } from "@/lib/constants/ui";

export const WeatherWidget: React.FC = () => {
  const { weather, loading, error, refreshWeather } = useWeather();

  const getWeatherIcon = (weathercode: number) => {
    if (weathercode === 0 || weathercode === 1) return IconSun;
    if (weathercode >= 61 && weathercode <= 82) return IconCloudRain;
    return IconCloud;
  };

  const getWeatherDescription = (weathercode: number): string => {
    return (
      WEATHER_CODES[weathercode as keyof typeof WEATHER_CODES] || "unknown"
    );
  };

  const getTeaSuggestion = (temperature: number, weathercode: number) => {
    if ((weathercode === 0 || weathercode === 1) && temperature > 20) {
      return "How about some iced tea to cool down?";
    }
    if (weathercode >= 61 && weathercode <= 82) {
      return "Perfect weather for a warm cup of tea!";
    }
    return "How about a cup of tea?";
  };

  if (loading) {
    return (
      <Card size="medium" className="bg-white/80 backdrop-blur-sm">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card size="medium" className="bg-white/80 backdrop-blur-sm">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-red-600">Failed to load weather</div>
            <IconButton
              size="sm"
              variant="ghost"
              onClick={refreshWeather}
              className="text-red-600 hover:bg-red-50"
            >
              <IconRefresh size={16} />
            </IconButton>
          </div>
          <div className="text-xs text-text-color/60">
            Tap refresh to try again
          </div>
        </div>
      </Card>
    );
  }

  if (!weather) {
    return null;
  }

  const WeatherIcon = getWeatherIcon(weather.weathercode);
  const description = getWeatherDescription(weather.weathercode);
  const suggestion = getTeaSuggestion(weather.temperature, weather.weathercode);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card size="medium" className="bg-white/80 backdrop-blur-sm">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <WeatherIcon size={24} className="text-text-color/60" />
              <div>
                <div className="font-title text-lg text-text-color">
                  {weather.temperature}°C
                </div>
                {weather.city && (
                  <div className="font-body text-sm text-text-color/60">
                    {weather.city}
                  </div>
                )}
              </div>
            </div>
            <IconButton
              size="sm"
              variant="ghost"
              onClick={refreshWeather}
              className="text-text-color/40 hover:text-text-color/60 hover:bg-gray-50"
              title="Refresh weather"
            >
              <IconRefresh size={16} />
            </IconButton>
          </div>

          <div className="font-body text-text-color/80 leading-relaxed">
            Weather in {weather.city} looks {description.replace("-", " ")}{" "}
            right now.
            <br />
            {suggestion}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
