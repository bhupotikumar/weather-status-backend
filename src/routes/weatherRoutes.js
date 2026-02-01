import { Router } from "express";
import {
    getCurrentWeather,
    getHourlyWeather,
    getDailyWeather,
    getWeeklyWeather,
    getMonthlyWeather,
} from "../controllers/weatherController.js";

const router = Router();

// ---------- Weather Routes ----------

// Current weather (Home page)
router.get("/current", getCurrentWeather);

// Hourly forecast (Hourly page)
router.get("/hourly", getHourlyWeather);

// Daily forecast (Daily page)
router.get("/daily", getDailyWeather);

// Weekly forecast (Weekly page)
router.get("/weekly", getWeeklyWeather);

// Monthly forecast (Monthly page)
router.get("/monthly", getMonthlyWeather);

export default router;
