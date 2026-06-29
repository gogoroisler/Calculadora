import { Calculadora } from "./Calculadora.js";

export class Display {
    constructor(displayAnterior, displayActual, historialEl) {
        this.displayAnterior = displayAnterior;
        this.displayActual = displayActual;
        this.historialEl = historialEl;
        this.calculador = new Calculadora();
        this.tipoOperacion = undefined;
        this.valorActual = "";
        this.valorAnterior = "";
        this.historial = JSON.parse(localStorage.getItem("historial")) || [];
        this.signos={
            sumar: "+",
            restar: "-",
            dividir: "÷",
            multiplicar: "×",
        }
        this.renderizarHistorial();
    }

    borrar(){
        this.valorActual= this.valorActual.toString().slice(0,-1);
        this.imprimirValores();
    }

    borrarTodo(){
        this.valorActual = "";
        this.valorAnterior = "";
        this.tipoOperacion = undefined;
        this.imprimirValores();
    }
    computar(tipo){
        if (this.tipoOperacion !== "igual") {
            const anteriorCapturado = this.valorAnterior;
            const actualCapturado = this.valorActual;
            const signoCapturado = this.signos[this.tipoOperacion];
            this.calcular();
            if (tipo === "igual" && this.valorActual !== "Error" && signoCapturado) {
                this.historial.unshift({
                    expresion: `${this.formatear(anteriorCapturado)} ${signoCapturado} ${this.formatear(actualCapturado)}`,
                    resultado: this.formatear(this.valorActual)
                });
                if (this.historial.length > 10) this.historial.pop();
                this.renderizarHistorial();
            }
        }
        this.tipoOperacion = tipo;
        this.valorAnterior = this.valorActual || this.valorAnterior;
        this.valorActual = "";
        this.imprimirValores();
    }

    agregarNumero(numero){
        if (this.valorActual === "Error") this.borrarTodo();
        if (numero === "." && this.valorActual.includes(".")) return;
        this.valorActual = this.valorActual.toString() + numero;
        this.imprimirValores();
    }

    descargarCSV() {
        if (this.historial.length === 0) return;
        const filas = [
            ["Operación", "Resultado"],
            ...this.historial.map(item => [item.expresion, item.resultado])
        ];
        const csv = filas.map(f => f.map(c => `"${c}"`).join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `historial-calculadora-${new Date().toISOString().slice(0,10)}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    }

    limpiarHistorial() {
        this.historial = [];
        localStorage.removeItem("historial");
        this.renderizarHistorial();
    }

    renderizarHistorial() {
        if (!this.historialEl) return;
        localStorage.setItem("historial", JSON.stringify(this.historial));
        this.historialEl.innerHTML = this.historial.map(item => `
            <div class="historial-item">
                <span class="historial-expresion">${item.expresion}</span>
                <span class="historial-resultado">= ${item.resultado}</span>
            </div>
        `).join("");
    }

    formatear(valor) {
        if (valor === "" || valor === "Error") return valor;
        const str = valor.toString();
        if (str.endsWith(".")) {
            return str.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ",";
        }
        const [entero, decimal] = str.split(".");
        const enteroFormateado = entero.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return decimal !== undefined ? `${enteroFormateado},${decimal}` : enteroFormateado;
    }

    imprimirValores(){
        this.displayActual.textContent = this.formatear(this.valorActual);
        this.displayAnterior.textContent = `${this.formatear(this.valorAnterior)} ${this.signos[this.tipoOperacion] || ""}`;
    }

    calcular(){
        const valorAnterior = parseFloat(this.valorAnterior);
        const valorActual = parseFloat(this.valorActual);

        if(isNaN(valorActual) || isNaN(valorAnterior)) return;
        const resultado = this.calculador[this.tipoOperacion](valorAnterior, valorActual);
        if (resultado === "Error") {
            this.valorActual = "Error";
            this.valorAnterior = "";
            this.tipoOperacion = undefined;
        } else {
            this.valorActual = parseFloat(resultado.toFixed(10));
        }
    }

}