    // Ejemplo básico de index.js
    const { Client } = require('interledger-open-payments');
    const fs = require('fs');

    const privateKey = fs.readFileSync('private.key'); // Carga tu clave privada

    // Inicializa tu cliente
    const client = new Client({
        privateKey: privateKey
    });

    // Ahora puedes usar el cliente para interactuar con la API
    console.log('Cliente Interledger inicializado');


