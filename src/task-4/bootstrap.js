import showDialog from "./task-4";
import renderDialog from "./render";

const dialogId = "task-4-Modal",
    button = document.getElementById("task4-show-dialog-button");

renderDialog(document.getElementById("task4-dialog"), dialogId);

const dialogEl = document.querySelector(`#${dialogId}`),
    alertEl = document.querySelector(`#${dialogId}Alert`);

function alertHide() {
    alertEl.classList.remove("alert-danger");
    alertEl.classList.remove("alert-success");
    alertEl.innerHTML = "";
}

function alertYes(message) {
    alertEl.classList.remove("alert-danger");
    alertEl.classList.add("alert-success");
    alertEl.innerHTML = message;
}

function alertNo(message) {
    alertEl.classList.add("alert-danger");
    alertEl.classList.remove("alert-success");
    alertEl.innerHTML = message;
}

button.addEventListener("click", () => {

    showDialog(dialogEl)
        .then(() => {
            alertYes("It is incredible! You agree with everything :-)");
            $(dialogEl).modal("hide");
            setTimeout(alertHide, 2000);
        })
        .catch(() => {
            alertNo("Congratulation! You can not be fooled");
            $(dialogEl).modal("hide");
            setTimeout(alertHide, 2000);
        });
});
