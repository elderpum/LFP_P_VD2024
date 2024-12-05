let listaGeneral = [];
console.log('Lista general: ', listaGeneral);

listaGeneral.push('Primer Sentencia');
console.log('Lista general: ', listaGeneral);

listaGeneral.push('Segunda Sentencia');
console.log('Lista general: ', listaGeneral);

listaGeneral.push(1);
console.log('Lista general: ', listaGeneral);

listaGeneral.push(true);
console.log('Lista general: ', listaGeneral);

let subLista = ['Sublista 1', 'Sublista 2', 'Sublista 3'];
listaGeneral.push(subLista);
console.log('Lista general: ', listaGeneral);

console.log(listaGeneral.length);

console.log(listaGeneral[4]);

console.log(listaGeneral[4][2]);

// Diccionarios
let diccionario = {};
console.log('Diccionario: ', diccionario);

// Agregar elementos al diccionario
diccionario['ciudad'] = 'Ciudad #1';
console.log('Diccionario: ', diccionario);

diccionario['departamento'] = 'Departamento #1';
console.log('Diccionario: ', diccionario);

// Acceder a un elemento del diccionario
console.log(diccionario['ciudad']);

// Acceder a la llave mediante la variable
console.log(diccionario['departamento']);

// Modificar un elemento del diccionario
diccionario['ciudad'] = 'Ciudad #2';
console.log('Diccionario: ', diccionario);

diccionario['departamento'] = 'Departamento #2';
console.log('Diccionario: ', diccionario);

// Agregar la sublista al diccionario
diccionario['sublista'] = subLista;
console.log('Diccionario: ', diccionario);

// Eliminar un elemento del diccionario
delete diccionario['sublista'];
console.log('Diccionario: ', diccionario);