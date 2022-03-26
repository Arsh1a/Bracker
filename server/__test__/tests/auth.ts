import request from "supertest";
import app from "../../app";
import { userOne } from "../fixtures/fakeData";

describe("/api/auth", () => {
  describe("POST /api/auth/register", () => {
    it("Should register a user", async () => {
      await request(app).post("/api/auth/register").send(userOne).expect(200);
    });
  });

  describe("POST /api/auth/login", () => {
    it("Should login a user", async () => {
      await request(app).post("/api/auth/login").send(userOne).expect(200);
    });
  });
});
