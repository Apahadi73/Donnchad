import db from "./db.js";

const DBChat = {
  // gets required chat from the db
  createChat: async () => {
    const newChat = await db(tables.CHATS).insert({}).returning("*");
    const { cid } = newChat[0];
    return cid;
  },

  getChats: async (cid) => {
    const data = await db("chats").select();
    return data;
  },

  deleteChatbyID: async (cid) => {
    const user = await db(tables.CHATS).where({ cid: cid }).del();
    return user;
  },
};
export default DBChat;
