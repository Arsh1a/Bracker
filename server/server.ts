import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import connectDB from "./config/db";
import errorMiddleware from "./middlewares/errorMiddleware";
import authRouter from "./routes/authRoute";

const PORT = process.env.PORT || 5000;
dotenv.config({ path: __dirname + "/.env" });

connectDB();
const app = express();

//Middlewares
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/auth", authRouter);

app.use(errorMiddleware);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged error: ${err}`);
  server.close(() => process.exit(1));
});
