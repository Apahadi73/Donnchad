import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

// routes import
import { userRouter } from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import { eventRouter } from "./routes/eventRoutes.js";

// configures environment variables
// we use this to inject the environment variables into our application
dotenv.config();

// creates a server application
const app = express();

// json body parser middleware
app.use(express.json());

// we use morgan to log all the incoming request
app.use(morgan("dev"));

// all routes
app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);

app.get("/", async (req, res) => {
  res.status(200).send("Welcome to the donnchad world.");
});

// middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
