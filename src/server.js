
// ---------- Load environment variables ----------
import app from "./app.js";
import { env } from "./config/env.js";


// ---------- Config ----------
const PORT = env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// ---------- Start Server ----------
app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${NODE_ENV} mode on http://localhost:${PORT}`
  );
});

// ---------- Graceful shutdown (optional but professional) ----------
process.on("SIGINT", () => {
  console.log("🛑 Server shutting down...");
  process.exit(0);
});
