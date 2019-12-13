export default class CartRESTView {
    constructor(el, cart) {
        this.cart = cart;
        this.el = el;

        this.addEventListeners();
    }

    addEventListeners() {
        const postEl = this.el.querySelector(".task-5-post");
        postEl.querySelector("button").addEventListener("click", () => {
            this.cart.addItem(JSON.parse(postEl.querySelector("textarea").value));
        });

        const putEl = this.el.querySelector(".task-5-put");
        putEl.querySelector("button").addEventListener("click", () => {
            let id = putEl.querySelector("input").value;
            id = Number(id) || id;
            this.cart.updateItem(id, JSON.parse(putEl.querySelector("textarea").value));
        });

        const deleteEl = this.el.querySelector(".task-5-delete");
        deleteEl.querySelector("button").addEventListener("click", () => {
            let id = deleteEl.querySelector("input").value;
            id = Number(id) || id;
            this.cart.removeItem(id);
        });

        this.el.querySelector(".task-5-delete-all").addEventListener("click", () => {
            this.cart.removeAll();
        });
    }
}
