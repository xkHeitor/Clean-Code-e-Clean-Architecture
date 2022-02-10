export default class Order {

   constructor (item: Item[],  cpf: Cpf, coupon: Coupon ) {}

}

export class Item {

	public description: string;
	public price: number;
	public quantity: number;

	constructor (description: string, price: number, quantity: number) {
		this.description = description;
		this.price = price;
		this.quantity = quantity;
	}

}

export class Cpf {

	public value: string;

	constructor (cpf: string) {
		if (cpf?.length < 11 || cpf?.length > 14) throw 'cpf size is invalid';
		this.value = cpf;
	}

	public validateCPF (): boolean|number {
		const cpfNumbers = this.removeString(this.value);
		if (cpfNumbers.length != 11) return false;
		const firstCheckDigit = this.calculateFirstCheckDigit(cpfNumbers);
		return firstCheckDigit;
	}

	private removeString(value: string):string {
		return value.replace(/\D/gim, '');
	}

	private inverterOrder(value:string): string {
		return value.split("").reverse().join("");
	}

	private calculateFirstCheckDigit (cpf: string): number {
		const numberOfDigits = 9;
		const multiplicationInitiationNumber = 2;
		const numbersToMultiply = this.inverterOrder(cpf.slice(0, numberOfDigits));		
		let response = 0		
		for(let count = 0; count < numberOfDigits; count++){
			response += (parseInt(numbersToMultiply[count]) * (multiplicationInitiationNumber + count));
		}

		return response;
	}

}

export class Coupon {

	public value: number;

	constructor (coupon: number) {
		this.value = coupon;
	}

}