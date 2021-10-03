import express from "express";
import asyncHandler from "express-async-handler";
import {
  createEventService,
  updateEventService,
} from "../services/EventServices.js";
import { BadRequestError, NotAuthorizedError } from "../types/Errors.js";

export const createEventController = asyncHandler(async (req, res) => {
  const { name, description, location, phone, startDate, endDate, host, type } =
    req.body;
  //Event name missing added
  if (!name) {
    throw new BadRequestError("Event Name Missing");
  }

  const responseData = await createEventService({
    name,
    description,
    location,
    phone,
    startDate,
    endDate,
    host,
    type,
  });

  res.status(201).json(responseData);
});

export const updateEventController = asyncHandler(async (req, res) => {
  const uid = parseInt(req.params.uid);
  const { name, description, location, phone, startDate, endDate, host, type } =
    req.body;
  //Event name missing added
  if (!name) {
    throw new BadRequestError("Event Name Missing");
  }

  const responseData = await updateEventService(
    name,
    description,
    location,
    phone,
    startDate,
    endDate,
    host,
    type,
    uid
  );

  res.status(201).json(responseData);
});
