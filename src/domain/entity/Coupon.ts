export default class Coupon {
    
    constructor(readonly code: string, readonly percentage: number, readonly expireDate?: Date) {}

    isExpired(today: Date = new Date()): boolean {
        if(!this.expireDate) return false;
        return this.expireDate.getTime() < today.getTime(); 
    }

    calculateDiscount(total: number): number {
        return (total * this.percentage) / 100;
    }
}