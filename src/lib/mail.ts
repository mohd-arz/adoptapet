import nodemailer from "nodemailer";

export async function sendMailUtils(
  subject: string,
  toEmail: string,
  txt: string,
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: "Admin <example@nodemailer.com>",
    to: toEmail,
    subject: subject,
    text: txt,
  };
  transporter.sendMail(mailOptions, function (error: Error | null, info) {
    if (error) {
      throw new Error(error.message);
    } else {
      console.log("Email Sent");
      return true;
    }
  });
}
