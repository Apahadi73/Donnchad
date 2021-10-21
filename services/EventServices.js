import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../types/Errors.js";

export const createEventService = async (eventInfo, eventRepo) => {
  if (!eventInfo.name) {
    throw new BadRequestError("Event name missing");
  }

  if (!eventInfo.hostname) {
    throw new BadRequestError("Host name missing");
  }

  const createdEvent = await eventRepo.createEvent(eventInfo);

  if (createdEvent) {
    return createdEvent;
  } else {
    throw new InternalServerError(
      "Something went wrong while creating the event"
    );
  }
};

// @desc    Get a list of events from the db
// @input: nothing
// @return: list of events
export const getEventsService = async (eventRepo) => {
  const responseData = await eventRepo.getEvents();
  if (responseData) {
    return responseData;
  } else {
    throw new InternalServerError(
      "Something went wrong while fetching the events from the db"
    );
  }
};

// @desc    Get a event by id from the db
// @input:  Event id - eid
// @return: return user in the db matching the unique user id
export const getEventByIdService = async (eid, eventRepo) => {
  if (!eid) {
    throw new BadRequestError("Invalid Event ID");
  }
  const event = await eventRepo.getEventbyId(eid);

  //if event does not exists
  if (!event) {
    throw new NotFoundError("Event does not exist.");
  }
  return event;
};

export const updateEventService = async (eid, eventInfo, eventRepo) => {
  // checks whether the event exists in the database
  const eventExists = await eventRepo.checkEventbyId(eid);

  //if event does not exists
  if (!eventExists) {
    throw new NotFoundError("Event does not exist.");
  }

  const responseData = await eventRepo.updateEvent(eid, eventInfo);

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
export const deleteEventService = async (eid, eventRepo) => {
  if (!eid) {
    throw new BadRequestError("Invalid Event ID");
  }

  // checks whether the event exists in the database
  const eventExists = await eventRepo.checkEventbyId(eid);

  //if event does not exists
  if (!eventExists) {
    throw new NotFoundError("Event does not exist.");
  }
  // deletes user from the db
  const responseData = await eventRepo.deleteUser(eid);

  if (responseData) {
    return `Successfully deleted event ${eid}`;
  } else {
    throw new InternalServerError(
      "Something went wrong while deleting the event in the database"
    );
  }
};

export const jointEventService = async (uid, eid, accessRole, eventRepo) => {
  if (!uid) {
    throw new BadRequestError("User ID Missing");
  }
  if (!eid) {
    throw new BadRequestError("Event ID Missing");
  }

  const participantExists = await eventRepo.checkEventParticipant(uid);

  if (participantExists) {
    throw new BadRequestError("Already joined the event");
  }

  const responseData = await eventRepo.joinEvent(uid, eid, accessRole);

  if (responseData) {
    return responseData;
  } else {
    throw new InternalServerError("Something went wrong while joining event");
  }
};

export const seeEventParticipantsService = async (eid, eventRepo) => {
  if (!eid) {
    throw new BadRequestError("Event ID Missing");
  }
  const responseData = await eventRepo.seeEventParticipants(eid);

  if (responseData) {
    return responseData;
  } else {
    throw new InternalServerError(
      "Something went wrong while fetching event participants"
    );
  }
};
