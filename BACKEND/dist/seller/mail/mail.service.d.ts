export declare class MailService {
    private transporter;
    sendApprovalMail(email: string, name: string, shopName: string): Promise<void>;
    sendRejectionMail(email: string, name: string, reason: string): Promise<void>;
}
