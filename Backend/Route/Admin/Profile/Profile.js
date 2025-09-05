const express = require("express");
const AdminProfileRouter = express.Router();
const multer = require("multer");
const path = require("path");

// Import controller functions
const profileController = require("../../../Controller/Admin/Profile/Profile");

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder where profile images are stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Routes
AdminProfileRouter.post(
  "/api/admin/profile",
  upload.single("profile_image"),
  profileController.createProfile
);

AdminProfileRouter.get(
  "/api/admin/profile/:id",   // <-- Added :id
  profileController.getProfile
);

AdminProfileRouter.put(
  "/api/admin/profile/:id",   // <-- Added :id
  upload.single("profile_image"),
  profileController.updateProfile
);

module.exports = AdminProfileRouter;
