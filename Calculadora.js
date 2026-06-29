//como es una clase el archivo va con mayuscula
export class Calculadora {
    sumar(num1, num2){
        return num1 + num2;
    }
    restar(num1,num2){
        return num1-num2;
    }
    dividir(num1,num2){
        if (num2 === 0) return "Error";
        return num1/num2;
    }
    multiplicar(num1,num2){
        return num1*num2;
    }
}