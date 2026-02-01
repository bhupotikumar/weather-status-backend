import axios from "axios";
import cache from "../config/cache.js";
import { env } from "../config/env.js";

/**
 * Current weather
 */
export const fetchCurrentWeather = async (city) => {
    const cacheKey = `current_${city}`;
    const cached = cache.get(cacheKey);
    if (cached) return cached;

    if (!env.WEATHER_API_URL || !env.WEATHER_API_KEY) {
        throw new Error("Weather API URL or Key is missing in env");
    }

    try {
        const res = await axios.get(env.WEATHER_API_URL, {
            params: {
                key: env.WEATHER_API_KEY,
                q: city,
                days: 1,
                aqi: "no",
                alerts: "no",
            },
        });

        const data = res.data.current; // only current weather
        cache.set(cacheKey, data, 600); // 10 minutes cache
        return data;
    } catch (err) {
        // Axios throws on invalid URL, network, or 4xx/5xx
        throw new Error(
            err.response?.data?.error?.message || "Failed to fetch weather"
        );
    }
};

/**
 * Hourly weather
 */
export const fetchHourlyWeather = async (city, hours = 24) => {
    const cacheKey = `hourly_${city}_${hours}`;
    const cached = cache.get(cacheKey);
    if (cached) return cached;

    try {
        const res = await axios.get(env.WEATHER_API_URL, {
            params: {
                key: env.WEATHER_API_KEY,
                q: city,
                days: 1,
                aqi: "no",
                alerts: "no",
            },
        });

        const hourly = res.data.forecast.forecastday[0].hour.slice(0, hours);
        cache.set(cacheKey, hourly, 600);
        return hourly;
    } catch (err) {
        throw new Error(
            err.response?.data?.error?.message || "Failed to fetch hourly weather"
        );
    }
};

/**
 * Daily weather
 */
export const fetchDailyWeather = async (city, days = 5) => {
    const cacheKey = `daily_${city}_${days}`;
    const cached = cache.get(cacheKey);
    if (cached) return cached;

    try {
        const res = await axios.get(env.WEATHER_API_URL, {
            params: {
                key: env.WEATHER_API_KEY,
                q: city,
                days,
                aqi: "no",
                alerts: "no",
            },
        });

        const daily = res.data.forecast.forecastday.map((day) => ({
            date: day.date,
            max_temp: day.day.maxtemp_c,
            min_temp: day.day.mintemp_c,
            condition: day.day.condition.text,
            icon: day.day.condition.icon,
        }));

        cache.set(cacheKey, daily, 600);
        return daily;
    } catch (err) {
        throw new Error(
            err.response?.data?.error?.message || "Failed to fetch daily weather"
        );
    }
};

/**
 * Weekly weather (derived from daily)
 */
export const fetchWeeklyWeather = async (city) => {
    // 7-day forecast; if API gives only 5, repeat last 2 days
    const daily = await fetchDailyWeather(city, 5);
    const weekly = [...daily, ...daily.slice(0, 2)];
    return weekly;
};

/**
 * Monthly weather (simulated)
 */
export const fetchMonthlyWeather = async (city) => {
    const daily = await fetchDailyWeather(city, 5);
    const monthly = [];
    for (let i = 0; i < 30; i++) {
        monthly.push(daily[i % daily.length]);
    }
    return monthly;
};
