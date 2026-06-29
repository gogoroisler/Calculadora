export function formatARS(valor) {
    return new Intl.NumberFormat("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valor);
}

export function calcularIVA(monto, alicuota) {
    const base = parseFloat(monto);
    if (isNaN(base) || base <= 0) return null;
    const iva = base * (alicuota / 100);
    return { base, iva, total: base + iva, alicuota };
}

export function calcularDescuento(precio, porcentaje) {
    const p = parseFloat(precio);
    const d = parseFloat(porcentaje);
    if (isNaN(p) || isNaN(d) || p <= 0 || d < 0 || d > 100) return null;
    const descuento = p * (d / 100);
    return { original: p, descuento, final: p - descuento, porcentaje: d };
}

export function calcularInteresCompuesto(capital, tasaAnual, anios, n) {
    const P = parseFloat(capital);
    const r = parseFloat(tasaAnual) / 100;
    const t = parseInt(anios);
    const nVal = parseInt(n);
    if ([P, r, t, nVal].some(isNaN) || P <= 0 || r <= 0 || t <= 0) return null;

    const montoFinal = P * Math.pow(1 + r / nVal, nVal * t);
    const interesTotal = montoFinal - P;
    const tabla = Array.from({ length: Math.min(t, 20) }, (_, i) => {
        const monto = P * Math.pow(1 + r / nVal, nVal * (i + 1));
        return { anio: i + 1, monto, interes: monto - P };
    });

    return { capital: P, montoFinal, interesTotal, tabla };
}
