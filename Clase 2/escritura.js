// Función para escribir un archivo de texto nuevo

// Importar el modulo fs
const fs = require('fs');

// Funcion para escribir un archivo de texto
fs.writeFile('archivo2.txt', 'Hola, mundo!', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Archivo creado');
});

// Función recursiva que cuenta desde el 0 hasta el 20 para escribir un archivo de texto existente
for (let i = 0; i <= 20; i++) {
    console.log(`Escribiendo ${i}`);
    fs.appendFile('archivo2.txt', `${i}`, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
}