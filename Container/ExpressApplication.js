import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { errorHandler } from "../middlewares/errorMiddleware.js";

class ExpressApplication {
  constructor(container) {
    // creates a server application
    this.app = express();
    this.container = container;
  }

  // creates and returns a new express application
  createExpressApp() {
    // injects environment variables into our application
    dotenv.config();

    // json body parser middleware
    this.app.use(express.json());

    // we use morgan to log all the incoming request
    this.app.use(morgan("dev"));

    // all routes
    this.app.use("/api/users", this.container.UserRoute);
    this.app.use("/api/events", this.container.EventRoute);

    this.app.get("/", async (req, res) => {
      res.status(200).send("Welcome to the Yapey.");
    });

    // middlewares
    this.app.use(errorHandler);

    return this.app;
  }
}

export default ExpressApplication;
