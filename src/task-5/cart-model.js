import Subject from "./subject.js";
import { status } from "../task-1.js";

export default class Cart {
    constructor() {
        this.baseUrl = "http://localhost:3001/cart/items/";
        this.subject = new Subject();
        this.items = [];
        this.loading = false;
    }

    _ajax(url, method = "GET", data = null, middleware = () => {}) {

        const params = {
            method,
            mode: "cors",
            headers: { "Content-type": "application/json" }
        };
        if (data) {
            params.body = JSON.stringify(data);
        }

        return window.fetch(url, params)
            .then(status)
            .then(response => response.status === 200 ? response.json() : null);
    }

    _notify() {
        this.subject.notifyObservers();
    }

    register(...args) {
        this.subject.add(...args);
    }

    getItems() {
        return this.items;
    }

    getTotalQuantity() {
        return this.items.length
    }

    getTotalPrice() {
        // Change me!
        return 0;
    }

    load() {
        // Change me!
    }

    addItem(item) {
        // Change me!
    }

    updateItem(itemId, item) {
        // Change me!
    }

    removeItem(itemId) {
        // Change me!
    }

    removeAll() {
        // Change me!
    }
}
