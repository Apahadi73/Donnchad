import pool from "../Configs/dbConfig.js";
import db from "./db.js";

const DBEvent = {
  // gets required event from the db using eid
  getEvent: async (eid) => {
    const event = await db("events").where({ eid: eid }).select();
    return event;
  },
  // gets events from the db
  getEvents: async () => {
    const event = await db("events").select();
    return event;
  },

  createEvent: async (
    eventname,
    eventtype,
    location,
    startdate,
    enddate,
    description,
    contactnumber,
    host) => {
 const event = await db("events").insert({
  eventname:eventname,
  eventtype:eventtype,
  location:location,
  startdate:startdate,
  enddate:enddate,
  description:description,
  contactnumber:contactnumber,
  host:host
 }).returning("*");
    return event;
  },

  // updates required event from the db
  updateEvent: async ({
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
