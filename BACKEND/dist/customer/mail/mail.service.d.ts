import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private cfg;
    private transporter;
    private logger;
    constructor(cfg: ConfigService);
    sendMail(to: string, subject: string, html: string): Promise<any>;
}
