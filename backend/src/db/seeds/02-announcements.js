function getRandomUserId(userIDs) {
    const randomIndex = Math.floor(Math.random() * userIDs.length);
    return userIDs[randomIndex];
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
    await knex('announcement').del();

    const userIDs = await knex('user').pluck('id');

    await knex('announcement').insert([
        {
            text: 'Announcement 1',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'Announcement 2',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'Announcement 3',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'Announcement 4',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'Announcement 5',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'Announcement 6',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'Announcement 7',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'Announcement 8',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'Announcement 9',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'Announcement 10',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'Announcement 11',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'Announcement 12',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'Announcement 13',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'Announcement 14',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'Announcement 15',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'Announcement 16',
            author_id: getRandomUserId(userIDs),
        },
    ]);
};
