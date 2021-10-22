import supertest from "supertest";
import faker from "faker";
import AppManager from "../../Container/AppManager.js";

const app = AppManager().App;
const request = supertest(app);

describe("Tests all CRUD functions for user signup service ", () => {
	it("GET /api/events -> get list of valid events ", async () => {
		const response = await request
			.get("/api/events/")
			.expect("Content-Type", /json/)
			.expect(200);
		if (response.body && response.body.length > 0) {
			expect(response.body[0]).toEqual(
				expect.objectContaining({
					name: expect.any(String),
					hostname: expect.any(String),
					eid: expect.any(Number),
				})
			);
		}
	});

	//------------------------------------------------POST---------------------------------------
	it("POST /api/events -> create a new event without host name", async () => {
		// const hostname = faker.company.catchPhrase();
		const name = faker.commerce.productName();
		const response = await request
			.post("/api/events/")
			.send({ name })
			.expect("Content-Type", /json/)
			.expect(400);
	});

	it("POST /api/events -> create a new event without event name", async () => {
		const hostname = faker.company.catchPhrase();
		// const name = faker.commerce.productName();
		const response = await request
			.post("/api/events/")
			.send({ hostname })
			.expect("Content-Type", /json/)
			.expect(400);
	});

	it("POST /api/events -> create a new event without event name and host name", async () => {
		// const hostname = faker.company.catchPhrase();
		// const name = faker.commerce.productName();
		const response = await request
			.post("/api/events/")
			.send({})
			.expect("Content-Type", /json/)
			.expect(400);
	});

	it("POST /api/events -> create a new event", async () => {
		const hostname = faker.company.catchPhrase();
		const name = faker.commerce.productName();
		const response = await request
			.post("/api/events/")
			.send({ hostname, name })
			.expect("Content-Type", /json/)
			.expect(200);
		if (response.body && response.body.length > 0) {
			expect(response.body[0]).toEqual(
				expect.objectContaining({
					name: expect.any(String),
					hostname: expect.any(String),
					eid: expect.any(Number),
				})
			);
		}
	});
});

it("GET /api/events/:eid --> event found 200 ", async () => {
	// we are searching for event with eid
	const eid = 2;

	const response = await request
		.get(`/api/events/${eid}`)
		.expect("Content-Type", /json/)
		.expect(200);
});

it("GET /api/events/:eid --> event not found 404 ", async () => {
	// we are searching for event with eid
	const eid = -1;

	const response = await request
		.get(`/api/events/${eid}`)
		.expect("Content-Type", /json/)
		.expect(404);
});
