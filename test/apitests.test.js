const supertest = require("supertest");

const host = "http://localhost:3000";
const request = supertest(host);


const mockedUsers = [
    {
        id : 1,
        name : "john smith",
        email : "john@yahoo.com",
        department : "marketing" 
    },
    {
        id :2,
        name : "eam lin",
        email : "ma@yahoo.com",
        department : "sales" 
    },
    {
        id : 3,
        name : "Yohana",
        email : "Yoh@yahoo.com",
        department : "Temp" 
    },
    {
        id :4,
        name : "Lee",
        email : "lee@yahoo.com",
        department : "Admin" 
    }
]

describe("Users Api Test Suit", () =>{

    jest.setTimeout(10000);

    it("should get all users", async () => {
        const response = await request.get("/users");
        //console.log(response.body);
        expect(response.statusCode).toBe(200);
        expect(response.body).not.toBeNull();
        expect(response.body).toEqual(mockedUsers);
    });

    it("should get single user by id", async () => {
        const response = await request.get("/users/4");
        expect(response.statusCode).toBe(200);
        expect(response.body[0].name).toContain("Lee");
        expect(response.body[0].department).toEqual("Admin");
    });
    
    it("create a user", async () => {
        //get the initia count of users
        const users = await request.get("/users/");
        const countBeforeANewUserIsCreated = users.body.length;

        const response = await request.post("/users/").send({
            name: "ivan young",
            email: "ivan@gmail.com",
            department : "research"
        })
        
        //assert

        expect(response.statusCode).toBe(201);
        expect(response.body.length).toBe(countBeforeANewUserIsCreated + 1)
        console.log(response.body.length);
    });
    
    it("should delete a single user by id", async () => {
        const response = await request.delete("/users/2");
        expect(response.statusCode).toBe(200);
        
        //check if the user is actually deleted
        
        response.body.users.forEach(user =>{
            if(user.name === "eam lin"){
                throw new Error("User was not deleted successfully");
            }
        });

    });
    
    // error cases
    it("should return 404 for invalid user id", async () => {
        const response = await request.get("/users/x");
        expect(response.statusCode).toBe(404);
        
    });

    it("should return 404 updating user with invalid id", async () => {
        const response = await request.put("/users/x").send({
            department : "design"
        })
        expect(response.statusCode).toBe(404);
        
    });

    it("should return 404 creating user with invalid body", async () => {
        const response = await request.post("/users/").send({
            abcd : "test"
        })
        expect(response.statusCode).toBe(400);
        
    });
});