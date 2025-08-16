const express = require('express');
const nodemailer = require('nodemailer');
const { getMaxListeners } = require('../models/User');
require('dotenv').config();

const router = express.Router();

router.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    // Create a transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Your Gmail email
            pass: process.env.EMAIL_PASS  // Your Gmail app password
        }
    });

    // Email content
    const mailOptions = {
        from: email,
        to: 'abhinavs.cs.22@nitj.ac.in',
        subject: 'New Contact Form Submission',
        text: `Hello Abhinav,\n\nYou have a new message from: \n\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n\nWe want to contact you.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending email' });
    }
});

module.exports = router;
