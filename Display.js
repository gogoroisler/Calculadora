class Display{
    constructor(displayAnterior, displayActual) {
        this.displayAnterior = displayAnterior;
        this.displayActual = displayActual;
        this.calculador = new Calculadora();
        this.tipoOperacion = undefined;
        this.valorActual = "";
        this.valorAnterior = "";
        this.signos={
            sumar: "+",
            restar: "-",
            dividir: "%",
            multiplicar: "X",
        }
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
        this.tipoOperacion !== "igual" && this.calcular();
        this.tipoOperacion = tipo;
        this.valorAnterior = this.valorActual || this.valorAnterior;
        this.valorActual = "";
        this.imprimirValores();
    }

    agregarNumero(numero){
        if (numero === "." && this.valorActual.includes(".")) return 
        this.valorActual = this.valorActual.toString() + numero;
        this.imprimirValores();
    }

    imprimirValores(){
        this.displayActual.textContent = this.valorActual;
        this.displayAnterior.textContent= `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ""}`;
    }

    calcular(){
        const valorAnterior = parseFloat(this.valorAnterior);
        const valorActual = parseFloat(this.valorActual);

        if(isNaN(valorActual) || isNaN(valorAnterior) ) return
        this.valorActual = this.calculador[this.tipoOperacion](valorActual, valorAnterior);    
    }

}