// src/config/env.js
import dotenv from "dotenv";
dotenv.config(); // load .env here first

const requiredEnv = ["WEATHER_API_KEY", "WEATHER_API_URL"];

requiredEnv.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`Missing required env variable: ${key}`);
    }
});

const env = {
    PORT: process.env.PORT || 5000,
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
    WEATHER_API_URL: process.env.WEATHER_API_URL,
};

export { env };

