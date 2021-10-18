import { spawn } from "child_process";

const crawlEvents = async () => {
  const eventCrawler = spawn("node", ["scripts/eventsCrawler.js"]);

  eventCrawler.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  eventCrawler.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  eventCrawler.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

export default crawlEvents;
