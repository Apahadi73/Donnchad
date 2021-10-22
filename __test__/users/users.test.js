import supertest from "supertest";
import faker from "faker";
import AppManager from "../../Container/AppManager.js";

const app = AppManager().App;
const request = supertest(app);

describe("Tests all CRUD functions for user service ", () => {
	let token =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjQsImVtYWlsIjoicmFuZG9tMUBwYXRyaW90cy51dHR5bGVyLmVkdSIsImlhdCI6MTYzNDU1NDE0NywiZXhwIjoxNjM0NjQwNTQ3fQ.wOazP2TDUra22uXCehX4ZpwS0nZc6pM5mVm-HuUw0vY";

	// SECTION : POST API
	it("POST /api/users/signup with missing email -> 400 ", async () => {
		// we are using faker dev dependency for fake username, password, and name
		const firstName = faker.name.firstName();
		const lastName = faker.name.lastName();
		// const email = `${firstName[0]}${lastName}@patriots.uttyler.edu`;
		const password = "password";
		const response = await request.post("/api/users/signup").send({
			firstName,
			lastName,
			// email,
			password,
		});
		expect(response.status).toBe(400);
	});

	it("POST /api/users/signup with wrong email address -> 400 ", async () => {
		const email = faker.internet.email().toLowerCase();
		const firstName = faker.name.firstName();
		const lastName = faker.name.lastName();
		const password = faker.internet.password();

		const response = await request.post("/api/users/signup").send({
			firstName,
			lastName,
			email,
			password,
		});
		expect(response.status).toBe(400);
	});

	it("POST /api/users/signup with missing password -> 400 ", async () => {
		const email = faker.internet.email().toLowerCase();
		const firstName = faker.name.firstName();
		const lastName = faker.name.lastName();
		// const password = faker.internet.password();

		const response = await request.post("/api/users/signup").send({
			firstName,
			lastName,
			email,
			//   password,
		});
		expect(response.status).toBe(400);
	});

	it("POST /api/users/signup with short password -> 400 ", async () => {
		const email = faker.internet.email().toLowerCase();
		const firstName = faker.name.firstName();
		const lastName = faker.name.lastName();
		const password = "123";

		const response = await request.post("/api/users/signup").send({
			firstName,
			lastName,
			email,
			password,
		});
		expect(response.status).toBe(400);
	});

	it("POST /api/users/signup -->  registers new user", async () => {
		// we are using faker dev dependency for fake username, password, and name
		const firstName = faker.name.firstName();
		const lastName = faker.name.lastName();
		const email = `${firstName[0]}${lastName}@patriots.uttyler.edu`;
		const password = "password";
		const phoneNumber = faker.phone.phoneNumber();

		const response = await request
			.post("/api/users/signup")
			.send({
				email,
				firstName,
				lastName,
				password,
				phoneNumber,
			})
			.expect("Content-Type", /json/)
			.expect(201);
		expect(response.body).toEqual(
			expect.objectContaining({
				uid: expect.any(Number),
				email: expect.any(String),
				token: expect.any(String),
			})
		);
	});

	it("POST /api/users/signup -->  user account already exists", async () => {
		// we are using faker dev dependency for fake username, password, and name
		const firstName = faker.name.firstName();
		const lastName = faker.name.lastName();
		const email = `${firstName[0]}${lastName}@patriots.uttyler.edu`;
		const password = "password";
		const phoneNumber = faker.phone.phoneNumber();

		const response = await request
			.post("/api/users/signup")
			.send({
				email,
				firstName,
				lastName,
				password,
				phoneNumber,
			})
			.expect("Content-Type", /json/)
			.expect(201);
		expect(response.body).toEqual(
			expect.objectContaining({
				uid: expect.any(Number),
				email: expect.any(String),
				token: expect.any(String),
			})
		);

		request
			.post("/api/users/signup")
			.send({
				email,
				firstName,
				lastName,
				password,
				phoneNumber,
			})
			.expect("Content-Type", /json/)
			.expect(400);
	});
});

it("GET /api/users/:uid --> user not found 404 ", async () => {
	// we are searching for user with uid
	const uid = -1;

	const response = await request
		.get(`/api/users/${uid}`)
		.expect("Content-Type", /json/)
		.expect(404);
});

it("GET /api/users/:uid --> user found 200 ", async () => {
	// we are searching for user with uid
	const uid = 1;

	const response = await request
		.get(`/api/users/${uid}`)
		.expect("Content-Type", /json/)
		.expect(200);
});

// it("GET /api/users --> users found 2 00 ", async () => {
// 	// we are searching for user with uid

// 	const response = await request
// 		.get(`/api/users`)
// 		.expect("Content-Type", /json/)
// 		.expect(400);
// });

// it("put /api/users/:uid --> user info missing 400 ", async () => {
// 	// we are updating user info with uid
// 	const uid = 1;

// 	const response = await request
// 		.put(`/api/users/${uid}`)
// 		.send()
// 		.expect("Content-Type", /json/)
// 		.expect(400);
// });

// it("put /api/users/:uid --> user upadted 200 ", async () => {
// 	// we are updating user info with uid
// 	const uid = 1;

// 	await request
// 		.put(`/api/users/${uid}`)
// 		.send({
// 			lastname: "Pahadi",
// 			phonenumber: "9035088589",
// 		})
// 		.expect("Content-Type", /json/)
// 		.expect(200);
// });

it("del /api/users/:uid --> user deleted 200 ", async () => {
	const uid = 1;

	await request
		.del(`/api/users/${uid}`)
		.expect("Content-Type", /json/)
		.expect(200);
});

it("del /api/users/:uid --> user not found 400 ", async () => {
	const uid = -1;

	await request
		.del(`/api/users/${uid}`)
		.expect("Content-Type", /json/)
		.expect(400);
});
