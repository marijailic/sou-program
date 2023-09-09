const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../auth");

import { googleAuth } from "../services/googleAuth.service";
import { uploadImage } from "../services/googleDrive.service";

router.use(express.raw({ type: "text/plain" }));

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

module.exports = router;
