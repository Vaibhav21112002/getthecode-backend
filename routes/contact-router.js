const express = require("express");
const router = express.Router();
const { sendMail } = require("../utils/NodeMailer");
const fetchUser = require("../middleware/login");

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  console.log(req.body);
  const mailOptions = {
    to: "guptavaibhav432@gmail.com",
    bcc: "guptavaibhav432@gmail.com",
    subject: "Contact Form",
    text: `Name: ${name} Email: ${email} Message: ${message}`,
    html: `
        <p>You have a new Contact Request</p>
        <h3>Contact Details</h3>
        <ul>  
          <li>Name: ${req.body.name}</li>
          <li>Email: ${req.body.email}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
      `,
  };
  console.log(mailOptions);
  const mail = sendMail(mailOptions);
  if (mail) {
    res.status(200).json({
      message: "Mail Sent",
    });
  } else {
    res.status(200).json({
      message: "Mail Not Sent",
    });
  }
});

module.exports = router;
