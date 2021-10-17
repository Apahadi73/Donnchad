import express from "express";
import {
  createEventController,
  deleteEvent,
  getEventById,
  getEvents,
  jointEventController,
  seeEventParticipantsController,
  updateEventController,
} from "../controllers/eventControllers.js";
const Router = express.Router();

Router.route("/").post(createEventController);
Router.route("/").get(getEvents);
Router.route("/:eid").get(getEventById);
Router.route("/:eid").put(updateEventController);
Router.route("/:eid").put(deleteEvent);
Router.route("/:eid/join").post(jointEventController);
Router.route("/:eid/participants").get(seeEventParticipantsController);

export { Router as eventRouter };
