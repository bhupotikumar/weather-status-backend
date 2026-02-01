import express from "experss"
import cors from "cors"
import helmet from "helmet"

const app = express();

// ---------- Security Headers ----------
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

export default app;
