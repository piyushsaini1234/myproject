const bcrypt = require("bcryptjs");
const connection = require("../../../Model/dbconnect"); 

const AdminSignup = async (req, res) => {
  const { name, email, phone_number, address, city_state, password } = req.body;

  if (!name || !email || !phone_number || !address || !city_state || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO Admin_Signup (name, email, phone_number, address, city_state, password)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [name, email, phone_number, address, city_state, hashedPassword];

    connection.query(query, values, (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: "Email already exists." });
        }
        return res.status(500).json({ message: err.sqlMessage });
      }

      return res.status(201).json({ message: "User registered successfully" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = AdminSignup;
