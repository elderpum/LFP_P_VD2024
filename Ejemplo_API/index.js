const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
app.use(express.text()); // Middleware para manejar texto plano

// Habilitar CORS para todas las rutas
app.use(cors());

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

// Variables globales
let lexemas = [];
let errores = [];

// Ruta: Analizar Texto
app.post('/analizar', (req, res) => {
    try {
        const texto = req.body; // El texto viene directamente en el cuerpo de la petición
        if (!texto) {
            return res.status(400).json({ error: 'El campo "texto" es obligatorio' });
        }

        analizarTexto(texto);
        res.status(201).json({ lexemas, errores });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Ruta: Generar Reporte HTML
app.post('/generar-reporte', (req, res) => {
    try {
        const texto = req.body; // Recibimos el texto del cuerpo de la petición
        if (!texto) {
            return res.status(400).json({ error: 'El campo "texto" es obligatorio' });
        }

        analizarTexto(texto);
        generarReportesHTML();
        res.status(201).json({ mensaje: 'Reporte generado correctamente' });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Ruta: Procesar JSON
app.post('/procesar-json', (req, res) => {
    const jsonTexto = req.body;
    if (!jsonTexto) {
        return res.status(400).json({ error: 'El campo "json" es obligatorio' });
    }

    try {
        const json = JSON.parse(jsonTexto);
        const operaciones = procesarJSON(json);
        res.json({ operaciones });
    } catch (error) {
        res.status(400).json({ error: 'JSON inválido' });
    }
});

// Ruta: Generar Grafo
app.post('/generar-grafo', (req, res) => {
    try {
        const texto = req.body; // Recibimos el texto del cuerpo de la petición
        if (!texto) {
            return res.status(400).json({ error: 'El campo "texto" es obligatorio' });
        }

        analizarTexto(texto);
        generarGrafo();
        res.status(201).json({ mensaje: 'Grafo generado correctamente' });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Bienvenido a mi API!');
});

// Analizador Léxico
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

        // Ignoramos saltos de carro
        else if (codigo === 13) {
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

// Generar Reporte HTML
function generarReportesHTML(callback) {
    let html = `
        <html>
            <head><title>Reporte</title></head>
            <body>
                <h1>Reporte de Análisis Léxico</h1>
                <h2>Lexemas</h2>
                <ul>
    `;
    lexemas.forEach((lexema) => {
        html += `<li>${lexema.tipo}: ${lexema.valor}</li>`;
    });
    html += '</ul><h2>Errores</h2><ul>';
    errores.forEach((error) => {
        html += `<li>${error.valor}: ${error.descripcion}</li>`;
    });
    html += '</ul></body></html>';

    fs.writeFile('reporte.html', html, (err) => callback(err));
}

// Procesar JSON
function procesarJSON(json) {
    const operaciones = [];
    json.operaciones.forEach((op) => {
        const operacion = {
            operacion: op.operacion,
            valor1: typeof op.valor1 === 'object' ? procesarJSON({ operaciones: op.valor1 }) : op.valor1,
            valor2: typeof op.valor2 === 'object' ? procesarJSON({ operaciones: op.valor2 }) : op.valor2,
        };
        operaciones.push(operacion);
    });
    return operaciones;
}

// Generar Grafo
function generarGrafo(callback) {
    const dot = `
        digraph G {
            node [shape=box];
            "Inicio" -> "Fin";
        }
    `;
    fs.writeFile('grafo.dot', dot, (err) => {
        if (err) return callback(err);
        exec('dot -Tpng grafo.dot -o grafo.png', (err) => callback(err));
    });
}

// Iniciar Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});