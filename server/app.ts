import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import connectDB from "./config/db";
import errorMiddleware from "./middlewares/errorMiddleware";
import authRouter from "./routes/authRoute";
import projectRouter from "./routes/projectRoute";
import cors from "cors";

dotenv.config({ path: __dirname + "/.env" });

connectDB();
const app = express();

//Middlewares
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/auth", authRouter);
app.use("/api/projects", projectRouter);

app.use(errorMiddleware);

export default app;
