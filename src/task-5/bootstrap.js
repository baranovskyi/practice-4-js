import Cart from "./cart-model";
import CartItemsView from "./cart-items-view";
import CartInfoView from "./cart-info-view";
import CartRESTView from "./cart-rest-view";


const cart = new Cart();
cart.load();

const view1 = new CartItemsView(document.querySelector(".task-5-items-view"), cart);
const view2 = new CartInfoView(document.querySelector(".task-5-info-view"), cart);
const view3 = new CartRESTView(document.querySelector(".task-5-rest-view"), cart);

export { cart, view1, view2, view3 };
