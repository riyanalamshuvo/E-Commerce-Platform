import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';

@Module({
  imports: [ConfigModule],
  providers: [MailService],
  controllers: [MailController],  // <-- Add this line
  exports: [MailService],
})
export class MailModule {}
