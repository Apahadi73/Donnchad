import DBEvent from "../db/dbEvent.js";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../types/Errors.js";

export const createEventService = async (
  name,
  description,
  location,
  phone,
  startDate,
  endDate,
  host,
  type
) => {
  if (!name) {
    throw new BadRequestError("Event name missing");
  }

  const responseData = await DBEvent.createEvent(
    name,
    description,
    location,
    phone,
    startDate,
    endDate,
    host,
    type
  );

  if (responseData) {
    return responseData;
  } else {
    throw new InternalServerError("Something went wrong while creating the");
  }
};

// @desc    Get a list of events from the db
// @input: nothing
// @return: list of events
export const getUsersService = async () => {};

// @desc    Get a event by id from the db
// @input:  Event id - eid
// @return: return user in the db matching the unique user id
export const getEventByIdService = async (eid) => {
  if (!eid) {
    throw new BadRequestError("Invalid Event ID");
  }
  const event = await DBEvent.getEvent(eid);

  //if event does not exists
  if (!event.length > 0) {
    throw new NotFoundError("Event does not exist.");
  }
  return event;
};

export const updateEventService = async (
  name,
  description,
  location,
  phone,
  startDate,
  endDate,
  host,
  type,
  eid
) => {
  // checks whether the event exists in the database
  const eventExists = await DBEvent.getEvent(eid);

  //if event does not exists
  if (!eventExists.length > 0) {
    throw new NotFoundError("Event does not exist.");
  }

  const responseData = await DBEvent.updateEvent(
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

  if (responseData > 0) {
    `Successfully deleted event ${eid}.`;
  } else {
    throw new InternalServerError(
      "Something went wrong while updating the event from the database"
    );
  }
};

// @description: delete the event from the db
// @input: eid - event id
// @return: response object
export const deleteUserService = async (eid) => {};

export const jointEventService = async (uid, eid) => {
  if (!uid) {
    throw new BadRequestError("User ID Missing");
  }
  if (!eid) {
    throw new BadRequestError("Event ID Missing");
  }
  const responseData = await DBEvent.joinEvent(uid, eid);

  if (responseData) {
    return responseData;
  } else {
    throw new InternalServerError("Something went wrong while joining event");
  }
};
