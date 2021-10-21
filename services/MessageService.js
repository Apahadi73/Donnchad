import { DBMessage } from "../db/dbMessage.js";

export const addMessageToEvent = async (message) => {
  const { eid, senderid, text } = message;
  const response = await DBMessage.addMessage(eid, senderid, text);
  return response;
};
