import db from '../db/connection.js';

const AnnouncementModel = {
    getPaginatedAnnouncements: async (perPage, currentPage) => {
        return await db('announcement')
            .orderBy('created_at', 'desc')
            .offset((currentPage - 1) * perPage)
            .limit(perPage);
    },

    getTotalPages: async (perPage) => {
        const announcementCountObj = await db('announcement').count().first();
        const announcementCount = parseInt(announcementCountObj['count']);
        return Math.ceil(announcementCount / perPage);
    },

    createAnnouncement: async (announcementData) => {
        return await db('announcement').insert(announcementData);
    },

    updateAnnouncement: async (announcementID, announcementData) => {
        return await db('announcement')
            .where({ id: announcementID })
            .update(announcementData);
    },

    deleteAnnouncement: async (announcementID) => {
        return await db('announcement').where({ id: announcementID }).del();
    },
};

export default AnnouncementModel;
