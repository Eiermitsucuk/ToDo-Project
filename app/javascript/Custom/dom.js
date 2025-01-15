document.addEventListener("DOMContentLoaded", () => {    const renderButton = document.getElementById("renderWithJS");    if (renderButton) {        renderButton.addEventListener("click", () => {            const todosData = document.getElementById("todos-data").dataset.todos;            const todos = JSON.parse(todosData || "{}");            if (todos) {                renderToDos(todos);            } else {                console.error("No ToDo data found!");            }        });    }    function renderToDos(data) {        const statusToDos = {            to_do: document.getElementById("to_do_list"),            in_progress: document.getElementById("in_progress_list"),            done: document.getElementById("done_list"),        };        Object.values(statusToDos).forEach((container) => {            while (container.firstChild) {                container.removeChild(container.firstChild);            }        });        Object.keys(data).forEach((status) => {            const todos = data[status];            const container = statusToDos[status];            if (container && Array.isArray(todos)) {                todos.forEach((todo) => {                    const card = createToDoCard(todo, status);                    container.appendChild(card);                });            }        });    }    function createToDoCard(todo, status) {        const card = document.createElement("div");        const title = document.createElement("h5");        const cardBody = document.createElement("div");        const description = document.createElement("h5");        const descriptionLabel = document.createElement("strong");        const descriptionText = document.createTextNode(todo.description || "");        const deadline = document.createElement("p");        const deadlineLabel = document.createElement("strong");        const deadlineText = document.createTextNode(todo.deadline || "");        const showButton = document.createElement("a");        card.classList.add("card", "mb-3", "to-do-item");        card.setAttribute("data-id", todo.id);        cardBody.classList.add("card-body");        title.textContent = todo.title;        descriptionLabel.textContent = "Description: ";        description.appendChild(descriptionLabel);        description.appendChild(descriptionText);        deadlineLabel.textContent = "Deadline: ";        deadline.appendChild(deadlineLabel);        deadline.appendChild(deadlineText);        showButton.href = "#";        showButton.classList.add("btn", `btn-outline-${getButtonClass(status)}`, "btn-sm", "mt-2");        showButton.textContent = "Show this to do";        showButton.addEventListener("click", (event) => {            event.preventDefault();            modalShowMenu(todo.id);        });        cardBody.appendChild(title);        cardBody.appendChild(description);        cardBody.appendChild(deadline);        cardBody.appendChild(showButton);        card.appendChild(cardBody);        return card;    }    function modalShowMenu(todoId) {        fetch(`/to_dos/${todoId}.json`)            .then((response) => response.json())            .then((todo) => {                let modal = document.getElementById("todoModal");                if (!modal) {                    modal = document.createElement("dialog");                    modal.id = "todoModal";                    modal.style.width = "60%";                    modal.style.backgroundColor = "white";                    modal.style.border = "none";                    modal.style.borderRadius = "8px";                    modal.style.padding = "40px";                    modal.style.zIndex = "1400";                    document.body.appendChild(modal);                    modal.addEventListener("click", (event) => {                        if (event.target !== modal) {                            modal.close();                        }                    });                }                const card = document.createElement("div");                const header = document.createElement("div");                const body = document.createElement("div");                const title = document.createElement("h4");                const description = document.createElement("p");                const descriptionLabel = document.createElement("strong");                const status = document.createElement("p");                const statusLabel = document.createElement("strong");                const creator = document.createElement("p");                const creatorLabel = document.createElement("strong");                const assignee = document.createElement("p");                const assigneeLabel = document.createElement("strong");                const footer = document.createElement("div");                const editLink = document.createElement("a");                const backLink = document.createElement("a");                const deleteForm = document.createElement("form");                const methodInput = document.createElement("input");                const deleteButton = document.createElement("button");                modal.querySelectorAll(".dynamic-content").forEach((node) => node.remove());                card.classList.add("card", "dynamic-content");                header.classList.add("card-header", "bg-info", "text-white");                body.classList.add("card-body");                title.classList.add("card-title");                title.textContent = todo.title;                description.classList.add("card-text");                descriptionLabel.textContent = "Description: ";                description.appendChild(descriptionLabel);                description.appendChild(document.createTextNode(todo.description || "No description"));                status.classList.add("card-text");                statusLabel.textContent = "Status: ";                status.appendChild(statusLabel);                status.appendChild(document.createTextNode(todo.status || "Unknown"));                creator.classList.add("card-text");                creatorLabel.textContent = "Created by: ";                creator.appendChild(creatorLabel);                creator.appendChild(document.createTextNode(todo.creator?.email || "Unknown"));                assignee.classList.add("card-text");                assigneeLabel.textContent = "Assigned to: ";                assignee.appendChild(assigneeLabel);                assignee.appendChild(document.createTextNode(todo.assignee?.email || "Not Assigned"));                body.appendChild(title);                body.appendChild(description);                body.appendChild(status);                body.appendChild(creator);                body.appendChild(assignee);                footer.classList.add("card-footer", "text-center");                editLink.href = `/to_dos/${todo.id}/edit`;                editLink.classList.add("btn", "btn-warning", "me-2");                editLink.textContent = "Edit";                backLink.href = "/to_dos";                backLink.classList.add("btn", "btn-secondary", "me-2");                backLink.textContent = "Back to ToDos";                deleteForm.action = `/to_dos/${todo.id}`;                deleteForm.method = "post";                deleteForm.style.display = "inline";                methodInput.type = "hidden";                methodInput.name = "_method";                methodInput.value = "delete";                deleteButton.type = "submit";                deleteButton.classList.add("btn", "btn-danger");                deleteButton.textContent = "Delete";                deleteButton.setAttribute("data-confirm", "Are you sure?");                deleteForm.appendChild(methodInput);                deleteForm.appendChild(deleteButton);                footer.appendChild(editLink);                footer.appendChild(backLink);                footer.appendChild(deleteForm);                card.appendChild(header);                card.appendChild(body);                card.appendChild(footer);                modal.appendChild(card);                modal.showModal();            })            .catch((error) => {                console.error(error);            });    }    function getButtonClass(status) {        switch (status) {            case 'to_do':                return 'primary';            case 'in_progress':                return 'warning';            case 'done':                return 'success';            default:                return 'secondary';        }    }});