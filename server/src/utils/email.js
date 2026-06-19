const nodemailer = require('nodemailer');

const sendContactEmail = async ({ name, email, subject, message }) => {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_EMAIL || 'oussamahatimofficiel@gmail.com';

  // If credentials are not set, log warning and skip sending
  if (!user || !pass) {
    console.warn(
      '⚠️ Email notification not sent: SMTP_USER and SMTP_PASS environment variables are not configured.'
    );
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports (587)
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${user}>`, // sender address (using auth user as sender to avoid SMTP rejection)
      replyTo: email, // reply-to user's email
      to,
      subject: `Portfolio Contact: ${subject || 'New Message'}`,
      text: `You have received a new message from your portfolio contact form.

Name: ${name}
Email: ${email}
Subject: ${subject || 'No Subject'}

Message:
${message}
`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #06b6d4; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Portfolio Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; border-left: 4px solid #06b6d4; margin-top: 20px;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="font-size: 11px; color: #999;">Sent automatically from your portfolio website.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Contact email sent successfully: ${info.messageId}`);
    return true;
  } catch (err) {
    console.error('❌ Failed to send contact email notification:', err);
    return false;
  }
};

module.exports = { sendContactEmail };
