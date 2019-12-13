const express = require("express"),
    cors = require("cors"),
    bodyParser = require("body-parser"),
    phones = require("./phones.json");
const app = express();
app.listen("3001");
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => { setTimeout(next, 500); });

let cart = [];

function isItemInCart(itemId) {
    return cart.some(item => item.id === itemId);
}

function getItemIndex(itemId) {
    return cart.findIndex(item => item.id === itemId);
}

app.get("/cart/items", (req, res) => {
    // List of all items
    res.status(200).json(cart);
});

app.post("/cart/items", (req, res, next) => {
    // Add one item
    if (!req.body.id || !req.body.price || !req.body.quantity) {
        res.status(400).end("Bad Request: id, price, name and quantity should be present in request body");
        return next();
    }
    if (isItemInCart(req.body.id)) {
        res.status(400).end("Bad Request: id already exists in cart. Use PUT to update item");
        return next();
    }
    cart.push(req.body);
    res.status(201).end();
});

app.put("/cart/items/:id", (req, res, next) => {
    const id = Number(req.params.id) || req.params.id;
    if (!isItemInCart(id)) {
        res.status(404).end("Not Found: item with this id doesn't exist");
        return next();
    }
    if (!req.body.id || req.body.id !== id || !req.body.price || !req.body.quantity) {
        res.status(400).end("Bad Request: id, price, name and quantity should be present in request body");
        return next();
    }
    cart[getItemIndex(id)] = req.body;
    res.status(204).end();
});

app.delete("/cart/items/:id", (req, res, next) => {
    // Delete one item
    const id = Number(req.params.id) || req.params.id;
    if (!isItemInCart(id)) {
        res.status(404).end("Not Found: item with this id doesn't exist");
        return next();
    }
    cart.splice(getItemIndex(id), 1);
    res.status(204).end();
});

app.delete("/cart/items", (req, res) => {
    // Delete all items
    cart = [];
    res.status(204).end();
});

app.get("/phones", (req, res) => {
    res.json({ data: phones });
});
