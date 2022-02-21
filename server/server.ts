import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import errorMiddleware from "./middlewares/errorMiddleware";

const port = process.env.PORT || 5000;
dotenv.config({ path: __dirname + "/.env" });

connectDB();
const app = express();

//Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
