import EventRepo from "../database/EventRepo.js";
import EventRoute from "../routes/EventRoute.js";

export default function (container) {
  container.service(
    "EventRepo",
    (container) => new EventRepo(container.Database)
  );
  container.service("EventRoute", (container) =>
    new EventRoute(container.EventRepo).createEventRoutes()
  );
}
