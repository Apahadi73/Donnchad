import express from "express";
import { createEventController } from "../controllers/eventControllers.js";
const Router = express.Router();

Router.route("/").post(createEventController);

export { Router as eventRouter };
