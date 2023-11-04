const { google } = require('googleapis');
const { Readable } = require('stream');

import { googleAuth } from './googleAuthService';

let drive;
try {
    drive = google.drive({ version: 'v3', auth: googleAuth() });
} catch (error) {
    console.log(error.message);
    drive = null;
}

function getFolderID(folder) {
    const folderIDs = {
        gallery: process.env.GALLERY_FOLDER_ID,
        user: process.env.USER_FOLDER_ID,
        announcement: process.env.ANNOUNCEMENT_FOLDER_ID,
        profile_post: process.env.PROFILE_POST_FOLDER_ID,
    };

    return folderIDs[folder] || '';
}

async function uploadImage(folder, imageName, imageBuffer) {
    const folderID = getFolderID(folder);
    const fileMetadata = {
        name: `${imageName}`,
        parents: [folderID],
    };
    const media = {
        mimeType: 'image/jpeg',
        body: Readable.from(imageBuffer),
    };
    const image = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id',
    });

    return image.data.id;
}

export { uploadImage };
