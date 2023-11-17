import bcrypt from 'bcrypt';
// import { hashPassword } from '../../services/authService'; // Module not found

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
    await knex('user').del();

    await knex('user').insert([
        {
            name: 'Nikola',
            surname: 'Tankovic',
            email: 'nikolatankovic@gmail.com',
            username: 'nikolatankovic',
            password: await bcrypt.hash('pass123', 8),
            profile_picture_key: null,
            bio: 'Moj bio.',
            type: 'demonstrator',
        },
    ]);
};
