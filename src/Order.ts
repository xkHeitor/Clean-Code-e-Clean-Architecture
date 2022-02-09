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
		if (cpf?.length >= 11 || cpf?.length <= 14) throw 'cpf size is invalid';
		this.value = cpf;
	}

}

export class Coupon {

	public value: number;

	constructor (coupon: number) {
		this.value = coupon;
	}

}