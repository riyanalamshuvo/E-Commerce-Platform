// src/seller/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendApprovalMail(email: string, name: string, shopName: string) {
    await this.transporter.sendMail({
      from: '"E-Shop" <no-reply@eshop.com>',
      to: email,
      subject: '🎉 Your Shop is Approved!',
      html: `
        <h2>Congratulations ${name}!</h2>
        <p>Your shop <strong>${shopName}</strong> has been approved.</p>
        <p>You can now add products and start selling!</p>
        <p>Thank you for joining us!</p>
      `,
    });
  }

  async sendRejectionMail(email: string, name: string, reason: string) {
    await this.transporter.sendMail({
      from: '"E-Shop" <no-reply@eshop.com>',
      to: email,
      subject: 'Sorry, Your Shop Was Rejected',
      html: `
        <h2>Hi ${name},</h2>
        <p>Your shop registration was rejected.</p>
        <p><strong>Reason:</strong> ${reason || 'Not specified'}</p>
        <p>Please fix the issues and try again.</p>
      `,
    });
  }
}