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

export const updateEventService = async (
  name,
  description,
  location,
  phone,
  startDate,
  endDate,
  host,
  type,
  uid
) => {
  //checks whether the event exists in the database
  const eventExists = await DBEvent.getEvent(uid);

  //if event does not exists
  if (!eventExists.length > 0) {
    throw new NotFoundError("Event does not exist.");
  }

  const responseData = await DBEvent.updateEventController(
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

  if (responseData > 0) {
    `Successfully deleted event ${uid}.`;
  } else {
    throw new InternalServerError(
      "Something went wrong while updating the event from the database"
    );
  }
};
