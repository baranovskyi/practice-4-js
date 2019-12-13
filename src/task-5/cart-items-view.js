export default class CartItemsView {
    constructor(el, cart) {
        this.el = el;
        this.cart = cart;
        this.cart.register(() => this.render());
        this.render();
    }

    render() {
        this.el.innerHTML = `<pre>${JSON.stringify(this.cart.getItems(), null, 2)}</pre>`;
    }
}
