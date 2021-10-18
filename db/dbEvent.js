import { tables } from "../types/Tables.js";
import db from "./db.js";

const DBEvent = {
  // gets required event from the db using eid
  getEvent: async (eid) => {
    const event = await db(tables.EVENTS).where({ eid: eid }).select();
    return event;
  },
  // gets events from the db
  getEvents: async () => {
    const event = await db(tables.EVENTS).select();
    return event;
  },

  createEvent: async (event) => {
    const response = await db(tables.EVENTS).insert(event).returning("*");
    return response;
  },

  // updates required event from the db
  updateEvent: async (
    eventname,
    eventtype,
    location,
    startdate,
    enddate,
    description,
    contactnumber,
    host,
    eid
  ) => {
    const event = await db(tables.EVENTS)
      .where({ eid: eid })
      .update({
        eventname: eventname,
        eventtype: eventtype,
        location: location,
        startdate: startdate,
        enddate: enddate,
        description: description,
        contactnumber: contactnumber,
        host: host,
        eid: eid,
        cid: cid,
      })
      .returning("*");
    return event;
  },
};

export default DBEvent;
