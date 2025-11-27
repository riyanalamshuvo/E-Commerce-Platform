declare const SellerJwtStrategy_base: new (...args: any) => any;
export declare class SellerJwtStrategy extends SellerJwtStrategy_base {
    constructor();
    validate(payload: any): Promise<{
        sellerId: any;
        role: any;
    }>;
}
export {};
