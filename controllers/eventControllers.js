import express from "express";
import asyncHandler from "express-async-handler";
import { createEventService } from "../services/EventServices.js";

export const createEventController = asyncHandler(async (req, res) => {
  const { name, description, location, phone, startDate, endDate, host, type } =
    req.body;

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
