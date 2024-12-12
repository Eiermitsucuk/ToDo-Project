document.addEventListener("DOMContentLoaded", () => {
    const renderButton = document.getElementById("renderWithJS");

    if (renderButton) {
        renderButton.addEventListener("click", () => {
            fetchToDos();
        });
    }

    function fetchToDos() {
        fetch("http://127.0.0.1:3000/to_dos.json")
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched ToDos:", data);
                renderToDos(data);
            })
            .catch((error) => {
                console.error("Error fetching ToDos:", error);
            });
    }
});

function renderToDos(data) {
    const container = document.getElementById("todos-container");
    let todos;
    if (Array.isArray(data)) {
        todos = data;
    } else {
        todos = [];
    }
    todos.forEach(todo => {
        const todoElement = document.createElement("div");
        todoElement.classList.add("todo-item");
        todoElement.innerHTML = `
          <h3>${todo.title}</h3>
          <p>Status: ${todo.status}</p>
        `;
        container.appendChild(todoElement);
    });
}
