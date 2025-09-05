
const db = require('../../Model/dbconnect'); 

getAllNGOs = (req, res) => {
  const sql = 'SELECT * FROM ngo_Signup'; 
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch NGOs' });
    }
    res.json(results);
  });
};

module.exports = { getAllNGOs};





