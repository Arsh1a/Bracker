import request from "supertest";
import app from "../../app";
import { checkStatusCode } from "../config/checkStatusCode";
import { userOne } from "../fixtures/fakeData";

describe("/api/projects", () => {
  let cookie: string;
  beforeEach(async () => {
    await request(app)
      .post("/api/auth/login")
      .send(userOne)
      .expect(200)
      .then((res) => {
        const cookies = res.headers["set-cookie"][0]
          .split(",")
          .map((item: string) => item.split(";")[0]);
        cookie = cookies.join(";");
      });
  });

  describe("GET /api/projects", () => {
    it("Should Get all projects for a user", async () => {
      await request(app).get("/api/projects").set("Cookie", cookie);
      checkStatusCode(200);
    });
  });
});
