document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("todo-input") as HTMLInputElement;
    const addButton = document.getElementById("add-todo") as HTMLButtonElement;
    const todoList = document.getElementById("todo-list") as HTMLUListElement;

    const loadTodos = (): void => {
        const todos: string[] = JSON.parse(localStorage.getItem("todos") || "[]");
        todos.forEach(todo => addTodoToDOM(todo));
    };

    const saveTodos = (): void => {
        const todos: string[] = [];
        todoList.querySelectorAll("li").forEach(li => {
            todos.push(li.textContent || "");
        });
        localStorage.setItem("todos", JSON.stringify(todos));
    };

    const addTodoToDOM = (text: string): void => {
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

    // Add a console log to verify TypeScript compilation
    console.log("TypeScript is working!");
});