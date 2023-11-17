import db from '../db/connection.js';

const ProfilePostModel = {
    getPaginatedProfilePosts: async (authorID, perPage, currentPage) => {
        return await db('profile_post')
            .where({ author_id: authorID })
            .orderBy('created_at', 'desc')
            .offset((currentPage - 1) * perPage)
            .limit(perPage);
    },

    getTotalPages: async (authorID, perPage) => {
        const profilePostCountObj = await db('profile_post')
            .where({ author_id: authorID })
            .count()
            .first();
        const profilePostCount = parseInt(profilePostCountObj['count']);
        return Math.ceil(profilePostCount / perPage);
    },

    createProfilePost: async (profilePostData) => {
        return await db('profile_post').insert(profilePostData);
    },

    updateProfilePost: async (profilePostID, authorID, profilePostData) => {
        return await db('profile_post')
            .where({ id: profilePostID, author_id: authorID })
            .update(profilePostData);
    },

    deleteProfilePost: async (profilePostID, authorID) => {
        return await db('profile_post')
            .where({ id: profilePostID, author_id: authorID })
            .del();
    },
};

export default ProfilePostModel;
