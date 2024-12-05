const fs = require('fs');

fs.appendFile('archivo3.txt', '\nHola, mundo!', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Archivo modificado');
});