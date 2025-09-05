const connection = require("../../Model/dbconnect");
const sendEmail = require("../../Services/EmailService");

const postDonateFood = (req, res) => {
  const {
    id,
    full_name,
    phone_number,
    email,
    pickup_address,
    food_type,
    item,
    quantity,
    pickup_time,
    date,
    confirm_fresh,
  } = req.body;

  const query = `
    INSERT INTO donate_food (
      id,
      full_name,
      phone_number,
      email,
      pickup_address,
      food_type,
      item,
      quantity,
      pickup_time,
      date,
      confirm_fresh
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    id,
    full_name,
    phone_number,
    email,
    pickup_address,
    food_type,
    item,
    quantity,
    pickup_time,
    date,
    confirm_fresh,
  ];

  connection.query(query, values, async (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .json({ error: "Duplicate entry: phone or email already exists." });
      }
      return res.status(500).json({ error: err.sqlMessage });
    }

    ////////////Send confirmation email to user////////////
    if (email) {
      await sendEmail({
        to: email,
        subject: "🌟 Thank You for Your Donation – Zero Hunger",
        text: `Hi ${full_name},

    Thank you for your generous donation of ${quantity} plates of ${food_type}.
    Your contribution will directly help feed families in need.

    Donation Details:
    - Donor Name: ${full_name}
    - Food Type: ${food_type}
    - Quantity: ${quantity} plates
    - Date: ${new Date().toLocaleDateString()}

    We truly appreciate your kindness and support towards achieving Zero Hunger. 
    Together, we are making a difference!

    Best regards,  
    Zero Hunger Team
    `,
        html: `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <h2 style="color: #28a745;">🌟 Thank You, ${full_name}!</h2>
        <p>
          We truly appreciate your generous donation of 
          <b>${quantity}</b> plates of <b>${food_type}</b> Food. 
        </p>
        
        <h3 style="margin-top: 20px; color: #444;">🍽 Donation Details:</h3>
        <ul style="line-height: 1.6;">
    <li><b>Donor Name:</b> ${full_name}</li>
    <li><b>Food Type:</b> ${food_type}</li>
    <li><b>Quantity:</b> ${quantity} plates</li>
    <li><b>Date:</b> ${(() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  })()}</li>
</ul>

        <p style="margin-top: 20px;">
          Your contribution will directly help families in need. 
          Together, we are moving one step closer to a world with <b>Zero Hunger</b>. 💚
        </p>

        <p style="margin-top: 30px; font-size: 14px; color: #777;">
          With gratitude,<br>
          <b>The Zero Hunger Team</b><br>
          📧 support@zerohunger.org | 🌐 www.zerohunger.org
        </p>
      </div>
    `,
      });
    }

    return res.status(201).json({
      message: "Donation added successfully and email sent!",
      donationId: result.insertId,
    });
  });
};

// GET method
const getDonateFood = (req, res) => {
  const query = "SELECT * FROM donate_food ORDER BY date ASC";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching donation records:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res.status(200).json(results);
  });
};

module.exports = { postDonateFood, getDonateFood };
