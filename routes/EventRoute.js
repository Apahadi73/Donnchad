import express from "express";
import {
  createEventController,
  deleteEventController,
  getEventByIdController,
  jointEventController,
  seeEventParticipantsController,
  updateEventController,
} from "../controllers/eventControllers.js";

class EventRoute {
  constructor(userRepo) {
    this.userRepo = userRepo;
    // creates express router
    this.router = express.Router();
  }

  createEventRoutes() {
    //-----------------------------------Events related routes----------------------------------------------
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
        getEventByIdController(req, res, next, this.userRepo)
      );
    this.router
      .route("/:eid")
      .put(async (req, res, next) =>
        updateEventController(req, res, next, this.userRepo)
      );
    this.router
      .route("/:eid")
      .put(async (req, res, next) =>
        deleteEventController(req, res, next, this.userRepo)
      );

    //-----------------------------------Event Chat related routes-------------------------------------------

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
