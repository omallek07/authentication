import nodemailer from 'nodemailer';
import { BadRequestException } from '../cores/error.core';

class MailProvider {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  public async sendEmail({ from = 'admin@gmail.com', to, subject, html }: ISendEmailPayload) {
    try {
      return this.transporter.sendMail({
        from,
        to,
        subject,
        html
      });
    } catch (error) {
      throw new BadRequestException('Failed to send email. Please try again.');
    }
  }
}

export const mailProvider: MailProvider = new MailProvider();
