export default class CartInfoView {
    constructor(el, cart) {
        this.el = el;
        this.cart = cart;
        this.cart.register(() => this.render());
        this.render();
    }

    render() {
        this.el.innerHTML = `
            <h5>Total Quantity: ${this.cart.getTotalQuantity()}</h5>
            <h5>Total Price: ${this.cart.getTotalPrice()}</h5>
            <h5>In Loading State: ${this.cart.loading}</h5>
        `;
    }
}
