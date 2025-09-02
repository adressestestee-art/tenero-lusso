const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const ORDERS_FILE = 'backend/orders.json';

// Endpoint pour enregistrer une commande
app.post('/orders', (req, res) => {
    const order = req.body;
    fs.readFile(ORDERS_FILE, 'utf8', (err, data) => {
        let orders = [];
        if (!err && data) {
            orders = JSON.parse(data);
        }
        orders.push(order);
        fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), err => {
            if (err) return res.status(500).send("Erreur serveur");
            res.status(200).send("Commande enregistrée");
        });
    });
});

app.listen(3000, () => {
    console.log("Serveur lancé sur http://localhost:3000");
});
