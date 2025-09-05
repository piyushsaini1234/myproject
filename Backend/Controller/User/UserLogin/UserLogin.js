const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("../../../Model/dbconnect");

const UserLogin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const query = `SELECT * FROM user_signup WHERE email = ?`;

  connection.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0) return res.status(401).json({ message: "Invalid email or password." });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password." });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "fallback_secret_key",
      { expiresIn: "1d" }
    );

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone_number,
      address: user.address,
      citystate: user.city_state,
    };

    res.status(200).json({
      message: "User login successful",
      token,
      user: userData,
    });
  });
};

module.exports = UserLogin;
