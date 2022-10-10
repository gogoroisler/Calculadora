const displayAnterior = document.getElementById("anterior");
const displayActual = document.getElementById("posterior");
const botonesNumeros = document.querySelectorAll(".number");
const botonesOperadores = document.querySelectorAll(".operator");

const display = new Display(displayAnterior, displayActual);

botonesNumeros.forEach(boton => {
    boton.addEventListener("click", () =>display.agregarNumero(boton.innerHTML));
});

botonesOperadores.forEach(boton => {
    boton.addEventListener("click", () =>display.computar(boton.value))
});