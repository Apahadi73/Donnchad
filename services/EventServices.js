import DBEvent from "../db/dbEvent.js";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../types/Errors.js";

export const createEventService = async (
  eventname,
    eventtype,
    location,
    startdate,
    enddate,
    description,
    contactnumber,
    host
) => {
  if (!eventname) {
    throw new BadRequestError("Event name missing");
  }
 
  if (!host) {
    throw new BadRequestError("Host name missing");
  }

  const responseData = await DBEvent.createEvent(
    eventname,
    eventtype,
    location,
    startdate,
    enddate,
    description,
    contactnumber,
    host
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
export const getEventsService = async () => {
  const responseData = await DBEvent.getEvents();
  if (responseData) {
    if (responseData.length > 0) {
      return responseData;
    } else {
      throw new NotFoundError("No events found!");
    }
  } else {
    throw new InternalServerError(
      "Something went wrong while fetching the events from the db"
    );
  }
};

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
  eventname,
    eventtype,
    location,
    startdate,
    enddate,
    description,
    contactnumber,
    host,
    eid
) => {
  // checks whether the event exists in the database
  const eventExists = await DBEvent.getEvent(eid);

  //if event does not exists
  if (!eventExists.length > 0) {
    throw new NotFoundError("Event does not exist.");
  }

  const responseData = await DBEvent.updateEvent(
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
  if (responseData) {
    return responseData;
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
