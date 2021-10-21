import express from "express";
import {
  createChatController,
  getChatsController,
  deleteChatbyIDController,
} from "../controllers/chatControllers.js";

const Router = express.Router();

Router.route("/").post(createChatController);
Router.route("/:cid").get(getChatsController);
Router.route("/:cid").delete(deleteChatbyIDController);

export { Router as chatRouter };
