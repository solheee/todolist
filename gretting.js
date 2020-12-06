const form = document.querySelector(".js-nameForm"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handelSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.remove("hide");
    form.addEventListener("submit", handelSubmit);
}

function paintGreeting(text) {
    form.classList.add("hide");
    greeting.classList.remove("hide");
    greeting.innerText = `Hello, ${text}`;
}

function init() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

init();
