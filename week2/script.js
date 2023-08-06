const todoContainer = document.querySelector(".toDoContainer");
reload();
function todoClicked(event) {
  const todo = event.target.parentNode;
  const todoText = todo.children[1].children[0];
  console.log(todo.children);
  todoText.classList.toggle("done");
}
function starClicked(event) {
    const todo = event.target.parentNode;
    const todoHigh = todo.children[0];
    todoHigh.classList.toggle("highlight");
}

function addTodo(text) {
  const newTodo = document.createElement("div");
  newTodo.className = "todo";

  const newCheck = document.createElement("input");
  newCheck.type = "checkbox";
  newCheck.className = "checkbox";

  const newText = document.createElement("div");
  newText.className = "todoText";

  const spanText = document.createElement("span");
  spanText.className = "text";
  spanText.innerText = text;

  const spanTrash = document.createElement("span");
  spanTrash.className = "trash";
  spanTrash.innerText = "🗑️";
  
  const spanStar = document.createElement("span");
  spanStar.className = "star";
  spanStar.innerText = "⭐";

  const spanRight = document.createElement("span");
  spanRight.className = "right";

  newText.appendChild(spanText);
  newText.appendChild(spanRight);
  newText.appendChild(spanStar);
  newText.appendChild(spanTrash);
  newTodo.appendChild(newCheck);
  newTodo.appendChild(newText);

  todoContainer.prepend(newTodo);
}

const todoForm = document.querySelector("form");
function getInputAndAdd(event) {
  event.preventDefault();
  const todoInput = document.querySelector(".newTodo");
  addTodo(todoInput.value);
  todoInput.value = "";
  reload();
}
todoForm.addEventListener("submit", getInputAndAdd);

function todoDelete(event) {
  const clickedTodoText = event.target.parentNode.children[0].innerText;
  console.log(clickedTodoText);
  const removeTodo = event.target.parentNode.parentNode;
  const ok = confirm("[" + clickedTodoText + "]을/를 삭제하시겠습니까?");
  if (ok) {
    removeTodo.remove();
  }
}
function reload() {
  let checkboxes = document.querySelectorAll(".checkbox");
  let trashIcons = document.querySelectorAll(".trash");
  let starIcons = document.querySelectorAll(".star");
  console.log(starIcons);
  console.log(checkboxes);
  console.log(starIcons);
  [].forEach.call(starIcons, function (col) {
    col.addEventListener("click", starClicked, false);
  });

  [].forEach.call(trashIcons, function (col) {
    col.addEventListener("click", todoDelete, false);
  });

  [].forEach.call(checkboxes, function (col) {
    col.addEventListener("click", todoClicked, false);
  });
}