const express = require('express');

const app = express();
app.use(express.text()); // Middleware para manejar texto plano

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Lenguajes Formales y de Programación');
});

// Iniciar Servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});