import Cpf from "../../src/domain/entity/Cpf";

describe('CPF', () => {

    const cpfs = {
        sameDigits: '111.111.111-11',
        valid: '111.444.777-35',
        invalid: '111.444.777-18',
    };

    it('Should be valid the CPF', () => {
        const cpf = new Cpf(cpfs.valid);
        expect(cpf.getValue()).toBe(cpfs.valid);
    });

    it('Should be invalid the CPF', () => {
        expect(() => new Cpf(cpfs.invalid)).toThrow(new Error("CPF Inválido"));
    });

    it('Should be invalid the CPF with same digits', () => {
        expect(() => new Cpf(cpfs.sameDigits)).toThrow(new Error("CPF Inválido"));
    });

});