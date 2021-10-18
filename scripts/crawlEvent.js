import { Worker, isMainThread, workerData, parentPort } from "worker_threads";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let workDir = __dirname + "/eventsCrawler.js";

const crawlEvent = async (scheduleTime) => {
  console.log(
    "------------------------------------------------------------------------------"
  );
  console.log(
    "------------------------------------------------------------------------------"
  );
  console.log(
    "------------------------------------------------------------------------------"
  );

  //Create new worker
  const worker = new Worker("./worker.js", {
    workerData: { scheduleTime: scheduleTime },
  });

  //Listen for a message from worker
  worker.once("message", (result) => {
    console.log(result);
  });

  worker.on("error", (error) => {
    console.log(error);
  });

  worker.on("exit", (exitCode) => {
    console.log(
      "------------------------crawler message---------------------------------"
    );
    console.log(`worker thread exited with code ${exitCode}`);
  });

  console.log("Executed in the parent thread");
};

export default crawlEvent;
