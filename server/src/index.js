import path from "path";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import "dotenv/config";

import router from "./routes/index.js";
import { mongoURI, mongoOptions } from "./config/mongo.js";

const port = process.env.PORT || 5000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", `http://localhost:${port}`);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

router(app);

mongoose
  .connect(mongoURI, mongoOptions)
  .then(() => {
    console.log("Connected to MongoDB...");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err}`);
  });
