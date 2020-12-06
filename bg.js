const body = document.querySelector("body");

const IMG_NUMBER = 13;

function setdarkBg(value) {
    localStorage.setItem("brightness", value);
}

function darkBg() {
    const image = document.querySelector(".bgImage");
    const darkBg = document.querySelector("input[type=range]");

    darkBg.addEventListener("change", function (e) {
        const value = e.target.value;
        image.style.filter = `brightness(${value}%)`;
        setdarkBg(value);
    });

    if (localStorage.getItem("brightness")) {
        const value = localStorage.getItem("brightness");
        darkBg.value = value;
        image.style.filter = `brightness(${value}%)`;
    }
}

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
    darkBg();
}

init();
