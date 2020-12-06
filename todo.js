const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_DOING = "Pending";
const TODOS_DONE = "Finished";

let toDos = [];
let done = [];

function saveToDosPen() {
    localStorage.setItem(TODOS_DOING, JSON.stringify(toDos));
}
function saveToDosFin() {
    localStorage.setItem(TODOS_DONE, JSON.stringify(done));
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;

    if (btn.checked) {
        toDoList.removeChild(li);
        const cleanToDos = toDos.filter(function (toDo) {
            return toDo.id !== parseInt(li.id);
        });
        toDos = cleanToDos;
        saveToDosPen();
    } else if (!btn.checked) {
        toDoList.removeChild(li);
        const cleanToDos = done.filter(function (toDo) {
            return toDo.id !== parseInt(li.id);
        });
        done = cleanToDos;
        saveToDosFin();
    }
}

function moveToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;

    if (btn.checked) {
        const cleanToDos = toDos.filter(function (toDo) {
            return toDo.id !== parseInt(li.id);
        });
        toDos = cleanToDos;
        saveToDosPen();
        li.children[1].style.textDecoration = "line-through";

        const doneObj = {
            id: parseInt(li.id),
            text: li.children[1].innerText,
        };

        done.push(doneObj);
        saveToDosFin();
    } else if (!btn.checked) {
        const cleanToDos = done.filter(function (toDo) {
            return toDo.id !== parseInt(li.id);
        });
        done = cleanToDos;
        saveToDosFin();
        li.children[1].style.textDecoration = "none";

        const toDosObj = {
            id: parseInt(li.id),
            text: li.children[1].innerText,
        };

        toDos.push(toDosObj);
        saveToDosPen();
    }
}

function paintToDoPen(text, newId) {
    const li = paintToDo(text, newId);
    li.firstChild.checked = false;
    toDoList.appendChild(li);

    const toDoObj = {
        id: newId,
        text: text,
    };
    toDos.push(toDoObj);
    saveToDosPen();
}

function paintToDoFin(text, newId) {
    const li = paintToDo(text, newId);
    li.firstChild.checked = true;
    li.children[1].style.textDecoration = "line-through";
    toDoList.appendChild(li);
}

function paintToDo(text, newId) {
    const li = document.createElement("li");
    const toDoText = document.createElement("span");
    const delBtn = document.createElement("button");
    const finBtn = document.createElement("input");
    finBtn.type = "checkbox";
    toDoText.innerText = text;
    delBtn.innerText = "x";

    finBtn.addEventListener("click", moveToDo);
    delBtn.addEventListener("click", deleteToDo);

    li.appendChild(finBtn);
    li.appendChild(toDoText);
    li.appendChild(delBtn);
    li.id = newId;

    return li;
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;

    const currnetTime = new Date();
    const newId = currnetTime.getTime();

    paintToDoPen(currentValue, newId);

    toDoInput.value = "";
}

function loadToDos() {
    const loadedtoDoList = localStorage.getItem(TODOS_DOING);
    if (loadedtoDoList !== null) {
        const parsedToDos = JSON.parse(loadedtoDoList);
        parsedToDos.forEach(function (toDo) {
            paintToDoPen(toDo.text, toDo.id);
        });
    }

    const loadedToDoFin = localStorage.getItem(TODOS_DONE);
    if (loadedToDoFin !== null) {
        const parsedToDosfin = JSON.parse(loadedToDoFin);
        parsedToDosfin.forEach(function (toDo) {
            paintToDoFin(toDo.text, toDo.id);

            const doneObj = {
                id: parseInt(toDo.id),
                text: toDo.text,
            };
            done.push(doneObj);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
