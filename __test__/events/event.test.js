import supertest from "supertest";
import faker from "faker";
import app from "../../app.js";

const request = supertest(app);

describe("Tests all CRUD functions for user signup service ", () => {
  it("GET /api/events -> get list of events ", async () => {
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
});
