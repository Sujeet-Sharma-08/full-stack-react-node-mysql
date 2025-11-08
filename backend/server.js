import express from "express";
import dotenv from "dotenv";
import connection from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: "*",
  credentials: true,
}));


// Routes
app.use("/user", userRoute);

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port: ${PORT}`);
});
