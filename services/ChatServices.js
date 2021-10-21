import DBChat from "../db/dbChat.js";
import {
	BadRequestError,
	InternalServerError,
	NotFoundError,
} from "../types/Errors.js";

export const createChatService = async () => {
	const responseData = await DBChat.createChat();

	if (responseData) {
		return "Chat created successfully";
	} else {
		throw new InternalServerError(
			"Something went wrong while creating the chat"
		);
	}
};

export const getChatsService = async (cid) => {
	const responseData = await DBChat.getChats(cid);

	if (responseData) {
		return responseData;
	} else {
		throw new InternalServerError(
			"Something went wrong while creating the chat"
		);
	}
};

export const deleteChatbyIDService = async (cid) => {
	const responseData = await DBChat.deleteChatbyID(cid);

	if (responseData) {
		return responseData;
	} else {
		throw new InternalServerError(
			"Something went wrong while creating the chat"
		);
	}
};
