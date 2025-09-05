const path = require("path");
const multer = require("multer");
const connection = require("../../../Model/dbconnect");

// ------------------ Multer Config ------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in uploads/
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});
const upload = multer({ storage });

// ------------------ Database Functions ------------------
// Save image in profile_images table
const addImage = (imageUrl, callback) => {
  connection.query(
    "INSERT INTO profile_images (image_url) VALUES (?)",
    [imageUrl],
    callback
  );
};

// Fetch latest uploaded image (since no admin_id exists)
const getLatestImage = (callback) => {
  connection.query(
    "SELECT * FROM profile_images ORDER BY created_at DESC LIMIT 1",
    callback
  );
};

// ------------------ Controller Functions ------------------
// Upload image controller
const uploadImage = (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const imageUrl = `/uploads/${req.file.filename}`;

  addImage(imageUrl, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: result.insertId, imageUrl });
  });
};

// Get latest image (since we don’t track adminId)
const fetchImage = (req, res) => {
  getLatestImage((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) {
      return res.status(404).json({ error: "No image found" });
    }
    res.json({ success: true, image: results[0] });
  });
};

module.exports = { upload, uploadImage, fetchImage };
