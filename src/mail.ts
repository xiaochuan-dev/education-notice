import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

export async function sendMail({ subject, html }) {
  const mailOptions = {
    from: `"auto sender" ${process.env.MAIL_USERNAME}`,
    to: process.env.MAIN_TO,
    subject,
    html,
  };
  try {
    const res = await transporter.sendMail(mailOptions);
    console.log('邮件发送成功');
  } catch (error) {
    console.log('邮件发送失败');
  }
}
