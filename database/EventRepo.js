import { tables } from "../types/Tables.js";

// Manages all the user related database operations
class EventRepo {
	constructor(dbConnection) {
		this.dbConnection = dbConnection;
	}

	// checks whether event exists in the events relation or not
	async checkEvent(name, hostname, starttime, endtime) {
		const event = await this.dbConnection(tables.EVENTS)
			.where({ name, hostname, starttime, endtime })
			.first();
		return event;
	}

	// gets required event from the db using eid
	async checkEventbyId(eid) {
		const events = await this.dbConnection(tables.EVENTS)
			.where({ eid: eid })
			.select();
		return events.length > 0;
	}

	// gets required event from the db using eid
	async getEventbyId(eid) {
		const event = await this.dbConnection(tables.EVENTS)
			.where({ eid: eid })
			.first();
		return event;
	}

	// gets events from the db
	async getEvents() {
		const event = await this.dbConnection(tables.EVENTS).select();
		return event;
	}

	async createEvent(eventInfo) {
		const event = await this.dbConnection(tables.EVENTS)
			.insert(eventInfo)
			.returning("*");
		return event[0];
	}

	// updates required event from the db
	async updateEvent(eid, eventInfo) {
		const event = await this.dbConnection(tables.EVENTS)
			.where({ eid })
			.update(eventInfo)
			.returning("*");
		return event;
	}

	// deletes the event in the db
	async deleteUser(eid) {
		const event = await this.dbConnection(tables.EVENTS)
			.where({ eid: eid })
			.del();
		return event;
	}

	// determines whether user has already joined the event or not
	async checkEventParticipant(uid) {
		const events = await this.dbConnection(tables.PARTICIPANTS)
			.where({ uid: uid })
			.select();
		return events.length > 0;
	}

	// adds user to the event participants table
	async joinEvent(uid, eid, accessRole) {
		const event = await this.dbConnection(tables.PARTICIPANTS)
			.insert({ eid: eid, uid: uid, accessrole: accessRole })
			.returning("*");
		return event;
	}

	// fetches all the event participants
	async seeEventParticipants(eid) {
		const event = await this.dbConnection(tables.PARTICIPANTS)
			.join(
				tables.USERS,
				`${tables.USERS}.uid`,
				`${tables.PARTICIPANTS}.uid`
			)
			.select(`${tables.USERS}.firstname`, `${tables.USERS}.lastname`)
			.where({ eid: eid });
		return event;
	}

	// fetches recent 20 messages by event id
	async getChatMessages(eid) {
		const chats = await this.dbConnection(tables.MESSAGE)
			.where({ eid })
			.limit(10);
		return chats;
	}
}

export default EventRepo;
