const nodemailer = require('nodemailer');

const sendOTP = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.SMTP_EMAIL, 
                pass: process.env.SMTP_PASSWORD, 
            },
        });

        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: email,
            subject: 'Verify your email',
            text: `Your OTP code is ${otp}`, // Corrected to use template string
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending OTP:', error);
        return false;
    }
};

module.exports = { sendOTP };
