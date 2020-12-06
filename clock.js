const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector(".time"),
    pomodoro = clockContainer.querySelector(".js-pomodoro"),
    pomodoroForm = pomodoro.querySelector(".js-pomodoroForm"),
    pomodoroMin = pomodoroForm.querySelector("input[type=number]"),
    pomodoroTimer = pomodoro.querySelector(".timer"),
    pomodoroTimerStopBtn = pomodoro.querySelector(".stop_timer"),
    pomodoroToggleBtn = clockContainer.querySelector(".pomodoro_toggle");

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

pomodoroForm.addEventListener("submit", function (e) {
    e.preventDefault();
    pomodoroForm.classList.add("hide");
    pomodoroTimer.parentNode.classList.remove("hide");
    let pomodoro = parseInt(pomodoroMin.value * 60);

    let timer = setInterval(function () {
        let hours = Math.floor(pomodoro / 60 / 60);
        let minutes = Math.floor((pomodoro / 60) % 60);
        let seconds = Math.floor(pomodoro % 60);
        pomodoroTimer.innerText = `${hours < 10 ? `0${hours}` : hours}:${
            minutes < 10 ? `0${minutes}` : minutes
        }:${seconds < 10 ? `0${seconds}` : seconds}`;
        pomodoro--;
        if (pomodoro < 0) {
            clearInterval(timer);
            pomodoroForm.classList.remove("hide");
            pomodoroTimer.parentNode.classList.add("hide");
            alert("Time Out");
        }
    }, 1000);

    pomodoroTimerStopBtn.addEventListener("click", function () {
        clearInterval(timer);
        pomodoroForm.classList.remove("hide");
        pomodoroTimer.parentNode.classList.add("hide");
    });
});

pomodoroToggleBtn.addEventListener("click", function () {
    clockTitle.classList.toggle("hide");
    pomodoro.classList.toggle("hide");
});

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();
