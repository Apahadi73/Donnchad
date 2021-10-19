import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import nodeCron from "node-cron";
import crawlEvents from "./scripts/crawlEvent.js";
import http from "http";

// routes import
import { userRouter } from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import { eventRouter } from "./routes/eventRoutes.js";
import { migrate } from "./scripts/migrate.js";
import { seed } from "./scripts/seed.js";
import app from "./app.js";

// configures environment variables
// we use this to inject the environment variables into our application
dotenv.config();

const server = http.Server(app);
// sets port and listener
const PORT = process.env.PORT || 5000;
// only listen if not in test environment
server.listen(PORT, async () => {
  console.log(`Server is listening on port: ${process.env.PORT}!`.yellow.bold);
  await migrate();
  await seed();
  if (process.env.NODE_ENV !== "test") {
    const dateTime = new Date().toLocaleString().split("/");
    const scheduleTime = `${dateTime[2].split(",")[0]}-${dateTime[0]}-${
      dateTime[1]
    }`;

    await crawlEvents(scheduleTime);

    const job = nodeCron.schedule("0 12 * * *", async () => {
      await crawlEvents(scheduleTime);
    });
    job.start();
  }
});

export default app;
