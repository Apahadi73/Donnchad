import pool from "../Configs/dbConfig.js";

import db from "../db/db1.js";

const DBEvent = {
  // gets required user from the db
  getEvent: async (uid) => {
    const event = await db1("events").where({ uid: uid }).select();
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
      uid: 12,
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
    uid,
  }) => {
    const event = await db1("events").where({ uid: uid }).update({
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
};

export default DBEvent;
