import express from "express";
import { createChatController } from "../controllers/chatController";

const router = express.Router();

// our chat routes
router.route("/").get(getChatController);
// router.route("/:eid").get(getEventById);
// router.route("/:eid").put(updateEventController);
// router.route("/:eid").put(deleteEvent);

export { router as chatRouter };
