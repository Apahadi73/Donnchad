import express from "express";
import {
  createEventController,
  updateEventController,
} from "../controllers/eventControllers.js";
const Router = express.Router();

Router.route("/").post(createEventController);
Router.route("/:uid").put(updateEventController);

export { Router as eventRouter };
