import request from "supertest";
import app from "../app";
import User from "../models/userModel";
import { userOne } from "./fixtures/fakeData";
import mongoose from "mongoose";
import db from "./config/db";

beforeAll(async () => await db.connect());
// afterEach(async () => await db.clear());
afterAll(async () => await db.close());

describe("POST@/api/auth/register", () => {
  it("Should register a user", async () => {
    await request(app).post("/api/auth/register").send(userOne).expect(200);
  });
});

describe("POST@/api/auth/login", () => {
  it("Should login a user", async () => {
    await request(app).post("/api/auth/login").send(userOne).expect(200);
  });
});
