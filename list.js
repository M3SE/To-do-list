document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("todo-input");
    const addButton = document.getElementById("add-todo");
    const todoList = document.getElementById("todo-list");

    const loadTodos = () => {
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos.forEach(todo => addTodoToDOM(todo));
    };

    const saveTodos = () => {
        const todos = [];
        todoList.querySelectorAll("li").forEach(li => {
            todos.push(li.textContent);
        });
        localStorage.setItem("todos", JSON.stringify(todos));
    };

    const addTodoToDOM = (text) => {
        const li = document.createElement("li");
        li.textContent = text;
        li.addEventListener("click", () => {
            li.classList.add("crossed");
            setTimeout(() => {
                li.remove();
                saveTodos();
            }, 1000);
        });
        todoList.appendChild(li);
    };

    addButton.addEventListener("click", () => {
        const todoText = input.value.trim();
        if (todoText !== "") {
            addTodoToDOM(todoText);
            input.value = "";
            saveTodos();
        }
    });

    loadTodos();
});
