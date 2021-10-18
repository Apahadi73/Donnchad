import axios from "axios";
import { parentPort } from "worker_threads";
const eventsCrawler = async () => {
  console.log("reached here");
  const event_url =
    "https://uttyler.campuslabs.com/engage/api/discovery/event/search?endsAfter=2021-10-17T18%3A55%3A17-05%3A00&orderByField=endsOn&orderByDirection=ascending&status=Approved&take=15&query=";

  // parentPort.once("message", async (message) => {
  //   const response = await axios.get(event_url);
  //   console.log(response);
  //   parentPort.postMessage("Data saved successfully");
  // });
};

export default eventsCrawler;
