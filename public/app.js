import Todo from './Todo.js';

(function () {

    const todoList = {};

    function disableAddButton(disabled) {
        document.getElementById('add-btn').disabled = disabled;
    }

    function renderTodos() {
        const ulElement = document.getElementById('todoList');
        ulElement.innerHTML = "";
        for (const id in todoList) {
            const info = todoList[id];
            ulElement.append(info.render(toggleCheckHandler, deleteTodoHandler));
        }
    }

    /*** Funcoes que chamam api */

    async function fetchTodos() {
        const res = await fetch('/api/todos');
        const data = await res.json();

        data.rows.forEach((element) => {
            const object = Todo.createFromTableItem(element);
            todoList[object.getId()] = object
        });

        renderTodos();
    }

    async function addTodo() {
        const titleInput = document.getElementById('newTodoTitle');
        const title = titleInput.value.trim();

        if (!title) {
            titleInput.focus();
            return;
        }

        disableAddButton(true);
        const response = await fetch('/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title })
        });
        const data = await response.json();
        const todo = Todo.createFromTableItem(data);
        const id = todo.getId();
        todoList[id] = todo;
        titleInput.value = '';

        renderTodos();
        disableAddButton(false);
    }

    async function toggleCheckHandler(id) {
        const object = todoList[id];
        object.toogleCheck();
        disableAddButton(true);
        const response = await fetch(`/api/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(object.getRequestBody())
        });
        const data = await response.json();
        renderTodos();
        disableAddButton(false);
    }

    async function deleteTodoHandler(id) {
        disableAddButton(true);
        await fetch(`/api/todos/${id}`, {
            method: 'DELETE'
        });
        delete todoList[id];
        renderTodos();
        disableAddButton(false);
    }

    /*** Listener iniciais */

    // Suporte para Enter no input
    document.getElementById('newTodoTitle').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evita comportamento padrão
            addTodo(); // Chama função de adicionar
        }
    });

    //Incluir
    document.getElementById('add-btn').addEventListener('click', function (event) {
        addTodo();
    });


    fetchTodos();

})();
