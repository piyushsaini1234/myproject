const connection = require("../../Model/dbconnect");
const sendEmail = require("../../Services/EmailService"); // adjust path if needed

// POST Request (with email confirmation)
const postRequestFood = (req, res) => {
  const {
    id,
    full_name,
    phone_number,
    email,
    location_area,
    number_of_people,
    food_type,
    preferred_time,
    urgency_level,
    additional_notes,
    request_date,
    is_genuine,
  } = req.body;

  // Validation
  if (
    !full_name ||
    !phone_number ||
    !location_area ||
    !number_of_people ||
    !food_type ||
    !preferred_time ||
    !urgency_level ||
    !request_date
  ) {
    return res
      .status(400)
      .json({ message: "Please fill all required fields." });
  }

  // Check duplicate requests
  const duplicateQuery = `
    SELECT * FROM request_food 
    WHERE phone_number = ? AND request_date = ? 
    LIMIT 1
  `;

  connection.query(
    duplicateQuery,
    [phone_number, request_date],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });

      if (results.length > 0) {
        return res
          .status(409)
          .json({ message: "Duplicate request for same date." });
      }

      // Insert request
      const insertQuery = `
      INSERT INTO request_food (
        full_name,
        phone_number,
        email,
        location_area,
        number_of_people,
        food_type,
        preferred_time,
        urgency_level,
        additional_notes,
        request_date,
        is_genuine
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

      const values = [
        full_name,
        phone_number,
        email || null,
        location_area,
        number_of_people,
        food_type,
        preferred_time,
        urgency_level,
        additional_notes || null,
        request_date,
        is_genuine ? 1 : 0,
      ];

      // Make this callback async
      connection.query(insertQuery, values, async (err, result) => {
        if (err) {
          console.error("Insert Error:", err);
          return res.status(500).json({ message: "Database insert failed." });
        }

        // Send email confirmation (non-blocking)
        if (email) {
          try {
            await sendEmail({
              to: email,
              subject: " Your Food Request Has Been Received – Zero Hunger",
              text: `Dear ${full_name},

Thank you for reaching out to Zero Hunger. 🙏  
We have received your food request and our NGO partners are preparing to assist you.

📌 Request Summary:
- Name: ${full_name}
- Phone: ${phone_number}
- Email: ${email}
- Location: ${location_area}
- Food Type: ${food_type}
- Number of People: ${number_of_people}
- Preferred Time: ${preferred_time}
- Urgency Level: ${urgency_level}
- Request Date: ${request_date}

💡 Next Steps:
Our team will review your request and connect you with the nearest NGO partner. You will be contacted shortly with updates.

Together, we believe in building a world without hunger. 🌍💚  

Warm regards,  
The Zero Hunger Team  
support@zerohunger.org | www.zerohunger.org
`,
              html: `
              <div style="font-family: Arial, sans-serif; background: #f9fafb; padding: 25px; border-radius: 10px; color: #333;">
                <div style="text-align: center; padding-bottom: 15px;">
                  <img src="https://img.icons8.com/color/96/000000/meal.png" alt="Food Icon" style="width: 70px;"/>
                  <h2 style="color: #28a745; margin: 10px 0;">Request Confirmed!</h2>
                </div>

                <p style="font-size: 16px;">Dear <b>${full_name}</b>,</p>
                <p>
                  Thank you for reaching out to <b>Zero Hunger</b>. We have successfully received your request for food assistance.
                  Our NGO partners are already preparing to serve your needs. 💚
                </p>

                <h3 style="color: #444; margin-top: 20px;">📌 Request Details:</h3>
                <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
  <tr><td style="padding: 8px;"><b>Name:</b></td><td>${full_name}</td></tr>
  <tr style="background: #f1f1f1;"><td style="padding: 8px;"><b>Phone:</b></td><td>${phone_number}</td></tr>
  <tr><td style="padding: 8px;"><b>Email:</b></td><td>${email}</td></tr>
  <tr style="background: #f1f1f1;"><td style="padding: 8px;"><b>Location:</b></td><td>${location_area}</td></tr>
  <tr><td style="padding: 8px;"><b>Food Type:</b></td><td>${food_type}</td></tr>
  <tr style="background: #f1f1f1;"><td style="padding: 8px;"><b>People:</b></td><td>${number_of_people}</td></tr>
  <tr><td style="padding: 8px;"><b>Preferred Time:</b></td><td>${preferred_time}</td></tr>
  <tr style="background: #f1f1f1;"><td style="padding: 8px;"><b>Urgency:</b></td><td>${urgency_level}</td></tr>
  <tr>
    <td style="padding: 8px;"><b>Date:</b></td>
    <td>${(() => {
      const d = new Date(request_date);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    })()}</td>
  </tr>
</table>


                <p style="margin-top: 20px; font-size: 15px;">
                  🔔 <b>Next Steps:</b> Our team will connect you with the nearest NGO partner. 
                  You will be updated on the status of your request soon.
                </p>

                <div style="margin-top: 25px; padding: 15px; background: #e9f7ef; border-radius: 8px; text-align: center;">
                  <p style="margin: 0; font-size: 16px;">
                    🌍 Together, we can achieve <b>Zero Hunger</b>!  
                    Thank you for trusting us. 💚
                  </p>
                </div>

                <p style="margin-top: 30px; font-size: 14px; color: #777; text-align: center;">
                  With care,<br>
                  <b>The Zero Hunger Team</b><br>
                  📧 support@zerohunger.org | 🌐 <a href="https://www.zerohunger.org" style="color: #28a745; text-decoration: none;">www.zerohunger.org</a>
                </p>
              </div>
            `,
            });
          } catch (error) {
            console.error("Email Error:", error);
          }
        }

        return res
          .status(201)
          .json({ message: "Request submitted successfully" });
      });
    }
  );
};

// GET Request
const getRequestFood = (req, res) => {
  const query = "SELECT * FROM request_food ORDER BY ID ASC";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching request records:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res.status(200).json(results);
  });
};

module.exports = { postRequestFood, getRequestFood };
