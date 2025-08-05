import { NextRequest, NextResponse } from "next/server";

interface WeatherResponse {
  current_weather: {
    temperature: number;
    weathercode: number;
    time: string;
  };
}

interface GeocodingResponse {
  address: {
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    country?: string;
  };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lon");

  if (!latitude || !longitude) {
    return NextResponse.json(
      { error: "Latitude and longitude are required" },
      { status: 400 }
    );
  }

  try {
    // Fetch weather data and city name in parallel
    const [weatherResponse, geocodingResponse] = await Promise.all([
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      ),
      fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      ),
    ]);

    if (!weatherResponse.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const weatherData: WeatherResponse = await weatherResponse.json();
    let cityName = "Unknown Location";

    if (geocodingResponse.ok) {
      const geocodingData: GeocodingResponse = await geocodingResponse.json();
      cityName =
        geocodingData.address?.city ||
        geocodingData.address?.town ||
        geocodingData.address?.village ||
        geocodingData.address?.state ||
        "Unknown Location";
    }

    return NextResponse.json({
      temperature: Math.round(weatherData.current_weather.temperature),
      weathercode: weatherData.current_weather.weathercode,
      city: cityName,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
