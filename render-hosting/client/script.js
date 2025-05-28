const todos = document.querySelector('#todos');
const todoForm = document.querySelector('#todo-form');

const handleLoad = async () => {
    const todosJson = await getTodos();
    const todoData = todosJson.data.todos;

    for (const [_, v] of Object.entries(todoData)) {
        console.log(v)

        const div = document.createElement('div');
        const h3 = document.createElement('h3');
        const deadline = document.createElement('p');
        const checked = document.createElement('input');

        div.appendChild(h3);
        div.appendChild(deadline);
        div.appendChild(checked);
        div.classList.add('todo');

        h3.textContent = v.title;
        deadline.textContent = v.deadline;
        checked.type = 'checkbox';
        checked.checked = v.completed ? true : false

        todos.appendChild(div);
    };
};

const getTodos = async () => {
    const req = await fetch('http://localhost:5000/todos/get-all', {
        method: 'GET'
    });
    const data = await req.json();

    // console.table(data)

    return data;
};

const handleFormSubmit = (e) => {
    e.preventDefault();
};

window.addEventListener('load', handleLoad);
todoForm.addEventListener('submit', handleFormSubmit);