function Todo(newTitle, id) {

    const uuid = id;
    let isChecked = false;
    const title = newTitle;

    /** Retornar o id */
    this.getId = () => {
        return uuid;
    }

    this.toogleCheck = () => {
        isChecked = !isChecked;
    }

    this.isChecked = () => {
        return isChecked;
    }

    this.getTitle = () => {
        return title;
    }

    this.getRequestBody = () => {
        return {
            title: title,
            is_checked: isChecked
        }
    }

    /** Criar o elemento li */
    this.render = function (toggleCallback, deleteCallback) {
        const liElement = document.createElement('li');
        liElement.className = 'list-group-item d-flex justify-content-between align-items-center';

        const labelElement = document.createElement('label');
        labelElement.className = "form-check flex-grow-1 d-flex align-items-center";
        labelElement.style = "cursor:pointer";

        const checkboxElement = document.createElement('input');
        checkboxElement.type = 'checkbox';
        checkboxElement.className = 'form-check-input me-2';
        checkboxElement.checked = isChecked;
        checkboxElement.addEventListener("change", () => {
            toggleCallback(uuid);
        });

        const spanElement = document.createElement('span');
        spanElement.textContent = title;
        if (isChecked) {
            spanElement.className = 'text-decoration-line-through text-muted';
        }

        labelElement.appendChild(checkboxElement);
        labelElement.appendChild(spanElement);

        const deleteButtonElement = document.createElement('button');
        deleteButtonElement.className = 'btn btn-sm btn-danger ms-2';
        deleteButtonElement.textContent = 'Excluir';
        deleteButtonElement.addEventListener("click", () => {
            deleteCallback(uuid);
        });

        liElement.appendChild(labelElement);
        liElement.appendChild(deleteButtonElement);

        return liElement;
    }
}

Todo.createFromTableItem = (data) => {
    const object = new Todo(data.title, data.id);
    if (data.is_checked) {
        object.toogleCheck();
    }

    return object;
}

export default Todo;
