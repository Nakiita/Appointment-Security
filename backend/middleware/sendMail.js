const nodeMail = require('nodemailer');
 
exports.sendEmail = async (options) => {
    const transporter = nodeMail.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        },
        service: process.env.SMTP_SERVICE,
    });
    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    }
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Failed to send email:', error);
        throw error; // Optionally rethrow to handle the error further up the call stack
    }
}
 