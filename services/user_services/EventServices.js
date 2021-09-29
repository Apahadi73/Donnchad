import DBEvent from "../../db/dbEvent.js";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../../types/Errors.js";
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
