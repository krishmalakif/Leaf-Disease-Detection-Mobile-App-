import nodemailer from 'nodemailer';
import env, { isEmailConfigured } from '../Config/env.js';

let transporter;

const getTransporter = () => {
  if (!isEmailConfigured) {
    throw new Error('Email service is not configured. Set EMAIL_USER and EMAIL_PASS to enable password reset emails.');
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: env.emailUser,
        pass: env.emailPass,
      },
    });
  }

  return transporter;
};

export const sendEmail = async (to, subject, text) => {
  await getTransporter().sendMail({
    from: env.emailUser,
    to,
    subject,
    text,
  });
};
