const mainTodoElem = document.querySelector(".todo-lists-elem");
const inputValue = document.getElementById("inputValue");

const getTodoListFromLocal = () => {
  return JSON.parse(localStorage.getItem("todoList"));
};

const addTodoListFromLocalStorage = (localTodoLists) => {
  return localStorage.setItem("todoList", JSON.stringify(localTodoLists));
};

let localTodoLists = getTodoListFromLocal() || [];

const addTodoDynamicElement = (curElem) => {
  const divElement = document.createElement("div");
  divElement.classList.add("main_todo_div");
  divElement.innerHTML = `<li>${curElem}</li> <button class="deleteBtn">Delete</button>`;
  mainTodoElem.append(divElement);
};

const addTodoList = (e) => {
  e.preventDefault();
  // console.log("hyy")
  const todoListValue = inputValue.value.trim();
  inputValue.value = "";

  if (todoListValue != "" && !localTodoLists.includes(todoListValue)) {
    localTodoLists.push(todoListValue);
    localTodoLists = [...new Set(localTodoLists)];
    // console.log(localTodoLists);
    localStorage.setItem("todoList", JSON.stringify(localTodoLists));

    //! const divElement = document.createElement("div");
    //! divElement.classList.add("main_todo_div");
    //! divElement.innerHTML = `<li>${inputValue.value}</li> <button class="deleteBtn">Delete</button>`;
    //! mainTodoElem.append(divElement);
    addTodoDynamicElement(todoListValue);
  }
};

const showTodoList = () => {
  localTodoLists.forEach((curElem) => {
    addTodoDynamicElement(curElem);
  });
};

showTodoList();

// remove the data

const removeTodoElem = (e) => {
  const todoToRemove = e.target;
  let todoListContent = todoToRemove.previousElementSibling.innerText;
  let parentElem = todoToRemove.parentElement;
//   console.log(todoListContent);

  localTodoLists = localTodoLists.filter((curTodo) => {
    return curTodo != todoListContent.toLowerCase();
  });

  addTodoListFromLocalStorage(localTodoLists);
  parentElem.remove();
//   console.log(localTodoLists);
};

mainTodoElem.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("deleteBtn")) {
    removeTodoElem(e);
  }
});

document.querySelector(".btn").addEventListener("click", (e) => {
  addTodoList(e);
});
