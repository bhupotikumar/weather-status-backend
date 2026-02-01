import { Router } from "express";
import { getWeather } from "../controllers/weatherController";

const router = Router();

// Routes
router.get("/", getWeather);

export default router;