import { parentPort, workerData } from "worker_threads";
import axios from "axios";
import { convert } from "html-to-text";

import DBEvent from "./db/dbEvent.js";

console.log("crawler worker started");
console.log(`wokerData time : ${workerData.scheduleTime}`);
let dateTime;
if (workerData.scheduleTime) {
  dateTime = workerData.scheduleTime;
}
if (dateTime) {
  const event_url = `https://uttyler.campuslabs.com/engage/api/discovery/event/search?endsAfter=${dateTime}&orderByField=endsOn&orderByDirection=ascending&status=Approved&take=100&query=`;

  const response = await axios.get(event_url);
  let responseData;
  if (response && response.data) {
    responseData = response.data.value;
  }
  let event = {};

  // polishes raw event data received from patriots engage
  const polishEvents = async (responseData) => {
    let events = [];
    for (let data of responseData) {
      // event["eid"] = data["id"];
      event["name"] = data["name"];
      event["hostname"] = data["organizationName"];
      event["description"] = convert(data["description"]);
      event["location"] = data["location"];
      // event["categorynames"] = data["categoryNames"];
      event["starttime"] = data["startsOn"];
      event["endtime"] = data["endsOn"];
      if (data["imagePath"]) {
        event["imageurl"] =
          "https://uttyler.campuslabs.com/engage/image/" + data["imagePath"];
      }
      events.push(event);
      event = {};
    }
    return events;
  };

  const updateEventDB = async (events) => {
    for (let event of events) {
      await DBEvent.createEvent(event);
    }
  };

  if (responseData) {
    parentPort.postMessage("Events data crawled from patriots engage");
    const polishedEvents = await polishEvents(responseData);
    if (polishEvents) {
      console.log("Events data polished");
      await updateEventDB(polishedEvents);
      console.log("Crawled events inserted into DB");
      console.log(
        "------------------------------------------------------------------------------"
      );
      console.log(
        "------------------------Worker Job Finished-----------------------------------"
      );
      console.log(
        "------------------------------------------------------------------------------"
      );
    }
  } else {
    parentPort.postMessage("Failed to crawl events from patriots engage");
  }
}
