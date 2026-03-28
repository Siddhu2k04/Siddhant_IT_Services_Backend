const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/send-email", async (req, res) => {
  const { email, name, githubLink, projectName } = req.body;

  console.log("SEND EMAIL API HIT");
console.log("BODY:", req.body);

  // ✅ validation
  if (!email || !githubLink) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: `Access Your Project: ${projectName}`,
      html: `
        <h2>Hello ${name},</h2>
        <p>✅ Payment successful!</p>
        <a href="${githubLink}" 
        style="background:#4CAF50;color:white;padding:10px 15px;text-decoration:none;border-radius:5px;">
          🚀 Access Project
        </a>
        <br/><br/>
        <p>${githubLink}</p>
      `,
    });

    res.status(200).json({ success: true, message: "Email sent" });

  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;