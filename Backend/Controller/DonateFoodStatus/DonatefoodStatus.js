const connection = require("../../Model/dbconnect");

const getDonateFoodStatus = (req, res) => {
  const query = `
    SELECT 
      status, COUNT(*) as count 
    FROM donate_food 
    GROUP BY status
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching donate status count:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    // Create object like { Pending: 10, Completed: 5, "In Progress": 4 }
    const formatted = { Pending: 0, "In Progress": 0, Completed: 0 };
    results.forEach(row => {
      formatted[row.status] = row.count;
    });

    res.status(200).json(formatted);
  });
};

module.exports = { getDonateFoodStatus };
