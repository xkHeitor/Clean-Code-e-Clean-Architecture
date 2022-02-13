import { Cpf } from "./Order";

describe('CPF', () => {

    it('Should be valid the CPF', () => {
        const cpf = new Cpf('111.444.777-35');
        const isValid = cpf.validateCPF();
        expect(isValid).toBe(true);
    });

    it('Should be invalid the CPF', () => {
        const cpf = new Cpf('111.444.777-18');
        const isValid = cpf.validateCPF();
        expect(isValid).toBe(false);
    });

});