import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";

// routes import
import { userRouter } from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import { eventRouter } from "./routes/eventRoutes.js";
import { migrate } from "./scripts/migrate.js";

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
  await migrate();
  res.send("Welcome to the donnchad world.");
});

// middlewares
app.use(notFound);
app.use(errorHandler);

// sets port and listener
const PORT = process.env.PORT || 5000;
// only listen if not in test environment
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () =>
    console.log(`Server is listening on port: ${process.env.PORT}!`.yellow.bold)
  );
}

export default app;
