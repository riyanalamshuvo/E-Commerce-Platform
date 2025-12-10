declare const AdminJwtStrategy_base: new (...args: any) => any;
export declare class AdminJwtStrategy extends AdminJwtStrategy_base {
    constructor();
    validate(payload: any): Promise<{
        adminId: any;
        role: any;
    }>;
}
export {};
