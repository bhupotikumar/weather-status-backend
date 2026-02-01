import axios from "axios";
import cache from "../config/cache.js";
import { env } from "../config/env.js";

export const fetchWeather = async (city) => {
    const cached = cache.get(city);
    if (cached) return cached;

    const res = await axios.get(env.WEATHER_API_URL, {
        params: {
            key: env.WEATHER_API_KEY,
            q: city,
            days: 5
        }
    });

    cache.set(city, res.data);
    return res.data;
};
