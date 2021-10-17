import { tables } from "../types/Tables.js";
import db from "./db.js";
const DBEventParticipant = {
  joinEvent: async (uid, eid, accessRole) => {
    const event = await db(tables.PARTICIPANTS)
      .insert({ eid: eid, uid: uid, accessrole: accessRole })
      .returning("*");
    return event;
  },

  seeEventParticipants: async (eid) => {
    const event = await db(tables.PARTICIPANTS).where({ eid: eid }).select();
    return event;
  },
};
export default DBEventParticipant;
