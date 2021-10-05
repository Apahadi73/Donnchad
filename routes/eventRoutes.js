import express from "express";
import {
  createEventController,
  deleteEvent,
  getEventById,
  getEvents,
  updateEventController,
} from "../controllers/eventControllers.js";
const Router = express.Router();

Router.route("/").post(createEventController);
Router.route("/").get(getEvents);
Router.route("/:id").get(getEventById);
Router.route("/:uid").put(updateEventController);
Router.route("/:id").put(deleteEvent);

export { Router as eventRouter };
