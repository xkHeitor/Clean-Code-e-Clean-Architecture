"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cpf_1 = __importDefault(require("../../src/domain/entity/Cpf"));
describe('CPF', () => {
    const cpfs = {
        sameDigits: '111.111.111-11',
        valid: '111.444.777-35',
        invalid: '111.444.777-18',
    };
    it('Should be valid the CPF', () => {
        const cpf = new Cpf_1.default(cpfs.valid);
        expect(cpf.getValue()).toBe(cpfs.valid);
    });
    it('Should be invalid the CPF', () => {
        expect(() => new Cpf_1.default(cpfs.invalid)).toThrow(new Error("CPF Inválido"));
    });
    it('Should be invalid the CPF with same digits', () => {
        expect(() => new Cpf_1.default(cpfs.sameDigits)).toThrow(new Error("CPF Inválido"));
    });
});
