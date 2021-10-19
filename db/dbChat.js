import pool from "../Configs/dbConfig.js";
import db from "./db.js";

const DBChat = {
  // gets required chat from the db
  createChat: async (message, chatID) => {
    const data = {
      message,
      chatID,
    };

    return data;
  },

  getChats: async () => {
    const data = await db("chats").select();
    return data;
  },

  deleteChatbyID: async (chatID) => {
    const data = await db("chats").where({ chatID: chatID }).delete();
    return "Chat successfully deleted";
  },
};
export default DBChat;
