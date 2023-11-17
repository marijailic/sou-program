import db from '../db/connection.js';

/**
 * Returns the user with specified username. If not found returns null.
 * @param {string} username
 * @returns {object | null}
 */
export const getUserByUsername = async (username) => {
    try {
        return await db('user').where('username', username).first();
    } catch (error) {
        return null;
    }
};
