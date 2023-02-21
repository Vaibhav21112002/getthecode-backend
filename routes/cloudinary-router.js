const express = require("express");
const router = express.Router();

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "my-folder",
        allowedFormats: ["jpg", "png"],
    },
});

// Configure multer
const upload = multer({ storage });

// Route to upload a single image
router.post("/upload", (req, res) => {
    const image = req.body.image;
    cloudinary.uploader.upload(image, (err, result) => {
        if (err) {
            return res.status(500).json({ msg: "Failed to upload image" });
        }
        res.json({ public_id: result.public_id, url: result.secure_url });
    });
});

// Route to upload multiple images
router.post("/upload-multiple", upload.array("images"), (req, res) => {
    const { images } = req.body;
    const imagesUploaded = [];
    for (let i = 0; i < images.length; i++) {
        imagesUploaded.push(URL.createObjectURL(images[i]));
    }
    console.log(imagesUploaded)
    let imageArray = [];
    for (let i = 0; i < imagesUploaded.length; i++) {
        cloudinary.uploader.upload(imagesUploaded[i], (err, result) => {
            if (err) {
                return res.status(500).json({ msg: "Failed to upload image" });
            }
            imageArray.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        });
    }
    res.json({ images: imageArray });
});

module.exports = router;