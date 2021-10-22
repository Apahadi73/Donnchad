// class EventRepoMock {
// 	constructor() {
// 		this.events = [
// 			{
// 				eid: 1,
// 				name: "National Pan-Hellenic Council Week: Field Game Day",
// 				hostname: "Greek Affairs",
// 				eventtype: null,
// 				location: "Patriot Plaza",
// 				starttime: "2021-10-20T22:00:00+00:00",
// 				endtime: "2021-10-21T01:00:00+00:00",
// 				description:
// 					'The National Pan-Hellenic Council is the organization that united the nine\nhistorically African American fraternities and sororities commonly known as the\n"Divine Nine". This event will give students the opportunity to network with\nmembers of NPHC organizations in a lightly competitive atmosphere. Food will be\nprovided to participants. ',
// 				contactnumber: null,
// 				imageurl:
// 					"https://uttyler.campuslabs.com/engage/image/7dc46c8b-0eb8-4b48-ba1a-6a841efd2115d59768c5-58c7-4541-a9e2-c42da539c7e3.png",
// 				cid: null,
// 				created_at: "2021-10-21T21:35:07.626Z",
// 				updated_at: "2021-10-21T21:35:07.626Z",
// 			},
// 			{
// 				eid: 2,
// 				name: "Paint Your Pride",
// 				hostname: "Liberty Landing",
// 				eventtype: null,
// 				location: "Liberty Landing Clubhouse",
// 				starttime: "2021-10-20T23:30:00+00:00",
// 				endtime: "2021-10-21T01:00:00+00:00",
// 				description:
// 					"October is LGBTQIA+ History Month! Come learn about the history of the alphabet\nmafia and their flags while creating a work of art with your pride flag of\nchoice. ",
// 				contactnumber: null,
// 				imageurl:
// 					"https://uttyler.campuslabs.com/engage/image/e71c7266-2ee4-427a-8d0d-9c5fe782e5fe14c3a62f-7ee9-4ab6-93b8-13f0b3726410.png",
// 				cid: null,
// 				created_at: "2021-10-21T21:35:07.636Z",
// 				updated_at: "2021-10-21T21:35:07.636Z",
// 			},
// 			{
// 				eid: 3,
// 				name: "Study Nights",
// 				hostname: "Greek Affairs",
// 				eventtype: null,
// 				location: "UC Ballroom",
// 				starttime: "2021-10-20T22:00:00+00:00",
// 				endtime: "2021-10-21T01:00:00+00:00",
// 				description:
// 					"Join the Office of Greek Affairs for Study Nights! Come work on homework,\nprojects, papers, or assignments. We will have areas for group and quiet study.\nWe will also have study snacks on hand so come by yourself or with a group. You\ncould also meet others in your class. All students are welcome, you don't have\nto be a fraternity or sorority member to participate. \n\nWe are also trying to get PASS tutors as a part of study nights. ",
// 				contactnumber: null,
// 				imageurl:
// 					"https://uttyler.campuslabs.com/engage/image/e57a9020-c5ff-4edf-a03b-45649635ba1a2534705a-48bc-4016-9b8f-1449f49de95d.png",
// 				cid: null,
// 				created_at: "2021-10-21T21:35:07.643Z",
// 				updated_at: "2021-10-21T21:35:07.643Z",
// 			},
// 			{
// 				eid: 4,
// 				name: "RUF Worship",
// 				hostname: "Reformed University Fellowship",
// 				eventtype: null,
// 				location: "STE 127",
// 				starttime: "2021-10-21T00:00:00+00:00",
// 				endtime: "2021-10-21T02:00:00+00:00",
// 				description:
// 					"A gathering of students to worship, study the bible and fellowship",
// 				contactnumber: null,
// 				imageurl:
// 					"https://uttyler.campuslabs.com/engage/image/a4056ee7-331c-4b5a-a4f7-8514e003c837a2dd1f16-3e71-424d-949c-cea2faf9a1df.png",
// 				cid: null,
// 				created_at: "2021-10-21T21:35:07.650Z",
// 				updated_at: "2021-10-21T21:35:07.650Z",
// 			},
// 			{
// 				eid: 5,
// 				name: "Tunes at Noon",
// 				hostname: "School of Performing Arts (Music)",
// 				eventtype: null,
// 				location: "Patriot Zone ",
// 				starttime: "2021-10-21T16:30:00+00:00",
// 				endtime: "2021-10-21T18:00:00+00:00",
// 				description:
// 					"Join the Swoop Jazz Collective in the Patriot Zone from 11:30-1:00 pm for a\nlunchtime concert!",
// 				contactnumber: null,
// 				imageurl:
// 					"https://uttyler.campuslabs.com/engage/image/88c2dba4-af41-4ff6-a9a1-dc868bc6a0ef7d992e20-8b7f-48c0-b6a2-fab57016224d.png",
// 				cid: null,
// 				created_at: "2021-10-21T21:35:07.656Z",
// 				updated_at: "2021-10-21T21:35:07.656Z",
// 			},
// 		];

// 		this.counter = this.events.length;
// 	}

// 	async checkEvent(name, hostname, starttime, endtime) {
// 		for (let event of this.events) {
// 			if (
// 				event.name == name &&
// 				event.hostname == hostname &&
// 				event.starttime == starttime &&
// 				event.endtime == endtime
// 			) {
// 				return event;
// 			}
// 		}
// 		return null;
// 	}

// 	async checkEventbyId(eid) {
// 		for (let event of this.events) {
// 			if (event.eid == eid) {
// 				return event;
// 			}
// 		}
// 		return [];
// 	}
// 	// gets events from the db
// 	async getEvents() {
// 		return this.events;
// 	}

// 	async createEvent(eventInfo) {
// 		eventInfo.eid = this.counter + 1;
// 		const event = this.events.push(eventInfo);
// 		return event;
// 	}
// }

class EventRepoMock {
	constructor() {}

	async getEvents() {}

	async createEvent(eventInfo) {}
}

export default EventRepoMock;
