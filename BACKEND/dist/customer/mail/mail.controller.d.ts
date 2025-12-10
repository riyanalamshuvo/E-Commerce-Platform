import { MailService } from './mail.service';
export declare class MailController {
    private readonly mail;
    constructor(mail: MailService);
    sendMail(body: {
        to: string;
        subject: string;
        message: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
