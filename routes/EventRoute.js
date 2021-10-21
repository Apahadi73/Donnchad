class EventRoute {
  constructor(userRepo) {
    this.userRepo = userRepo;
    // creates express router
    this.router = express.Router();
  }

  createEventRoutes() {
    this.router
      .route("/")
      .post(async (req, res, next) =>
        createEventController(req, res, next, this.userRepo)
      );
    this.router
      .route("/")
      .get(async (req, res, next) => getEvents(req, res, next, this.userRepo));
    this.router
      .route("/:eid")
      .get(async (req, res, next) =>
        getEventById(req, res, next, this.userRepo)
      );
    this.router
      .route("/:eid")
      .put(async (req, res, next) =>
        updateEventController(req, res, next, this.userRepo)
      );
    this.router
      .route("/:eid")
      .put(async (req, res, next) =>
        deleteEvent(req, res, next, this.userRepo)
      );
    this.router
      .route("/:eid/join")
      .post(async (req, res, next) =>
        jointEventController(req, res, next, this.userRepo)
      );
    this.router
      .route("/:eid/participants")
      .get(async (req, res, next) =>
        seeEventParticipantsController(req, res, next, this.userRepo)
      );
    return this.router;
  }
}

export default EventRoute;
