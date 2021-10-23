import supertest from "supertest";
import faker from "faker";
import sinon from "sinon";
import bcrypt from "bcrypt";
import AppManager from "../../Container/AppManager.js";

let am = AppManager();
const app = am.App;
const request = supertest(app);

describe("Tests all CRUD functions for USER Service ", () => {
	let token =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjQsImVtYWlsIjoicmFuZG9tMUBwYXRyaW90cy51dHR5bGVyLmVkdSIsImlhdCI6MTYzNDU1NDE0NywiZXhwIjoxNjM0NjQwNTQ3fQ.wOazP2TDUra22uXCehX4ZpwS0nZc6pM5mVm-HuUw0vY";

	// ---------------------------------Authetication-------------------------------------------
	// ----sign up----
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

	// --------login user
	// SECTION : POST API
	it("POST /api/users/login with missing email -> 400 ", async () => {
		// we are using faker dev dependency for fake username, password, and name
		const firstName = faker.name.firstName();
		const lastName = faker.name.lastName();
		// const email = `${firstName[0]}${lastName}@patriots.uttyler.edu`;
		const password = "password";
		const response = await request.post("/api/users/login").send({
			firstName,
			lastName,
			// email,
			password,
		});
		expect(response.status).toBe(400);
	});

	it("POST /api/users/login with wrong email address -> 400 ", async () => {
		const email = faker.internet.email().toLowerCase();
		const firstName = faker.name.firstName();
		const lastName = faker.name.lastName();
		const password = faker.internet.password();

		const response = await request.post("/api/users/login").send({
			firstName,
			lastName,
			email,
			password,
		});
		expect(response.status).toBe(400);
	});

	it("POST /api/users/login with missing password -> 400 ", async () => {
		const email = faker.internet.email().toLowerCase();
		const firstName = faker.name.firstName();
		const lastName = faker.name.lastName();
		// const password = faker.internet.password();

		const response = await request.post("/api/users/login").send({
			firstName,
			lastName,
			email,
			//   password,
		});
		expect(response.status).toBe(400);
	});

	it("POST /api/users/login with short password -> 400 ", async () => {
		const email = faker.internet.email().toLowerCase();
		const firstName = faker.name.firstName();
		const lastName = faker.name.lastName();
		const password = "123";

		const response = await request.post("/api/users/login").send({
			firstName,
			lastName,
			email,
			password,
		});
		expect(response.status).toBe(400);
	});

	it("POST /api/users/login with valid email -> 400 ", async () => {
		const email = faker.internet.email().toLowerCase();
		const firstName = faker.name.firstName();
		const lastName = faker.name.lastName();
		const password = "123";

		var myStub = sinon
			.stub(bcrypt, "compare")
			.callsFake(() => Promise.resolve(true));

		const response = await request.post("/api/users/login").send({
			firstName,
			lastName,
			email,
			password,
		});
		expect(response.status).toBe(400);
		myStub.restore();
	});
});
