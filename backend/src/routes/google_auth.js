import { google } from 'googleapis';
import dotenv from 'dotenv';
import fs from 'fs';
import express from 'express';
import multer from 'multer';

const upload = multer({
    limits: { fileSize: 5 * 1024 * 1024 },  // 5 MB
});

const { authMiddleware } = require("../auth");

const app = express.Router();

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

try {
    const creds = fs.readFileSync('creds.json');
    oauth2Client.setCredentials(JSON.parse(creds));
    // oauth2Client.setCredentials({
    //   "access_token": "ya29.a0AfB_byDKzxPXz3mVTGMKbEYD0PTpsOBUBvvIxLtLa77LxXMEPXjJTqVNzT4gA5bCPfsPb3USHRo3vdTPUuQQVGNtZr1zFIKkTAPjdKTdlcMRMVOmiKk8o-kZxyVR4FSyBAKHRueAP37977TI8uj77yZ__Der5gCMRIFMYAaCgYKAR4SARASFQHsvYlsOIYn6uVAQ1JUfb-89QVBiw0173",
    //   "refresh_token": "1//09xjSbnGGoOMCCgYIARAAGAkSNwF-L9IrXbozsaoyBikxscZ96Ke_XRcc1zBzpSiceboiLVmo19bSGLCMqmuOb3mGJwaZxqqzE3g",
    //   "scope":"https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/userinfo.profile",
    //   "token_type": "Bearer",
    //   "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImMzYWZlN2E5YmRhNDZiYWU2ZWY5N2U0NmM5NWNkYTQ4OTEyZTU5NzkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2MDgzNDExMzE3OTctNGtkOG0yMHN1NzRudGhyY2lyNW1kZTIxMHI0bDR1dG0uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2MDgzNDExMzE3OTctNGtkOG0yMHN1NzRudGhyY2lyNW1kZTIxMHI0bDR1dG0uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTA5MjI0OTczMTk1ODUyNDIwNzkiLCJhdF9oYXNoIjoiTXB1MnhfbGpQN09DM2xrQnMxNDg5dyIsIm5hbWUiOiLFoG91IFByb2dyYW0iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0Y0FTSy1BeTl1bUotZnVVdWFfcG1vdThUdVh4U2ZvcWxPb1RFRElVcGVlOUE9czk2LWMiLCJnaXZlbl9uYW1lIjoixaBvdSIsImZhbWlseV9uYW1lIjoiUHJvZ3JhbSIsImxvY2FsZSI6ImhyIiwiaWF0IjoxNjkyNzg1NzI5LCJleHAiOjE2OTI3ODkzMjl9.HbDIAOuSvmIG0LtXPlGSDxKJbxhmR0aHRUkIAQp4_NCMLPPYQxedvfnlF2YvRHni2xT_qP1VtsZxtx-JG-6ilnyHUpSp0R2iWuu9mWaDTxdj-wtfKvRYkjJSIC9zuXmZ60e5JHDWiH9C1CyEA080GW5svvwKerHE2_jSboDtj6rcPOUpYJYqV5Y-uAfayXGcVTJfoX35Hu966GZj61lFYhqsIAyeLaj-DcJp-twT23dOatYH_kM-smqPZN5EtfbrcU_npHTDxNuhjHT2tZI2-pgTFLRX0OmxaRILirhBfVj-UiMeNsYV8DIPfod87oQX6g0l2RQ7jUNZfp4bWXECoQ",
    //   "expiry_date":1692789321232
    // })
} catch {
    console.log("No credentials found.");
}

const drive = google.drive({ version: "v3", auth: oauth2Client });

app.get("/auth/google", async (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/drive",
        ]
    });
    res.redirect(url);
});

app.get("/google/redirect", async (req, res) => {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    fs.writeFileSync('creds.json', JSON.stringify(tokens));
    res.send("Success");
});

app.post("/upload/folder/:folder_name/:image_name", upload.single("file"), authMiddleware, async (req, res) => {
    try {
        console.log(req.headers)
        const file = req.file;
        const folder_name = req.params.folder_name
        const imageName = req.params.image_name

        if (!file) {
            return res.status(400).send('No file uploaded.');
        }

        console.log(`Buffer size: ${Buffer.from(file.buffer).length} bytes`);

        const imageId = await sendImage(folder_name, imageName, Buffer.from(file.buffer))

        res.json({
            message: "Image uploaded successfully",
            data: imageId
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get("/image/:id", async (req, res) => {
    try {
        const fileId = req.params.id;

        const response = await drive.files.get({
            fileId,
            alt: "media"
        }, {
            responseType: "arraybuffer"
        });

        const buffer = Buffer.from(response.data);

        const base64image = buffer.toString('base64');

        res.json({
            message: "Image retrieved successfully",
            data: base64image
        })
    } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 404) {
            return res.status(404).send({
                message: "Image not found"
            })
        }
        res.status(500).send('Internal Server Error');
    }
});

function getFolderId(folder) {
    let folderId = "";
    if (folder == "gallery") {
        folderId = process.env.GALLERY_FOLDER_ID
    }
    else if (folder == "user") {
        folderId = process.env.USER_FOLDER_ID
    }
    else if (folder == "announcement") {
        folderId = process.env.ANNOUNCEMENT_FOLDER_ID
    }
    else if (folder == "profile_post") {
        folderId = process.env.PROFILE_POST_FOLDER_ID
    }
    return folderId;
}

/**
 * Search file in drive location
 * @return{obj} data file
 * */
async function getImages(folder) {
    const files = [];
    const folderId = getFolderId(folder);

    try {
        const res = await drive.files.list({
            q: 'mimeType=\'image/jpeg\'',
            fields: 'nextPageToken, files(id, name)',
            spaces: folderId,
        });
        Array.prototype.push.apply(files, res.files);
        res.data.files.forEach(function (file) {
            console.log('Found file:', file.name, file.id);
        });
        return res.data.files;
    } catch (err) {
        throw err;
    }
}

async function getOneImage(imageId) {
    // example: 1kGbRhTTxYEkZUmG99XdWFaMyVZRh9bZ2
    try {
        const res = await drive.files.get(imageId);
        return res.data;
    } catch (err) {
        throw err;
    }
}

async function sendImage(folder, imageName, imageBuffer) {
    let folderId = getFolderId(folder);
    try {
        const requestBody = {
            name: `${imageName}.jpg`,
            mimeType: "image/jpeg",
            parents: [folderId],
        }
        const media = {
            mimeType: "image/jpeg",
            body: imageBuffer
        }
        const res = await drive.files.create({ requestBody, media });

        return res.data.id;
    } catch (err) {
        throw err;
    }
}

module.exports = app;
