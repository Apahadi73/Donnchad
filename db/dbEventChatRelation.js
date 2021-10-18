import { tables } from "../types/Tables.js";
import db from "./db.js";
const DBEventChatRelation = {
  addChat: async (cid, eid) => {
    const chatInfo = await db(tables.EVENTCHATRELATION)
      .insert({ eid: eid, cid: cid })
      .returning("*");
    return chatInfo;
  },

  deleteChat: async (eid) => {
    const event = await db(tables.EVENTCHATRELATION)
      .where({ eid: eid, cid: cid })
      .del();
    return event;
  },
};
export default DBEventChatRelation;
