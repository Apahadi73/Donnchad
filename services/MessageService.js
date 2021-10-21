// import { DBMessage } from "../db/dbMessage.js";
// import { BadRequestError } from "../types/Errors.js";

// // adds new message to the event
// export const addMessageToEventService = async (message) => {
// 	const { eid, senderid, text } = message;
// 	const response = await DBMessage.addMessage(eid, senderid, text);
// 	return response;
// };

// // fetches all the messages of the event from db
// export const getMessagesService = async (eid) => {
// 	if (!eid) {
// 		throw new BadRequestError("No event id found. Please try again");
// 	}

// 	const response = await DBMessage.getChatMessages(eid);
// 	if (response) {
// 		return response;
// 	}

// 	return "No chat history found";
// };
