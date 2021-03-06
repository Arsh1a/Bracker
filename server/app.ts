import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import connectDB from "./config/db";
import errorMiddleware from "./middlewares/errorMiddleware";
import generalRouter from "./routes/generalRoute";
import authRouter from "./routes/authRoute";
import projectRouter from "./routes/projectRoute";
import ticketRouter from "./routes/ticketRoute";
import cors from "cors";

dotenv.config({ path: __dirname + "/.env" });

connectDB();
const app = express();

//Middlewares
app.enable("trust proxy");
app.use(
  cors({
    credentials: true,
    origin: ["https://bracker.ir", "https://www.bracker.ir", "http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    exposedHeaders: "Set-Cookie",
  })
);
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/", generalRouter);
app.use("/api/auth", authRouter);
app.use("/api/project", projectRouter);
app.use("/api/ticket", ticketRouter);

app.use(errorMiddleware);

export default app;
