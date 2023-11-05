import { Users } from '../models/models';

export const getUserByUsername = async (username) => {
    return await Users().where('username', username).first();
};
