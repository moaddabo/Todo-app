import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import todoRoutes from "./routes/TodoRoutes.js";

import * as dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json({ limit: "50mb" }));
connectDB();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

connectDB();

// Error Handling
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "something went wrong!";

  return res.status(status).json({
    success: false,
    status,
    message,
  });
});
//Routes

app.use("/api", todoRoutes);

app.get("*", (req, res) => {
  res.send(`ToDo Web App Server`);
});
// Creating Express Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Todo Server is running on port ${PORT}`));
