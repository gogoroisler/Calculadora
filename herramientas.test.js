import { describe, it, expect } from "vitest";
import { calcularIVA, calcularDescuento, calcularInteresCompuesto } from "./herramientas.js";

describe("calcularIVA", () => {
    it("calcula IVA 21% sobre 1000", () => {
        const r = calcularIVA(1000, 21);
        expect(r.base).toBe(1000);
        expect(r.iva).toBe(210);
        expect(r.total).toBe(1210);
    });
    it("calcula IVA 10.5%", () => {
        const r = calcularIVA(1000, 10.5);
        expect(r.iva).toBe(105);
        expect(r.total).toBe(1105);
    });
    it("calcula IVA 27%", () => {
        const r = calcularIVA(1000, 27);
        expect(r.total).toBe(1270);
    });
    it("retorna null con monto cero", () => expect(calcularIVA(0, 21)).toBeNull());
    it("retorna null con monto negativo", () => expect(calcularIVA(-100, 21)).toBeNull());
    it("retorna null con monto no numérico", () => expect(calcularIVA("abc", 21)).toBeNull());
});

describe("calcularDescuento", () => {
    it("aplica descuento del 10%", () => {
        const r = calcularDescuento(100, 10);
        expect(r.descuento).toBe(10);
        expect(r.final).toBe(90);
    });
    it("descuento 0% no modifica el precio", () => {
        expect(calcularDescuento(500, 0).final).toBe(500);
    });
    it("descuento 100% da precio final cero", () => {
        expect(calcularDescuento(200, 100).final).toBe(0);
    });
    it("retorna null con descuento mayor a 100", () => expect(calcularDescuento(100, 110)).toBeNull());
    it("retorna null con precio cero", () => expect(calcularDescuento(0, 10)).toBeNull());
    it("retorna null con precio no numérico", () => expect(calcularDescuento("abc", 10)).toBeNull());
});

describe("calcularInteresCompuesto", () => {
    it("calcula monto final con capitalización anual", () => {
        const r = calcularInteresCompuesto(1000, 10, 1, 1);
        expect(r.montoFinal).toBeCloseTo(1100, 1);
    });
    it("calcula monto final con capitalización mensual", () => {
        const r = calcularInteresCompuesto(1000, 12, 1, 12);
        expect(r.montoFinal).toBeCloseTo(1126.83, 1);
    });
    it("el monto final es siempre mayor al capital", () => {
        const r = calcularInteresCompuesto(5000, 8, 3, 4);
        expect(r.montoFinal).toBeGreaterThan(r.capital);
    });
    it("la tabla tiene tantas filas como años (máx 20)", () => {
        expect(calcularInteresCompuesto(1000, 10, 5, 1).tabla).toHaveLength(5);
        expect(calcularInteresCompuesto(1000, 10, 30, 1).tabla).toHaveLength(20);
    });
    it("retorna null con tasa cero", () => expect(calcularInteresCompuesto(1000, 0, 5, 12)).toBeNull());
    it("retorna null con capital cero", () => expect(calcularInteresCompuesto(0, 10, 5, 12)).toBeNull());
    it("retorna null con años cero", () => expect(calcularInteresCompuesto(1000, 10, 0, 12)).toBeNull());
    it("retorna null con capital no numérico", () => expect(calcularInteresCompuesto("abc", 10, 5, 12)).toBeNull());
});
