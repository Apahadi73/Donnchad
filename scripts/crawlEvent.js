import { Worker } from "worker_threads";

const crawlEvent = async (scheduleTime) => {
  console.log(
    "------------------------------------------------------------------------------"
  );
  console.log(
    "------------------------Crawler Worker Started--------------------------------"
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
