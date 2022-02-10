import { Cpf } from "./Order";

describe('CPF', () => {

    const standardCPF = '111.444.777-05';

    it('Should calculate the first digit', () => {
        const cpf = new Cpf(standardCPF);
        const firstCheckDigit = cpf.validateCPF();
        expect(firstCheckDigit).toBe(162);
    });

});