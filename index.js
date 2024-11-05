// server.js
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: 'https://mossii.com'
}));

app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Set up nodemailer transport
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL, // Your email
      pass: process.env.EMAIL_PASSWORD // Your email password
    }
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.RECEIVER_EMAIL, // The email where you want to receive submissions
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
    });
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
