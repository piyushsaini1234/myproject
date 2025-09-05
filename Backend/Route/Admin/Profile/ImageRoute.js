const express = require("express");
const {
  upload,
  uploadImage,
  fetchImage,
} = require("../../../Controller/Admin/Profile/imageController");

const router = express.Router();

// POST - Upload profile image
router.post("/", upload.single("image"), uploadImage);

// GET - Fetch latest image for specific admin
router.get("/", fetchImage);

module.exports = router;
