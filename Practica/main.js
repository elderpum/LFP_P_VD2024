// Menú interactivo
const readline = require('readline');
const fs = require('fs');

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

let textoMatematico = `
{
    "operaciones": [
        {
            "operacion": "suma",
            "valor1": 4.5,
            "valor2": 5.32
        },
        {
            "operacion": "resta",
            "valor1": 4.5,
            "valor2": [
                {
                    "operacion": "potencia",
                    "valor1": 10,
                    "valor2": 3
                }
            ]
        },
        {
            "operacion": "suma",
            "valor1": [
                {
                    "operacion": "seno",
                    "valor1": 45
                }
            ],
            "valor2": 5.32
        },
        {
            "operacion": "multiplicacion",
            "valor1": 7,
            "valor2": 3
        },
        {
            "operacion": "division",
            "valor1": 15,
            "valor2": 3
        }
    ],
    "configuraciones": [
        {
            "fondo": "red",
            "fuente": "black",
            "forma": "circle"
        }
    ]
}
`

function menu() {
    console.log('* * * * * Menú interactivo * * * * *');
    console.log('1. Analizar texto');
    console.log('2. Obtener Reportes');
    console.log('3. Imprimir JSON xd');
    console.log('0. Salir');
    rl.question('Seleccione una opción: ', (answer) => {
        opcion = parseInt(answer);
        switch(opcion) {
            case 1:
                analizarTexto(texto);
                menu();
                break;
            case 2:
                mostrarResultados();
                menu();
                break;
            case 3:
                leerJSONs(textoMatematico);
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

// Función para analizar texto
function analizarTexto(texto) {
    const palabrasReservadas = [
        'if', 'else', 'while', 'for', 'int', 'float', 'char', 'string',
        'bool', 'true', 'false', 'void', 'return', 'break', 'continue',
        'function', 'let', 'const',
    ];
    lexemas = [];
    errores = [];
    let contador = 0;

    while (contador < texto.length) {
        // Obtenemos el char actual
        let codigo = texto.charCodeAt(contador);

        // Ignoramos espacios en blanco
        if (codigo === 32) {
            contador++;
            continue;
        }

        // Ignoramos saltos de línea
        else if (codigo === 10) {
            contador++;
            continue;
        }

        // Ignoramos tabulaciones
        else if (codigo === 9) {
            contador++;
            continue;
        }

        // Si es un dígito
        else if (codigo >= 48 && codigo <= 57) {
            let numero = '';
            while (codigo >= 48 && codigo <= 57) {
                numero += texto[contador];
                contador++;
                codigo = texto.charCodeAt(contador);
            }
            lexemas.push(new Lexema('Número', numero));
        }

        // Si es una letra
        else if ((codigo >= 65 && codigo <= 90) || (codigo >= 97 && codigo <= 122)) {
            let palabra = '';
            while ((codigo >= 65 && codigo <= 90) || (codigo >= 97 && codigo <= 122)) {
                palabra += texto[contador];
                contador++;
                codigo = texto.charCodeAt(contador);
            }

            if (palabrasReservadas.includes(palabra)) {
                lexemas.push(new Lexema('Palabra reservada', palabra));
            } else {
                lexemas.push(new Lexema('Identificador', palabra));
            }
        }

        // Si es un operador
        else if (codigo === 43 || codigo === 45 || codigo === 42 || codigo === 47)   {
            lexemas.push(new Lexema('Operador', texto[contador]));
            contador++;
        }

        // Si es un paréntesis de apertura
        else if (codigo === 40) {
            lexemas.push(new Lexema('Paréntesis de apertura', texto[contador]));
            contador++;
        }

        // Si es un paréntesis de cierre
        else if (codigo === 41) {
            lexemas.push(new Lexema('Paréntesis de cierre', texto[contador]));
            contador++;
        }

        // Si es una llave de apertura
        else if (codigo === 123) {
            lexemas.push(new Lexema('Llave de apertura', texto[contador]));
            contador++;
        }

        // Si es una llave de cierre
        else if (codigo === 125) {
            lexemas.push(new Lexema('Llave de cierre', texto[contador]));
            contador++;
        }

        // Si es un punto y coma
        else if (codigo === 59) {
            lexemas.push(new Lexema('Punto y coma', texto[contador]));
            contador++;
        }

        // Si es una comilla doble
        else if (codigo === 34) {
            let cadena = '';
            contador++;
            codigo = texto.charCodeAt(contador);
            while (codigo !== 34) {
                cadena += texto[contador];
                contador++;
                codigo = texto.charCodeAt(contador);
            }
            lexemas.push(new Lexema('Cadena', cadena));
            contador++;
        }

        // Si viene una coma
        else if (codigo === 44) {
            lexemas.push(new Lexema('Coma', texto[contador]));
            contador++;
        }

        // Si viene un igual
        else if (codigo === 61) {
            lexemas.push(new Lexema('Igual', texto[contador]));
            contador++;
        }

        // Si es un caracter no reconocido
        else {
            errores.push(new Error(texto[contador], 'Caracter no reconocido'));
            contador++;
        }
    }
}

// Función para mostrar resultados
function mostrarResultados() {
    console.log('\nLexemas encontrados:');
    lexemas.forEach((lexema, index) => {
        console.log(`${index + 1}. Tipo: ${lexema.tipo}, Valor: "${lexema.valor}"`);
    });

    if (errores.length > 0) {
        console.log('\nErrores encontrados:');
        errores.forEach((error, index) => {
            console.log(`${index + 1}. Valor: "${error.valor}", Descripción: ${error.descripcion}`);
        });
    } else {
        console.log('\nNo se encontraron errores.');
    }
    generarReportesHTML();
}

// Función para generar reportes html
function generarReportesHTML() {
    // Generamos el código HTML
    let html = `
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Reporte de análisis léxico</title>
            </head>
            <body style="font-family: Arial; padding: 20px; text-align: center; background-color: #31cbd2;">
                <h1>Reporte de análisis léxico</h1>
                <h2>Lexemas encontrados:</h2>
                <table border="1" style="width: 100%; text-align: center;">
                    <tr>
                        <th>#</th>
                        <th>Tipo</th>
                        <th>Valor</th>
                    </tr>
    `;
    lexemas.forEach((lexema, index) => {
        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${lexema.tipo}</td>
                <td>${lexema.valor}</td>
            </tr>
        `;
    });
    html += `
                </table>
    `;

    if (errores.length > 0) {
        html += `
            <h2>Errores encontrados:</h2>
            <table border="1" style="width: 100%; text-align: center;">
                <tr>
                    <th>#</th>
                    <th>Valor</th>
                    <th>Descripción</th>
                </tr>
        `;
        errores.forEach((error, index) => {
            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${error.valor}</td>
                    <td>${error.descripcion}</td>
                </tr>
            `;
        });
        html += `
            </table>
        `;
    } else {
        html += `
            <h2>No se encontraron errores.</h2>
        `;
    }

    html += `
            </body>
        </html>
    `;

    // Guardamos el código HTML en un archivo
    fs.writeFile('reporte.html', html, (error) => {
        if (error) {
            console.log('Error al generar el reporte HTML');
        } else {
            console.log('Reporte HTML generado correctamente');
        }
    });
}

function leerJSONs(texto){
    let json = JSON.parse(texto);

    json.operaciones.forEach(element => {
        console.log(`Operación: ${element.operacion}`);
        // Si valor1 fuera objeto, entonces es una operación anidada y le debemos de imprimir todos sus elementos
        if(typeof element.valor1 === 'object'){
            console.log(`Valor1: `);
            element.valor1.forEach(valor => {
                console.log(`\tOperación: ${valor.operacion}`);
                console.log(`\tValor1: ${valor.valor1}`);
                console.log(`\tValor2: ${valor.valor2}`);
            });
        } else {
            console.log(`Valor1: ${element.valor1}`);
        }

        // Si valor2 fuera objeto, entonces es una operación anidada y le debemos de imprimir todos sus elementos
        if(typeof element.valor2 === 'object'){
            console.log(`Valor2: `);
            element.valor2.forEach(valor => {
                console.log(`\tOperación: ${valor.operacion}`);
                console.log(`\tValor1: ${valor.valor1}`);
                console.log(`\tValor2: ${valor.valor2}`);
            });
        } else {
            console.log(`Valor2: ${element.valor2}`);
        }
    });
}