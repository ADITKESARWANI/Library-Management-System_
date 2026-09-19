import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import {errorMiddleware} from "./middleware/errorMiddlewares.js"
import authRouter from "./routes/authRoutes.js";
import bookRouter from "./routes/bookRoutes.js";
import borrowRouter from "./routes/borrowRouter.js";
import userRouter from "./routes/userRouter.js";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "config", "config.env") });

export const app = express();



app.use(cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE",],
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/borrow", borrowRouter);
app.use("/api/v1/user", userRouter);


app.use(errorMiddleware);
