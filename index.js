// index.js
const express = require('express');
const axios = require('axios');
const { Client } = require('@interledger/open-payments');
const fs = require('fs');
require('dotenv').config();

const app = express();
const port = 3000;

// MODIFICAR: La URL de la API base, si es diferente
const OPEN_PAYMENTS_API_BASE = 'https://api.openpayments.io'; 

// Carga la clave privada del archivo .env. Esta es una práctica más segura.
const openPaymentsClient = new Client({
    privateKey: process.env.PRIVATE_KEY,
});

app.use(express.json());

// Ruta para obtener el saldo
app.get('/api/wallet/balance', async (req, res) => {
    try {
        // MODIFICAR: Obtener el token de acceso y la cuenta del usuario autenticado
        const accessToken = 'TU_TOKEN_DE_ACCESO'; 
        const accountId = 'TU_ID_DE_CUENTA'; 

        const response = await axios.get(`${OPEN_PAYMENTS_API_BASE}/accounts/${accountId}/balance`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        
        // MODIFICAR: Asegúrate de que el formato de la respuesta coincida
        res.status(200).json({ balance: response.data.total_sent }); 
    } catch (error) {
        console.error('Error al obtener el saldo:', error);
        res.status(500).json({ error: 'Fallo al obtener el saldo de la cartera.' });
    }
});

// Ruta para procesar un pago
app.post('/api/wallet/charge', async (req, res) => {
    const { amount, currency } = req.body;
    
    try {
        // MODIFICAR: Necesitas el paymentPointer del destinatario
        const destinationPaymentPointer = 'https://example.com/pay/destinatario'; 

        const quote = await openPaymentsClient.quote.create({
            paymentPointer: destinationPaymentPointer,
            sendAmount: {
                value: amount,
                assetCode: currency
            }
        });
        
        const payment = await openPaymentsClient.payment.create({
            quoteId: quote.id
        });
        
        res.status(200).json({ success: true, payment });
    } catch (error) {
        console.error('Error al procesar el pago:', error);
        res.status(500).json({ error: 'Fallo al procesar el pago.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
