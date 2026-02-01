import {
    fetchCurrentWeather,
    fetchHourlyWeather,
    fetchDailyWeather,
    fetchWeeklyWeather,
    fetchMonthlyWeather,
} from "../services/weatherService.js";

/**
 * Get current weather (Home page)
 */
export const getCurrentWeather = async (req, res, next) => {
    try {
        const { city } = req.query;
        if (!city) {
            return res.status(400).json({
                success: false,
                message: "City is required",
            });
        }

        const data = await fetchCurrentWeather(city);

        res.status(200).json({
            success: true,
            type: "current",
            city,
            data,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Get hourly weather (Hourly page)
 */
export const getHourlyWeather = async (req, res, next) => {
    try {
        const { city, hours } = req.query;
        if (!city) {
            return res.status(400).json({
                success: false,
                message: "City is required",
            });
        }

        const hoursInt = hours ? parseInt(hours) : 24; // default 24h
        const data = await fetchHourlyWeather(city, hoursInt);

        res.status(200).json({
            success: true,
            type: "hourly",
            city,
            hours: hoursInt,
            data,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Get daily weather (Daily page)
 */
export const getDailyWeather = async (req, res, next) => {
    try {
        const { city, days } = req.query;
        if (!city) {
            return res.status(400).json({
                success: false,
                message: "City is required",
            });
        }

        const daysInt = days ? parseInt(days) : 5; // default 5 days
        const data = await fetchDailyWeather(city, daysInt);

        res.status(200).json({
            success: true,
            type: "daily",
            city,
            days: daysInt,
            data,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Get weekly weather (Weekly page)
 * Derived from daily data
 */
export const getWeeklyWeather = async (req, res, next) => {
    try {
        const { city } = req.query;
        if (!city) {
            return res.status(400).json({
                success: false,
                message: "City is required",
            });
        }

        const data = await fetchWeeklyWeather(city);

        res.status(200).json({
            success: true,
            type: "weekly",
            city,
            data,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Get monthly weather (Monthly page)
 * Simulated / historical averages
 */
export const getMonthlyWeather = async (req, res, next) => {
    try {
        const { city } = req.query;
        if (!city) {
            return res.status(400).json({
                success: false,
                message: "City is required",
            });
        }

        const data = await fetchMonthlyWeather(city);

        res.status(200).json({
            success: true,
            type: "monthly",
            city,
            data,
        });
    } catch (err) {
        next(err);
    }
};
