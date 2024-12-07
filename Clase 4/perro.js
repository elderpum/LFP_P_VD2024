class Perro {
    constructor(nombre, raza, edad) {
        this.nombre = nombre;
        this.raza = raza;
        this.edad = edad;
    }

    ladrar() {
        console.log('Guau guau');
    }

    getNombre() {
        console.log(this.nombre);
    }

    getRaza() {
        console.log(this.raza);
    }

    getEdad() {
        console.log(this.edad);
    }
}

module.exports = Perro; // Exportar la clase Perro y poder importarla en otro archivo