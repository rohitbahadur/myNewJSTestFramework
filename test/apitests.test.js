const supertest = require("supertest");

const host = "http://localhost:3000";
const request = supertest(host);

describe("Users Api Test Suit", () =>{
    it("should get all users", async () => {
        const response = await request.get("/users");
        //console.log(response.body);
        expect(response.statusCode).toBe(200);
    });

});