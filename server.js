// server.js

const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const billeteraData = {
    saldo: 10000
};

app.get("/saldo", (req, res) => {
    res.json({ saldo: billeteraData.saldo });
});

app.post("/crear-pago", (req, res) => {
    const { monto } = req.body;

    if (!monto || monto <= 0) {
        return res.status(400).json({ error: "Monto de pago inválido." });
    }
    
    const paymentPointer = `$nubuk-hackathon.com/payments/${uuidv4()}`;

    res.status(200).json({
        mensaje: `Puntero de pago creado para el monto de $${monto}`,
        puntero_pago: paymentPointer
    });
});

app.listen(PORT, () => {
    console.log(`Servidor de NÜBÜK escuchando en http://localhost:${PORT}`);
});
