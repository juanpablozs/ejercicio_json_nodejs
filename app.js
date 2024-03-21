const express = require('express');
const Ajv = require('ajv');
const fs = require('fs');

const app = express();
const ajv = new Ajv();

// Cargar esquemas de validación desde el directorio "schemas"
const schema1 = JSON.parse(fs.readFileSync('schemas/schema1.json', 'utf8'));
const schema2 = JSON.parse(fs.readFileSync('schemas/schema2.json', 'utf8'));

// Compilar esquemas con Ajv
const validateSchema1 = ajv.compile(schema1);
const validateSchema2 = ajv.compile(schema2);

// Middleware para manejar solicitudes POST
app.use(express.json());

// Ruta para validar JSON contra schema1.json
app.post('/ruta1', (req, res) => {
    const isValid = validateSchema1(req.body);
    if (isValid) {
        res.status(200).send('JSON válido para ruta1');
    } else {
        res.status(400).send('JSON inválido para ruta1');
    }
});

// Ruta para validar JSON contra schema2.json
app.post('/ruta2', (req, res) => {
    const isValid = validateSchema2(req.body);
    if (isValid) {
        res.status(200).send('JSON válido para ruta2');
    } else {
        res.status(400).send('JSON inválido para ruta2');
    }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
