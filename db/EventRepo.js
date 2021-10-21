import { tables } from "../types/Tables.js";

// Manages all the user related database operations
class EventRepo {
  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  // gets required event from the db using eid
  async getEvent(eid) {
    const event = await db(tables.EVENTS).where({ eid: eid }).first();
    return event;
  }

  // checks whether event exists in the events relation or not
  async checkEvent(name, hostname, starttime, endtime) {
    const event = await db(tables.EVENTS)
      .where({ name, hostname, starttime, endtime })
      .first();
    return event;
  }

  // gets events from the db
  async getEvents() {
    const event = await db(tables.EVENTS).select();
    return event;
  }

  async createEvent(event) {
    const response = await db(tables.EVENTS).insert(event).returning("*");
    return response;
  }

  // updates required event from the db
  async updateEvent(
    eventname,
    eventtype,
    location,
    startdate,
    enddate,
    description,
    contactnumber,
    host,
    eid
  ) {
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
  }
}

export default EventRepo;
