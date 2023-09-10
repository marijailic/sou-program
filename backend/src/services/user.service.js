const db = require("../db");

async function getUserByUsername(username) {
    return await db.select().from("user").where("username", username).first();
}

export { getUserByUsername };
