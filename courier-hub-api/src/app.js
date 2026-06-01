import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import packagesRoutes from "./routes/packagesRoutes.js";
import trackingHistoryRoutes from "./routes/trackingHistoryRoutes.js";
import billingInfoRoutes from "./routes/billingInfoRoutes.js";
import errorHandling from "./middlewares/errorHandler.js";
import initializeDB from "./config/initializeDB.js";
import { isAuth } from "./middlewares/isAuth.js";

dotenv.config();

const app = express();

const port = process.env.SERVER_PORT;

//middlewares
app.use(express.json());
app.use(cors());

//routes

app.use("/services/auth", userRoutes);
app.use("/services/packages", packagesRoutes);
app.use("/services/billingInfo", billingInfoRoutes);
app.use("/services/trackingHistory", trackingHistoryRoutes);

//error handling
app.use(errorHandling);

const startServer = async () => {
  try {
    await initializeDB();

    app.listen(port, () => {
      console.log("Database connected & server running");
    });
  } catch (err) {
    console.error("Server startup failed");
    process.exit(1);
  }
};

startServer();
