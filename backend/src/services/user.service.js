import { Users } from "../models/models";

async function getUserByUsername(username) {
    return await Users.where("username", username).first();
}

export { getUserByUsername };
