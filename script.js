let todoArray = JSON.parse(localStorage.getItem("todoArr")) || [];

function todo() {
  const id = (Math.random().toFixed(10) * 10000000000).toFixed(0);
  const inputValue = document.querySelector(".js-todo-input").value;
  const date = document.querySelector(".js-todo-due-date").value;

  if (inputValue) {
    todoArray.push({
      id,
      inputValue,
      date,
    });

    saveToStorage();
    todoList();
  } else {
    alert("Enter todo input");
  }
}
function saveToStorage() {
  localStorage.setItem("todoArr", JSON.stringify(todoArray));
}

todoList();
function todoList() {
  let html = "";
  todoArray.forEach((item) => {
    html += `
    <div class="js-todo-list-div todo-list-grid">
<div class="display-input-value js-input-value-${item.id}" value=${item.inputValue}>
${item.inputValue}
</div>
<div>
  ${item.date}
  </div>
  <div class="todo-list-grid-buttons"><button class="todo-edit-button js-todo-edit-button" data-value-id=${item.id} data-input-value=${item.inputValue}>Edit</button>
  <button class="delete-todo-button js-delete-todo-button" data-value-id=${item.id} >Delete</button></div>
  </div>
`;
  });
  document.querySelector(".js-display-container").innerHTML = html;

  document.querySelectorAll(".js-todo-edit-button").forEach((button) => {
    button.addEventListener("click", () => {
      const { valueId } = button.dataset;
      todoArray.forEach((item) => {
        if (item.id == valueId) {
          const inputData = item.inputValue;
          const newValue = prompt("Your Previous Todo Name:", `${inputData}`);
          if (newValue) {
            item.inputValue = newValue;
          }
          saveToStorage();
          todoList();
        }
      });
    });
  });

  document.querySelectorAll(".js-delete-todo-button").forEach((button) => {
    button.addEventListener("click", () => {
      const { valueId } = button.dataset;
      let newArray = [];
      todoArray.forEach((item) => {
        if (item.id != valueId) newArray.push(item);
      });
      todoArray = newArray;
      saveToStorage();
      todoList();
    });
  });
}

function resetTodoList() {
  if (todoArray.length != 0) {
    const confirmation = confirm("Do you wish to reset the list");
    if (confirmation) {
      localStorage.removeItem("todoArr");
      todoArray = [];
      todoList();
    }
  } else {
    alert("The list is empty");
  }
}
