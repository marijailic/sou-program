import db from '../db/connection.js';

const UserModel = {
    getAllUsers: async () => {
        return await db('user').select('*');
    },

    getUsersByIDs: async (userIDs) => {
        return await db('user').whereIn('id', userIDs);
    },

    createUser: async (userData) => {
        return await db('user').insert(userData);
    },

    updateUser: async (userID, userData) => {
        return await db('user').where({ id: userID }).update(userData);
    },

    deleteUser: async (userID) => {
        return await db('user').where({ id: userID }).del();
    },
};

export default UserModel;
