import { BadRequestError, NotFoundError } from "../types/Errors.js";

// adds new message to the event
export const addMessageToEventService = async (message, messageRepo) => {
  const { eid, senderid, text } = message;
  if (eid && senderid && text) {
    const response = await messageRepo.addMessage(eid, senderid, text);
    return response;
  }
  throw new BadRequestError("Invalid message format.");
};
