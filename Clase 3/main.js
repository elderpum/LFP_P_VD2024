function sumar(a, b) {
    return a + b;
}

function restar(a, b) {
    return a - b;
}

function multiplicar(a, b) {
    return a * b;
}

function dividir(a, b) {
    if (b == 0) {
        return "No se puede dividir por 0";
    }
    return a / b;
}

function devolverMensajeDinamico(condicional) {
    switch (condicional) {
        case 'semestre':
            return "Sale en semestre";
        case 'vacas':
            return "Sale en vacas";
        case 'retra':
            return "Sale en retra";
        default:
            return "Psicología te está esperando con los brazos abiertos:c";
    }
}

console.log(devolverMensajeDinamico());