import { fetchWeather } from "../services/weather.service.js";

export const getWeather = async (req, res, next) => {
    try {
        const { city } = req.query;
        const data = await fetchWeather(city);
        res.json(data);
    } catch (err) {
        next(err);
    }
};
