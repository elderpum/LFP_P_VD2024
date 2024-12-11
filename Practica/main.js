// Menú interactivo
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let opcion = 0;

function menu() {
    console.log('* * * * * Menú interactivo * * * * *');
    console.log('1. Suma entre 2 números');
    console.log('2. Opción 2');
    console.log('3. Opción 3');
    console.log('0. Salir');
    rl.question('Seleccione una opción: ', (answer) => {
        opcion = parseInt(answer);
        switch(opcion) {
            case 1:
                suma();
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