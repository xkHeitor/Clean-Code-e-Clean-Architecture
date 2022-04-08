export default class Cpf {
 
	private value: string;
	private factors = {
		firstDigit: 10,
		secondDigit: 11,
	}

	constructor(value: string) {
		if (!this.validate(value)) throw new Error("CPF Inválido");
		this.value = value;
	}

    public getValue(): string {
		return this.value;
	}

	private validate(cpf: string): boolean {
		if (!cpf) 
            return false;
		
        cpf = this.removeMasks(cpf);
		if (!this.isValidLength(cpf) || this.hasAllDigitsEqual(cpf)) 
            return false;
            
		const digit1 = this.calculateDigit(cpf, this.factors.firstDigit);
		const digit2 = this.calculateDigit(cpf, this.factors.secondDigit);
		let checkDigit = this.extractCheckDigit(cpf);
		const calculatedDigit = `${digit1}${digit2}`;
		return checkDigit == calculatedDigit;
	}

	private removeMasks(cpf: string): string {
		return cpf.replace(/\D/gim, "");
	}

	private isValidLength(cpf: string): boolean {
		return cpf.length === 11;
	}

	private hasAllDigitsEqual (cpf: string): boolean {
		const [firstDigit] = cpf;
		return [...cpf].every(digit => digit === firstDigit);
	}

	private calculateDigit (cpf: string, factor: number): number {
        let result = 0;
		for (const digit of cpf) {
            if (factor > 1) result += parseInt(digit) * factor--;
		}
        const divider = 11;
        const remainingOfDivision = Math.trunc(result % divider);
		return remainingOfDivision < 2 ? 0 : Math.abs(divider - remainingOfDivision);
	}

	private extractCheckDigit (cpf: string): string {
		return cpf.slice(-2);
	} 

}