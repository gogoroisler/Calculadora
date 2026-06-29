import { describe, it, expect } from "vitest";
import { Calculadora } from "./Calculadora.js";

const calc = new Calculadora();

describe("Calculadora - sumar", () => {
    it("suma dos positivos", () => expect(calc.sumar(2, 3)).toBe(5));
    it("suma con negativo", () => expect(calc.sumar(-1, 3)).toBe(2));
    it("suma con cero", () => expect(calc.sumar(0, 5)).toBe(5));
    it("suma decimales", () => expect(calc.sumar(0.1, 0.2)).toBeCloseTo(0.3));
});

describe("Calculadora - restar", () => {
    it("10 - 3 = 7 (bug corregido: orden de operandos)", () => expect(calc.restar(10, 3)).toBe(7));
    it("resultado negativo", () => expect(calc.restar(3, 10)).toBe(-7));
    it("resta con cero", () => expect(calc.restar(5, 0)).toBe(5));
});

describe("Calculadora - multiplicar", () => {
    it("multiplica dos positivos", () => expect(calc.multiplicar(3, 4)).toBe(12));
    it("multiplica por cero", () => expect(calc.multiplicar(5, 0)).toBe(0));
    it("multiplica negativos", () => expect(calc.multiplicar(-2, -3)).toBe(6));
});

describe("Calculadora - dividir", () => {
    it("divide correctamente", () => expect(calc.dividir(10, 2)).toBe(5));
    it("división por cero retorna 'Error'", () => expect(calc.dividir(5, 0)).toBe("Error"));
    it("división con decimal", () => expect(calc.dividir(1, 4)).toBe(0.25));
    it("dividir(10, 3) es correcto (bug corregido)", () => expect(calc.dividir(10, 3)).toBeCloseTo(3.333));
});
