import { parentPort, workerData } from "worker_threads";
import { convert } from "html-to-text";

console.log("crawler worker started");
// const eventRepo = workerData.eventRepo;
let fetchedEvents;
let polishedEvents = [];

if (workerData.fetchedEvents) {
  fetchedEvents = workerData.fetchedEvents;
}
if (fetchedEvents) {
  let event = {};

  // polishes raw event data received from patriots engage
  const polishFetchedEvents = async (fetchedEvents) => {
    for (let data of fetchedEvents) {
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
      polishedEvents.push(event);
      event = {};
    }
  };
  polishFetchedEvents(fetchedEvents);
  parentPort.postMessage(polishedEvents);
} else {
  parentPort.postMessage([]);
}
