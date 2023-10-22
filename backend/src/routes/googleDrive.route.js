const express = require("express");
const router = express.Router();

const { google } = require("googleapis");

import { authMiddleware } from "../middlewares/auth.middleware";
import { googleAuth } from "../services/googleAuth.service";
import { uploadImage } from "../services/googleDrive.service";

let drive;
try {
    drive = google.drive({ version: "v3", auth: googleAuth() });
} catch (error) {
    console.log(error.message);
    drive = null;
}

router.use(express.raw({ limit: "30MB", type: "text/plain" }));

router.post(
    "/upload-image/:folder_name/:image_name",
    authMiddleware,
    async (req, res) => {
        const folderName = req.params.folder_name;
        const imageName = req.params.image_name;
        const imageBuffer = req.body;

        if (!imageBuffer) {
            res.status(400).json({ message: "Client error", data: {} });
        }

        try {
            googleAuth();

            const imageID = await uploadImage(
                folderName,
                imageName,
                imageBuffer
            );

            res.json({
                message: "Image uploaded successfully",
                data: imageID,
            });
        } catch (error) {
            console.log("Error:", error);
            res.status(500).json({
                message: "Internal server error",
                data: {},
            });
        }
    }
);

router.get("/image/:image_id", async (req, res) => {
    const imageID = req.params.image_id;
    try {
        googleAuth();
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            message: "Internal server error",
            data: {},
        });
    }
    let image = null;
    try {
        image = await drive.files.get(
            {
                fileId: imageID,
                alt: "media",
            },
            {
                responseType: "arraybuffer",
            }
        );
    } catch (error) {
        return res.json({
            message: "Image doesn't exist",
            data: "",
        });
    }

    try {
        const imageBuffer = Buffer.from(image.data);
        const imageBase64 = imageBuffer.toString("base64");

        res.json({
            message: "Image retrieved successfully",
            data: imageBase64,
        });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            message: "Internal server error",
            data: {},
        });
    }
});

module.exports = router;
