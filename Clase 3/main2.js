// Crear una clase de llanta
// La clase llanta tiene un atributo de tamaño y otro de marca

class Llanta { // Tamaño, Marca, Estado
    constructor(tamaño, marca){
        this.tamaño = tamaño;
        this.marca = marca;
        this.estado = 'nueva';
    }

    rodar(){
        console.log('Rodando');
    }

    imprimirMarca(){
        console.log(this.marca);
    }

    cambiarEstado(estado){
        this.estado = estado;
    }
}

class vehiculo {
    constructor(marca, modelo, año){
        this.marca = marca;
        this.modelo = modelo;
        this.año = año;
        this.llantas = []; // 0: Llanta Nueva, 1: Llanta Nueva, 2: Llanta Usada, 3: Llanta Usada
    }

    agregarLlanta(llanta){
        this.llantas.push(llanta);
    }

    verificarLlantas() {
        for (let i = 0; i < this.llantas.length; i++) {
            if (this.llantas[i].estado == 'usada') {
                console.log('La llanta: ' + (this.llantas[i].marca) + ' está usada');
            } else {
                console.log('La llanta: ' + (this.llantas[i].marca) + ' está nueva');
            }
        }
    }
}

let llantaMichelin = new Llanta('15 pulgadas', 'Michelin');
let llantaPirelli = new Llanta('15 pulgadas', 'Pirelli');
let llantaContinental = new Llanta('15 pulgadas', 'Continental');
let llantaFirestone = new Llanta('15 pulgadas', 'Firestone');

llantaFirestone.cambiarEstado('usada');
llantaPirelli.cambiarEstado('usada');

let carro = new vehiculo('Toyota', 'Corolla', 2020);
carro.agregarLlanta(llantaMichelin);
carro.agregarLlanta(llantaContinental);
carro.agregarLlanta(llantaPirelli);
carro.agregarLlanta(llantaFirestone);
carro.verificarLlantas();