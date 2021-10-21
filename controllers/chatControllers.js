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
	const response = await createChatService();
	res.status(201).json(response);
});

export const getChatsController = asyncHandler(async (req, res) => {
	const cid = req.params.cid;
	const responseData = await getChatsService(cid);
	res.status(200).json({ responseData });
});

export const deleteChatbyIDController = asyncHandler(async (req, res) => {
	const cid = parseInt(req.params.eid);
	const responseData = await deleteChatbyIDService(cid);
	res.status(200).json({ responseData });
});
