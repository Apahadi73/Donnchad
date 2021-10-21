import EventRepo from "../database/EventRepo.js";
import EventRepoMock from "../__test__/__mocks__/EventRepo.mock.js";
import EventRoute from "../routes/EventRoute.js";

export default function (container) {
  container.service("EventRepo", (container) => {
    const environment = process.env.NODE_ENV;
    if (environment == "test") {
      return new EventRepoMock();
    } else {
      return new EventRepo(container.Database);
    }
  });
  container.service("EventRoute", (container) =>
    new EventRoute(container.EventRepo).createEventRoutes()
  );
}
