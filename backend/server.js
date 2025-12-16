import express from "express";
import dotenv from "dotenv";
import connection from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import contactRoute  from './routes/contactRoute.js'
import ideaRoute from './routes/ideaRoute.js'
import cookieParser from "cookie-parser";
import otpRoute from './routes/otpRoute.js'
import profileRoute from './routes/profileRoute.js'
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true, // Important for cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// Routes
app.use("/user", userRoute);
app.use('/contact', contactRoute)
app.use('/idea', ideaRoute)
app.use('/user/v1', otpRoute);
app.use('/user', profileRoute);



// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port: ${PORT}`);
});
