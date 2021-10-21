import dotenv from "dotenv";
import nodeCron from "node-cron";
import crawlEvents from "./scripts/crawlEvent.js";
import http from "http";
import colors from "colors";

// routes import
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

// wraps our server application
websocket(server);

process.on("message", (message) => {
  console.log(message);
});

export default server;
