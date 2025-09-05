const db = require('../../Model/dbconnect');


const getAllUsers = (req, res) => {
  const sql = 'SELECT * FROM user_signup';

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching Users:", err);
      return res.status(500).json({ error: "Failed to fetch Users" });
    }
    res.json(results);
  });
};

module.exports = { getAllUsers };



