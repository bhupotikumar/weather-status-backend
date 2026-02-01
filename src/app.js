import express from "express";
import cors from "cors";
import helmet from "helmet";
import notFoundMiddleware from "./middlewares/notFound.js";
import errorHandlerMiddleware from "./middlewares/errorHandler.js";

import weatherRoutes from "./routes/weatherRoutes.js";

const app = express();

const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5173",
];

// ---------- Security Middlewares ----------
app.use(helmet());

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

app.use(express.json());

// ---------- Routes ----------
app.use("/api/weather", weatherRoutes);

// ---------- Health Check ----------
app.get("/", (req, res) => {
    res.send("Weather backend running 🌤️");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
