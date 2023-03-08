import db from "../knexfile"

describe("DB setup",()=>{
    test("Connect to DB", async ()=>{
        const response = await db.raw("SELECT 1");
        expect(response).not.toBe(null);
    })
})