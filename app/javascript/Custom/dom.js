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
    const statusToDos = {
        to_do: document.getElementById("to_do_list"),
        in_progress: document.getElementById("in_progress_list"),
        done: document.getElementById("done_list"),
    };

    Object.values(statusToDos).forEach((container) => {
        if (container) {
            container.innerHTML = "";
        } else {
            console.error("Error");
        }
    });
if (data && typeof data === 'object') {
    Object.keys(data).forEach((status) => {
        const todos = data[status];
        const container = statusToDos[status];

        if (container && Array.isArray(todos)) {
            todos.forEach((todo) => {
                const todoElement = document.createElement("div");
                todoElement.setAttribute("data-id", todo.id);
                todoElement.innerHTML = `
                <div class="card-body">
                  <h5>${todo.title}</h5>
                  <p><strong>Description:</strong> ${todo.description || "No description"}</p>
                  <p><strong>Deadline:</strong> ${todo.deadline || "No deadline"}</p>
                  <p><a href="/to_dos/${todo.id}" class="btn btn-outline-primary btn-sm mt-2">Show this to do</a></p>
                </div>
              `;
                container.appendChild(todoElement);
            })
        }
    });
}}