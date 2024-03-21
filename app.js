const express = require('express');
const Ajv = require('ajv');
const fs = require('fs');

const app = express();
const ajv = new Ajv();


const schema1 = JSON.parse(fs.readFileSync('schemas/schema1.json', 'utf8'));
const schema2 = JSON.parse(fs.readFileSync('schemas/schema2.json', 'utf8'));


const validateSchema1 = ajv.compile(schema1);
const validateSchema2 = ajv.compile(schema2);


app.use(express.json());


app.post('/ruta1', (req, res) => {
    const isValid = validateSchema1(req.body);
    if (isValid) {
        res.status(200).send('JSON válido para ruta1');
    } else {
        res.status(400).send('JSON inválido para ruta1');
    }
});


app.post('/ruta2', (req, res) => {
    const isValid = validateSchema2(req.body);
    if (isValid) {
        res.status(200).send('JSON válido para ruta2');
    } else {
        res.status(400).send('JSON inválido para ruta2');
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
