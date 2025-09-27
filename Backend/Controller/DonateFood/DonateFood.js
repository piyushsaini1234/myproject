

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

  connection.query(query, values, (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          error: "Duplicate entry: phone or email already exists.",
        });
      }
      return res.status(500).json({ error: err.sqlMessage });
    }

    // Respond to frontend immediately
    res.status(201).json({
      message: "Donation added successfully! Email will be sent shortly.",
      donationId: result.insertId,
    });

    // Send email in background (no await)
    if (email) {
      sendEmail({
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
      }).catch((err) => console.error("Email send failed:", err));
    }
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
