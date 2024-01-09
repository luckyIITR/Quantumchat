import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./Config/db.js";
import userRoutes from "./routes/userAuth.js";
import profile from "./routes/profile.js";
import messageRoutes from "./routes/messageRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config({
  path: "Config/config.env",
});

connectDB();

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("<h1>Server is running</h1>");
});


app.use("/api/auth", userRoutes);
app.use("/api/profile", profile);
app.use("/api/message", messageRoutes);
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`The port is ${PORT}`);
});
