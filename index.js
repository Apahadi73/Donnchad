import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";

// routes import
import { userRouter } from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

// configures environment variables
// we use this to inject the environment variables into our application
dotenv.config();

// creates a server application
const app = express();

// json body parser middleware
app.use(express.json());

// we use morgan to log all the incoming request
if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

// all routes
app.use("/api/users", userRouter);
app.get("/", (req, res) => res.send("No api service found"));

// middlewares
app.use(notFound);
app.use(errorHandler);

// sets port and listener
const PORT = process.env.PORT || 2000;
// only listen if not in test environment
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () =>
    console.log(`Server is listening on port: ${process.env.PORT}!`.yellow.bold)
  );
}

export default app;
