import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mail: MailService) {}

  @Post('send')
  async sendMail(
    @Body() body: { to: string; subject: string; message: string }
  ) {
    await this.mail.sendMail(body.to, body.subject, body.message);
    return { success: true, message: 'Email sent successfully!' };
  }
}
