const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("../../../Model/dbconnect");

const UserSignup = async (req, res) => {
  const { name, email, phone_number, address, city_state, password } = req.body;

  if (!name || !email || !phone_number || !address || !city_state || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO user_signup (name, email, phone_number, address, city_state, password)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [name, email, phone_number, address, city_state, hashedPassword];

    connection.query(query, values, (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ message: "Email already exists." });
        }
        return res.status(500).json({ message: err.sqlMessage });
      }

      // JWT token
      const token = jwt.sign(
        { id: result.insertId, email },
        process.env.JWT_SECRET || "fallback_secret_key",
        { expiresIn: "1d" }
      );

      res.status(201).json({
        message: "User registered successfully",
        token,
      });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = UserSignup;
