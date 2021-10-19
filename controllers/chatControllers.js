import express from "express";
import asyncHandler from "express-async-handler";
import {
  //   getEventByIdService,
  getChatsService,
  createChatService,
  deleteChatbyIDService,
  //   jointEventService,
  //   updateEventService,
} from "../services/ChatServices.js";
import { BadRequestError, NotAuthorizedError } from "../types/Errors.js";
export const createChatController = asyncHandler(async (req, res) => {
  const { message } = req.body;
  if (!message) {
    throw new BadRequestError("Message Missing");
  }
  const chatID = parseInt(req.params.eid);
  const responseData = await createChatService({
    message,
    chatID,
  });

  res.status(201).json(responseData);
});

export const getChatsController = asyncHandler(async (req, res) => {
  const responseData = await getChatsService();
  res.status(200).json({ responseData });
});

export const deleteChatbyIDController = asyncHandler(async (req, res) => {
  const chatID = parseInt(req.params.eid);
  const responseData = await deleteChatbyIDService(chatID);
  res.status(200).json({ responseData });
});
