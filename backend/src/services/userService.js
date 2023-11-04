import db from "../db";

async function getUserByUsername(username) {
    return await db("user").where("username", username).first();
}

export { getUserByUsername };
