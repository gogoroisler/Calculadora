import { Display } from "./Display.js";
import { formatARS, calcularIVA, calcularDescuento, calcularInteresCompuesto } from "./herramientas.js";

// ── Calculadora ──

const displayAnterior = document.getElementById("anterior");
const displayActual = document.getElementById("posterior");
const historialEl = document.getElementById("historial-lista");
const botonesNumeros = document.querySelectorAll(".number");
const botonesOperadores = document.querySelectorAll(".operator");

const display = new Display(displayAnterior, displayActual, historialEl);

botonesNumeros.forEach(boton => {
    boton.addEventListener("click", () => display.agregarNumero(boton.innerHTML));
});

botonesOperadores.forEach(boton => {
    boton.addEventListener("click", () => display.computar(boton.value));
});

document.getElementById("btn-clear").addEventListener("click", () => display.borrarTodo());
document.getElementById("btn-borrar").addEventListener("click", () => display.borrar());
document.getElementById("btn-csv").addEventListener("click", () => display.descargarCSV());
document.getElementById("btn-limpiar-historial").addEventListener("click", () => display.limpiarHistorial());

document.addEventListener("keydown", (e) => {
    if (document.activeElement.tagName === "INPUT") return;
    if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
        display.agregarNumero(e.key);
    } else if (e.key === "+") {
        display.computar("sumar");
    } else if (e.key === "-") {
        display.computar("restar");
    } else if (e.key === "*") {
        display.computar("multiplicar");
    } else if (e.key === "/") {
        e.preventDefault();
        display.computar("dividir");
    } else if (e.key === "Enter" || e.key === "=") {
        display.computar("igual");
    } else if (e.key === "Escape") {
        display.borrarTodo();
    } else if (e.key === "Backspace") {
        display.borrar();
    }
});

// ── Tema claro / oscuro ──

const btnTema = document.getElementById("btn-tema");
btnTema.textContent = document.documentElement.dataset.theme === "light" ? "🌙" : "☀️";

btnTema.addEventListener("click", () => {
    const actual = document.documentElement.dataset.theme;
    const nuevo = actual === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = nuevo;
    localStorage.setItem("tema", nuevo);
    btnTema.textContent = nuevo === "light" ? "🌙" : "☀️";
});

// ── Tabs ──

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".modo-panel");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("activo"));
        panels.forEach(p => p.classList.remove("activo"));
        tab.classList.add("activo");
        document.getElementById(`panel-${tab.dataset.modo}`).classList.add("activo");
    });
});

// ── Herramienta: IVA ──

document.querySelectorAll(".btn-iva").forEach(btn => {
    btn.addEventListener("click", () => {
        const resultado = calcularIVA(
            document.getElementById("iva-monto").value,
            parseFloat(btn.dataset.alicuota)
        );
        const el = document.getElementById("iva-resultado");
        if (!resultado) { el.classList.add("oculto"); return; }
        el.classList.remove("oculto");
        el.innerHTML = `
            <div class="resultado-fila"><span>Base</span><span>$ ${formatARS(resultado.base)}</span></div>
            <div class="resultado-fila"><span>IVA ${resultado.alicuota}%</span><span>$ ${formatARS(resultado.iva)}</span></div>
            <div class="resultado-fila resultado-total"><span>Total</span><span>$ ${formatARS(resultado.total)}</span></div>
        `;
    });
});

// ── Herramienta: Descuento ──

document.getElementById("btn-calcular-desc").addEventListener("click", () => {
    const resultado = calcularDescuento(
        document.getElementById("desc-precio").value,
        document.getElementById("desc-porcentaje").value
    );
    const el = document.getElementById("desc-resultado");
    if (!resultado) { el.classList.add("oculto"); return; }
    el.classList.remove("oculto");
    el.innerHTML = `
        <div class="resultado-fila"><span>Precio original</span><span>$ ${formatARS(resultado.original)}</span></div>
        <div class="resultado-fila"><span>Descuento ${resultado.porcentaje}%</span><span>- $ ${formatARS(resultado.descuento)}</span></div>
        <div class="resultado-fila resultado-total"><span>Precio final</span><span>$ ${formatARS(resultado.final)}</span></div>
    `;
});

// ── Herramienta: Interés Compuesto ──

document.getElementById("btn-calcular-ic").addEventListener("click", () => {
    const resultado = calcularInteresCompuesto(
        document.getElementById("ic-capital").value,
        document.getElementById("ic-tasa").value,
        document.getElementById("ic-anios").value,
        document.getElementById("ic-cap").value
    );
    const el = document.getElementById("ic-resultado");
    if (!resultado) { el.classList.add("oculto"); return; }
    el.classList.remove("oculto");

    const filas = resultado.tabla.map(f => `
        <tr>
            <td>${f.anio}</td>
            <td>$ ${formatARS(f.monto)}</td>
            <td>$ ${formatARS(f.interes)}</td>
        </tr>
    `).join("");

    el.innerHTML = `
        <div class="resultado-fila"><span>Capital inicial</span><span>$ ${formatARS(resultado.capital)}</span></div>
        <div class="resultado-fila"><span>Interés generado</span><span>$ ${formatARS(resultado.interesTotal)}</span></div>
        <div class="resultado-fila resultado-total"><span>Monto final</span><span>$ ${formatARS(resultado.montoFinal)}</span></div>
        <div class="ic-tabla-wrapper">
            <table class="ic-tabla">
                <thead><tr><th>Año</th><th>Capital</th><th>Interés acum.</th></tr></thead>
                <tbody>${filas}</tbody>
            </table>
        </div>
    `;
});
