const db = require("../../../Model/dbconnect");
const multer = require('multer');
const path = require('path'); 


// ---------------- Create Profile ----------------
exports.createProfile = (req, res) => {
  const { name, email, phone, address, city, state } = req.body;
  const profile_image = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO admin_signup (name, email, phone, address, city, state, profile_image)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, email, phone, address, city, state, profile_image], (err, result) => {
    if (err) return res.status(500).json({ error: "Database insert error", details: err });

    res.json({
      message: "Profile created successfully",
      profileId: result.insertId,
    });
  });
};

// ---------------- Get Profile ----------------
exports.getProfile = (req, res) => {
  const AdminId = req.params.id;

  db.query(
    "SELECT id, name, email, phone, address, city, state, profile_image FROM admin_signup WHERE id = ?",
    [AdminId],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Database error", details: err });
      if (result.length === 0) return res.status(404).json({ error: "Profile not found" });

      res.json(result[0]);
    }
  );
};

// ---------------- Update Profile ----------------
exports.updateProfile = (req, res) => {
  const AdminId = req.params.id;
  const { name, email, phone, address, city, state } = req.body;
  const profile_image = req.file ? req.file.filename : null;

  let sql = `
    UPDATE admin_signup
    SET name=?, email=?, phone=?, address=?, city=?, state=? ${profile_image ? ", profile_image=?" : ""}
    WHERE id=?
  `;

  let values = [name, email, phone, address, city, state];
  if (profile_image) values.push(profile_image);
  values.push(AdminId);

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: "Update failed", details: err });
    res.json({ message: "Profile updated successfully" });
  });
};
