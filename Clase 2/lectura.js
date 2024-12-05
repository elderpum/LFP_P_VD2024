// Importar librería fs
const fs = require('fs');

var contenido;

// Leer archivo de texto
fs.open('archivo.txt', 'r', (err, fd) => {
    if (err) {
        console.error('Error al intentar abrir el archivo: ', err);
        return;
    }
    console.log('Archivo abierto correctamente');

    // Buffer para almacenar los datos leidos
    let buffer = Buffer.alloc(1024);

    // Leer archivo
    fs.read(fd, buffer, 0, buffer.length, null, (err, bytesRead, buffer) => {
        if (err) {
            console.error('Error al leer el archivo: ', err);
            return;
        }
        console.log(`Bytes leidos: ${bytesRead}`);
        console.log(buffer.toString('utf8', 0, bytesRead));
        console.log('Datos leidos correctamente');

        // Guardar el contenido del archivo
        contenido = buffer.toString('utf8', 0, bytesRead);
    });

    // Escribir la misma información en otro archivo
    fs.open('archivo2.txt', 'w', (err, fd2) => {
        if (err) {
            console.error('Error al intentar abrir el archivo: ', err);
            return;
        }
        console.log('Archivo abierto correctamente');

        // Escribir en el archivo
        fs.write(fd2, buffer, 0, buffer.length, null, (err, written, buffer) => {
            if (err) {
                console.error('Error al escribir en el archivo: ', err);
                return;
            }
            console.log(`Bytes escritos: ${contenido}`);
            console.log('Datos escritos correctamente');
            fs.close(fd2, (err) => {
                if (err) {
                    console.error('Error al intentar cerrar el archivo: ', err);
                    return;
                }
                console.log('Archivo cerrado correctamente');
            });
        });
    });

    // Cerrando archivo
    fs.close(fd, (err) => {
        if (err) {
            console.error('Error al intentar cerrar el archivo: ', err);
            return;
        }
        console.log('Archivo cerrado correctamente');
    });
});