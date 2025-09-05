const bcrypt = require("bcryptjs");
const connection = require("../../../Model/dbconnect"); 

const signup = async (req, res) => {
  const { ngo_name, email, phone_number, address, city_state, password } = req.body;

  if (!ngo_name || !email || !phone_number || !address || !city_state || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO ngo_signup (ngo_name, email, phone_number, address, city_state, password)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [ngo_name, email, phone_number, address, city_state, hashedPassword];

    connection.query(query, values, (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: "Email already exists." });
        }
        return res.status(500).json({ message: err.sqlMessage });
      }

      return res.status(201).json({ message: "NGO registered successfully" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = signup;
