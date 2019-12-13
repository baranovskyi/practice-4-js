import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import renderDialog from "../../src/task-4/render";
import showDialog from "../../src/task-4/task-4";

chai.use(chaiAsPromised);

const assert = chai.assert;
const dialogId = "task4";
let div, dialogEl, evObj, noEl, yesEl, promise;

if (typeof global !== "undefined") {
    global.$ = () => ({ modal: () => 1 });
} else {
    window.$ = () => ({ modal: () => 1 });
}

describe("Task 4: showDialog", () => {

    beforeEach(() => {
        div = document.createElement("div");
        renderDialog(div, dialogId);
        dialogEl = div.querySelector(`#${dialogId}`);
        promise = showDialog(dialogEl);
        evObj = document.createEvent("Events");
        evObj.initEvent("click", true, false);
        noEl = dialogEl.querySelector("button.no");
        yesEl = dialogEl.querySelector("button.yes");
    });

    it("should return Promise", () => {
        
        assert.instanceOf(showDialog(dialogEl), Promise);
    });

    it("should resolve when Yes was clicked", () => {
        
        yesEl.dispatchEvent(evObj);
        return assert.isFulfilled(promise);
    });

    it("should reject when No was clicked", () => {
        
        noEl.dispatchEvent(evObj);
        return assert.isRejected(promise);
    });

});
