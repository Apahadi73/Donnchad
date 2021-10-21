import axios from "axios";
import { Worker } from "worker_threads";

class EventScrapper {
  constructor(evenRepo) {
    this.evenRepo = evenRepo;
    this.event_url = `https://uttyler.campuslabs.com/engage/api/discovery/event/search?endsAfter=${this.getDate()}&orderByField=endsOn&orderByDirection=ascending&status=Approved&take=100&query=`;
    this.fetchedEvents = [];
  }

  getDate() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let fullDate = `${year}-${month}-${day}`;
    return fullDate;
  }

  async fetchEvents() {
    const response = await axios.get(this.event_url);
    if (response && response.data) {
      // store fetched events
      this.fetchEvents = response.data.value;
      this.spawnWorkerThread();
    }
  }

  async spawnWorkerThread() {
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
      workerData: { fetchedEvents: this.fetchEvents },
    });

    //Listen for a message from worker
    worker.once("message", (newEvents) => {
      if (newEvents.length > 0) {
        this.updateEventDatabase(newEvents);
      }
    });

    worker.on("error", (error) => {
      console.log(error);
    });

    worker.on("exit", (exitCode) => {
      console.log(
        "------------------------------------------------------------------------------"
      );
      console.log(
        "------------------------Worker Job Finished-----------------------------------"
      );
      console.log(
        "------------------------------------------------------------------------------"
      );
      console.log(`worker thread exited with code ${exitCode}`);
    });
  }

  async updateEventDatabase(newEvents) {
    console.log("Events data polished");
    for (let event of newEvents) {
      const eventExists = await this.evenRepo.checkEvent(
        event.name,
        event.hostname,
        event.starttime,
        event.endtime
      );

      // only add newly added events
      if (!eventExists) {
        await this.evenRepo.createEvent(event);
      }
    }
    console.log("Crawled events inserted into DB");
  }
}

export default EventScrapper;
