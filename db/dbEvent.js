import pool from "../Configs/dbConfig.js";
import db from "./db.js";

const DBEvent = {
  // gets required user from the db
  getEvent: async (eid) => {
    const event = await db("events").where({ eid: eid }).select();
    return event;
  },

  createEvent: async ({
    name,
    description,
    location,
    phone,
    startDate,
    endDate,
    host,
    type,
  }) => {
    const data = {
      name,
      description,
      location,
      phone,
      startDate,
      endDate,
      host,
      type,
      eid: 12,
    };

    return data;
  },

  // updates required event from the db
  updateEventController: async ({
    name,
    description,
    location,
    phone,
    startDate,
    endDate,
    host,
    type,
    eid,
  }) => {
    const event = await db("events").where({ eid: eid }).update({
      name,
      description,
      location,
      phone,
      startDate,
      endDate,
      host,
      type,
    });
    return event;
  },

  joinEvent: async (uid, eid) => {
    // const event = await db("events").where({ eid: eid }).update(
    //   uid,eid
    // );
    return `User ${uid} joined event ${eid}`;
  },
};

export default DBEvent;
