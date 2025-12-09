import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter;
  private logger = new Logger(MailService.name);

  constructor(private cfg: ConfigService) {
    // create transport only if MAIL_* provided
    const host = cfg.get('MAIL_HOST');
    if (host) {
      this.transporter = nodemailer.createTransport({
        host,
        port: Number(cfg.get('MAIL_PORT') || 587),
        secure: false,
        auth: {
          user: cfg.get('MAIL_USER'),
          pass: cfg.get('MAIL_PASS'),
        },
      });
    }
  }

  async sendMail(to: string, subject: string, html: string) {
    if (!this.transporter) {
      this.logger.warn('Mail transporter not configured. Skipping sendMail.');
      return;
    }
    const info = await this.transporter.sendMail({
      from: `"No Reply" <${this.cfg.get('MAIL_USER')}>`,
      to,
      subject,
      html,
    });
    this.logger.log(`Mail sent: ${info.messageId}`);
    return info;
  }
}
