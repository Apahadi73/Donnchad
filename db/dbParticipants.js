import db from "./db.js";
const DBEventParticipant = {
  joinEvent: async (uid, eid) => {
    const event = await db("events").where({ eid: eid }).update(uid, eid);
    return `User ${uid} joined event ${eid}`;
  },

  seeEventParticipants: async (eid) => {
    const event = await db("participants").where({ eid: eid }).select();
    return event;
  },
};
export default DBEventParticipant;
