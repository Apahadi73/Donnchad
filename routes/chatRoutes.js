import express from "express";
import {
  createChatController,
  getChatsController,
  deleteChatbyIDController,
} from "../controllers/chatControllers.js";

const Router = express.Router();

Router.route("/").post(createChatController);
Router.route("/").get(getChatsController);
Router.route("/:chatID").put(deleteChatbyIDController);

export { Router as chatRouter };
