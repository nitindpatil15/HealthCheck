import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000,https://health-check-swart.vercel.app/",
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  headers: ["Content-Type", 'Authorization', 'auth-token'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, auth-token');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

// for setting limits on data
app.use(express.json({ limit: "50mb" }));

// Accessing cookies from user browser which can only  be accessed by server side code using the following method
app.use(cookieParser());

// Routes import
import healthcheckrouter from "./routes/healthcheckroute.js"
import userRouter from "./routes/userRoute.js"
// Router Declaration
app.use("/api/v1/healthcheck", healthcheckrouter);
app.use("/api/v1/user", userRouter);

export { app };