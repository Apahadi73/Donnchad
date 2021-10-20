import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import nodeCron from "node-cron";

// routes import
import { userRouter } from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import { eventRouter } from "./routes/eventRoutes.js";
import { migrate } from "./scripts/migrate.js";
import { chatRouter } from "./routes/chatRoutes.js";
import { seed } from "./scripts/seed.js";
import crawlEvents from "./scripts/crawlEvent.js";

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
app.use("/api/chats", chatRouter);

app.get("/", async (req, res) => {
  res.status(200).send("Welcome to the donnchad world.");
});

// middlewares
app.use(notFound);
app.use(errorHandler);

// sets port and listener
const PORT = process.env.PORT || 5000;
// only listen if not in test environment
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, async () => {
    console.log(
      `Server is listening on port: ${process.env.PORT}!`.yellow.bold
    );
    await migrate();
    await seed();
    const dateTime = new Date().toLocaleString().split("/");
    const scheduleTime = `${dateTime[2].split(",")[0]}-${dateTime[0]}-${
      dateTime[1]
    }`;
    await crawlEvents(scheduleTime);

    const job = nodeCron.schedule("30 20 * * * *", async () => {
      await crawlEvents(scheduleTime);
    });
    job.start();
  });
}

export default app;
