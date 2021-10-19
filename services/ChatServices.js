import DBChat from "../db/dbChat.js";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../types/Errors.js";

export const createChatService = async (message, chatID) => {
  const responseData = await DBChat.createChat(message, chatID);

  if (responseData) {
    return responseData;
  } else {
    throw new InternalServerError("Something went wrong while creating the");
  }
};

export const getChatsService = async () => {
  const responseData = await DBChat.getChats();

  if (responseData) {
    return responseData;
  } else {
    throw new InternalServerError("Something went wrong while creating the");
  }
};

export const deleteChatbyIDService = async (chatID) => {
  const responseData = await DBChat.deleteChatbyID(chatID);

  if (responseData) {
    return responseData;
  } else {
    throw new InternalServerError("Something went wrong while creating the");
  }
};
