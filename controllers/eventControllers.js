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

// @desc    Get a list of events
// @route   GET /api/events
// @access  Public
export const getEvents = asyncHandler(async (req, res) => {
  const responseData = await getEventsService();
  res.status(200).json({ responseData });
});

// @desc    Get a event by id
// @route   GET /api/events/:id
// @access  Public
export const getEventById = asyncHandler(async (req, res) => {
  const eid = parseInt(req.params.eid);
  const responseData = await fetEventByIdService(eid);
  res.status(200).json({ responseData });
});

export const updateEventController = asyncHandler(async (req, res) => {
  const eid = parseInt(req.params.eid);
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
    eid
  );

  res.status(201).json(responseData);
});

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Public
export const deleteEvent = asyncHandler(async (req, res) => {
  const eid = parseInt(req.params.eid);

  // deletes user from the db
  const responseData = await deleteEventService(eid);

  // response handling
  res.status(200).json({ responseData });
});
