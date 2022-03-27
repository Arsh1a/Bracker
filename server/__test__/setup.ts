import db from "./config/db";

//Ignores console.logs from non-test files
jest.spyOn(global.console, "log").mockImplementation(() => jest.fn());

//Runs before all tests
beforeAll(async () => await db.connect());

//You can comment this out to see the database in action after test
//But dont forget to drop "brackertestingdb" database after test if you commented this out
afterAll(async () => await db.close());
