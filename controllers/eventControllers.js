import express from "express";
import asyncHandler from "express-async-handler";
import {
  getEventByIdService,
  getEventsService,
  createEventService,
  jointEventService,
  updateEventService,
} from "../services/EventServices.js";
import { BadRequestError, NotAuthorizedError } from "../types/Errors.js";

export const createEventController = asyncHandler(async (req, res) => {
  const { eventname,
    eventtype,
    location,
    startdate,
    enddate,
    description,
    contactnumber,
    host } =
    req.body;
  //Event name missing added
  if (!eventname) {
    throw new BadRequestError("Event Name Missing");
  }

  const responseData = await createEventService(
    eventname,
    eventtype,
    location,
    startdate,
    enddate,
    description,
    contactnumber,
    host
  );

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
  const responseData = await getEventByIdService(eid);
  res.status(200).json({ responseData });
});

export const updateEventController = asyncHandler(async (req, res) => {
  const eid = parseInt(req.params.eid);
  const { eventname,
    eventtype,
    location,
    startdate,
    enddate,
    description,
    contactnumber,
    host
   } =
    req.body;
  //Event name missing added
  if (!eventname) {
    throw new BadRequestError("Event Name Missing");
  }

  const responseData = await updateEventService(
    eventname,
    eventtype,
    location,
    startdate,
    enddate,
    description,
    contactnumber,
    host,
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

export const jointEventController = asyncHandler(async (req, res) => {
  const { uid } = req.body;
  //Event name missing added
  if (!uid) {
    throw new BadRequestError("User ID Missing");
  }
  const eid = req.params.eid;

  if (!eid) {
    throw new BadRequestError("Event ID Missing");
  }
  const responseData = await jointEventService(uid, eid);

  res.status(201).json(responseData);
});
