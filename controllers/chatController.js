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
export const createChatController = asyncHandler(
  async (req, res, next, messageRepo) => {
    try {
      const response = await createChatService(messageRepo);
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }
);

export const deleteChatbyIDController = asyncHandler(
  async (req, res, next, messageRepo) => {
    try {
      const cid = parseInt(req.params.eid);
      const responseData = await deleteChatbyIDService(cid, messageRepo);
      res.status(200).json({ responseData });
    } catch (e) {
      next(e);
    }
  }
);
