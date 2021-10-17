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
    host
  ) => {
    const event = await db("events")
      .insert({
        eventname: eventname,
        eventtype: eventtype,
        location: location,
        startdate: startdate,
        enddate: enddate,
        description: description,
        contactnumber: contactnumber,
        host: host,
      })
      .returning("*");
    return event;
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
    const event = await db("events")
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
      })
      .returning("*");
    return event;
  },
};

export default DBEvent;
