"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cpf {
    constructor(value) {
        this.factors = {
            firstDigit: 10,
            secondDigit: 11,
        };
        if (!this.validate(value))
            throw new Error("CPF Inválido");
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    validate(cpf) {
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
    removeMasks(cpf) {
        return cpf.replace(/\D/gim, "");
    }
    isValidLength(cpf) {
        return cpf.length === 11;
    }
    hasAllDigitsEqual(cpf) {
        const [firstDigit] = cpf;
        return [...cpf].every(digit => digit === firstDigit);
    }
    calculateDigit(cpf, factor) {
        let result = 0;
        for (const digit of cpf) {
            if (factor > 1)
                result += parseInt(digit) * factor--;
        }
        const divider = 11;
        const remainingOfDivision = Math.trunc(result % divider);
        return remainingOfDivision < 2 ? 0 : Math.abs(divider - remainingOfDivision);
    }
    extractCheckDigit(cpf) {
        return cpf.slice(-2);
    }
}
exports.default = Cpf;
