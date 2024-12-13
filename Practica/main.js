// Menú interactivo
const readline = require('readline');

// Clase Lexema
class Lexema {
    constructor(tipo, valor) {
        this.tipo = tipo;
        this.valor = valor;
    }
}

// Clase Error
class Error {
    constructor(valor, descripcion) {
        this.valor = valor;
        this.descripcion = descripcion;
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let opcion = 0;

let errores = [];
let lexemas = [];

let texto = `
    function suma(a, b) {
        return a + b;
    }
    let resultado = "Hola, mundo";
`

function menu() {
    console.log('* * * * * Menú interactivo * * * * *');
    console.log('1. Analizar texto');
    console.log('2. Opción 2');
    console.log('3. Opción 3');
    console.log('0. Salir');
    rl.question('Seleccione una opción: ', (answer) => {
        opcion = parseInt(answer);
        switch(opcion) {
            case 1:
                analizador(texto);
                menu();
                break;
            case 2:
                console.log('Opción 2 seleccionada');
                menu();
                break;
            case 3:
                console.log('Opción 3 seleccionada');
                menu();
                break;
            case 0:
                console.log('Saliendo del menú...');
                rl.close();
                break;
            default:
                console.log('Opción no válida');
                menu();
                break;
        }
    }
    );
}

menu();

function suma() {
    // Menú para la suma
    console.log('Suma entre 2 números');
    rl.question('Ingrese el primer número: ', (num1) => {
        rl.question('Ingrese el segundo número: ', (num2) => {
            let resultado = parseInt(num1) + parseInt(num2);
            console.log('El resultado de la suma es: ' + resultado);
            menu();
        });
    });
}

function analizador(texto) {
    const palabrasReservadas = ['if', 'else', 'while', 'for', 'int', 'float', 'char', 'string', 'bool', 'true', 'false', 'void', 'return', 'break', 'continue'];
    lexemas = [];
    errores = [];
    let contador = 0;

    while (contador < texto.length) {
        let caracter = texto[contador];
        if (caracter === ' ') {
            // Ignorar espacios
            contador++;
        } else if (caracter === '+' || caracter === '-' || caracter === '*' || caracter === '/' || caracter === '%' || caracter === '=') {
            lexemas.push(new Lexema('Operador', caracter));
            contador++;
        } else if (caracter === '(' || caracter === ')' || caracter === '{' || caracter === '}' || caracter === '[' || caracter === ']') {
            lexemas.push(new Lexema('Delimitador', caracter));
            contador++;
        } else if (caracter === '>' || caracter === '<' || caracter === '!' || caracter === '&') {
            if (texto[contador + 1] === '=') {
                lexemas.push(new Lexema('Operador', caracter + '='));
                contador += 2;
            } else {
                lexemas.push(new Lexema('Operador', caracter));
                contador++;
            }
        } else if (caracter === '|') {
            if (texto[contador + 1] === '|') {
                lexemas.push(new Lexema('Operador', '||'));
                contador += 2;
            } else {
                errores.push(new Error(caracter, 'Operador no reconocido'));
                contador++;
            }
        } else if (caracter === ';') {
            lexemas.push(new Lexema('Fin de sentencia', caracter));
            contador++;
        } else if (caracter === ',') {
            lexemas.push(new Lexema('Separador', caracter));
            contador++;
        } else if (caracter === '"') {
            let cadena = '';
            contador++;
            while (texto[contador] !== '"') {
                cadena += texto[contador];
                contador++;
            }
            lexemas.push(new Lexema('Cadena', cadena));
            contador++;
        } else if (caracter === "'") {
            let caracter = '';
            contador++;
            if (texto[contador] === '\\') {
                caracter = texto[contador] + texto[contador + 1];
                contador += 2;
            } else {
                caracter = texto[contador];
                contador++;
            }
            if (texto[contador] === "'") {
                lexemas.push(new Lexema('Caracter', caracter));
                contador++;
            } else {
                errores.push(new Error(caracter, 'Caracter no reconocido'));
                contador++;
            }
        }
        console.log(lexemas);
        console.log(errores);
    }
}