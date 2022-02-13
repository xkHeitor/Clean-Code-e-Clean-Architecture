export default class Order {

	constructor(item: Item[],  cpf: Cpf, coupon: Coupon ) {}
 
}
 
export class Item {
 
	public description: string;
	public price: number;
	public quantity: number;
 
	constructor(description: string, price: number, quantity: number) {
		this.description = description;
		this.price = price;
		this.quantity = quantity;
	}
 
}
 
export class Cpf {
 
	public value: string;
	readonly amountOfNumberToCalculate = {
		firstDigit: 9,
		secondDigit: 10,
	}

	constructor(cpf: string) {
		if (cpf?.length < 11 || cpf?.length > 14) throw 'cpf size is invalid';
		this.value = cpf;
	}
 
	public validateCPF(): boolean|number {
		const lastDigits = this.value.slice(-2);
		const digits = this.removeStringAndLastDigits(this.value);			
		const firstDigit = this.calculateDigit(digits, this.amountOfNumberToCalculate.firstDigit);
		const secondDigit = this.calculateDigit((digits + firstDigit), this.amountOfNumberToCalculate.secondDigit);
		return lastDigits == `${firstDigit}${secondDigit}`;
	}

	private calculateDigit(cpf: string, amountOfNumber: number): number {
		const divider = 11;
		const sumOfDigits = this.calculateTheSumOfDigits(cpf, amountOfNumber);
		const remainingOfDivision = Math.trunc(sumOfDigits % divider);
		return remainingOfDivision < 2 ? 0 : Math.abs(divider - remainingOfDivision);
	}
 
	private calculateTheSumOfDigits(digits: string, numberOfDigits: number): number {
		const multiplicationInitiationNumber = 2;
		const numbersToMultiply = this.inverterOrder(digits);		
		let firstDigit = 0		
		for(let count = 0; count < numberOfDigits; count++){
			firstDigit += (parseInt(numbersToMultiply[count]) * (multiplicationInitiationNumber + count));
		}
 
		return firstDigit;
	}

	private removeStringAndLastDigits(value: string): string {
		const numberOfDigitsToCalculate = 9;
		return value.replace(/\D/gim, '').slice(0, numberOfDigitsToCalculate);
	}
 
	private inverterOrder(value: string): string {
		return value.split("").reverse().join("");
	}
 
}
 
export class Coupon {
 
	public value: number;
 
	constructor(coupon: number) {
		this.value = coupon;
	}
 
}