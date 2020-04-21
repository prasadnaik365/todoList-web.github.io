var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");
// Events on list
button.addEventListener("click", addListAfterClick);
function addListAfterClick() {
  if (inputLength() > 0) {
    createListElement();
  }
}
// keypress event listener
input.addEventListener("keypress", addListAfterKeypres);
function addListAfterKeypres() {
  if (inputLength() > 0 && event.keyCode === 13) {
    createListElement();
  }
}
// returns length of the input value(String)
function inputLength() {
  return input.value.length;
}

// functions to create,delete,toggle list items

// create list item
function createListElement() {
  var li = document.createElement("li");
  var inputValue = input.value;
  inputValue = inputValue.toUpperCase();
  // adding list to local storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(inputValue);
  localStorage.setItem("todos", JSON.stringify(todos));
  li.appendChild(document.createTextNode(" " + inputValue));

  li.appendChild(createBtnDelete());
  ul.appendChild(li);
  console.log(li.textContent);

  input.value = "";
}
let todos = JSON.parse(localStorage.getItem("todos"));

// invoking function create list items using local storage
(() => {
  todos.forEach((element, i) => {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(" " + element));
    li.appendChild(createBtnDelete());
    ul.appendChild(li);
    input.value = "";
  });
})();

// create delete button list item
function createBtnDelete() {
  var btnDelete = document.createElement("span");
  btnDelete.appendChild(document.createTextNode("X"));
  btnDelete.classList.add("btn-delete");
  return btnDelete;
}

// toggle and delte list item

ul.addEventListener("click", function (ev) {
  if (ev.target.tagName === "LI") {
    // toggel when li clicked
    ev.target.classList.toggle("done");
  } else if (ev.target.tagName === "SPAN") {
    // delete li when span clicked
    // var todos = JSON.parse(localStorage.getItem("todos"));
    ev.target.parentElement.classList.add("delete");
    let todoValue = ev.target.parentElement.textContent;
    let finalTodoValue = todoValue.slice(0, todoValue.length - 1);
    // to delete todo item from an array
    const index = todos.findIndex((todo) => todo === finalTodoValue);
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
});
