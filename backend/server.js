const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const ORDERS_FILE = 'backend/orders.json';

app.post('/orders', (req, res) => {
    const order = req.body;
    fs.readFile(ORDERS_FILE, 'utf8', (err, data) => {
        let orders = [];
        if(!err && data) {
            orders = JSON.parse(data);
        }
        orders.push(order);
        fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), err => {
            if(err) return res.status(500).send("Erreur serveur");
            res.status(200).send("Commande enregistrée");
        });
    });
});

const PORT = process.env.PORT ||
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});
