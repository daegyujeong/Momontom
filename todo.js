const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(text) {
  const btn = event.target;
  const li = btn.parentNode;
  // console.log(li.id);
  toDoList.removeChild(li);
  // console.log(toDo.id); // 결과 숫자
  // console.log(li.id);  // 결과 string ("") parseInt 로 숫자로 변환 가능

  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  }); // 함수를 거쳐 나온 결과값이 true 인것만 필터링 함
  toDos = cleanToDos;
  saveToDos();
  // console.log(cleanToDos);
  // console.dir(event.target);
  // console.log(event.target.parentNode);
}
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;

  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  console.dir(li);
  li.style.backgroundColor = `rgba(${Math.floor(
    Math.random() * 255
  )},${Math.floor(Math.random() * 255)},${Math.floor(
    Math.random() * 255
  )},0.5)`;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      // 각 배열을 () 안에 뿌림
      paintToDo(toDo.text);
    });
  } else {
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
