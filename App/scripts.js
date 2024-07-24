document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('todo-input');
    const dateInput = document.getElementById('date-input');
    const priorityInput = document.getElementById('priority-input');
    const addButton = document.getElementById('add-btn');
    const clearButton = document.getElementById('clear-btn');
    const filterTasks = document.getElementById('filter-tasks');
    const todoList = document.getElementById('todo-list');

    loadTasks();

    addButton.addEventListener('click', () => {
        const task = taskInput.value.trim();
        const date = dateInput.value;
        const priority = priorityInput.value;
        if (task && date) {
            addTask(task, date, priority);
            taskInput.value = '';
            dateInput.value = '';
            priorityInput.value = 'Low';
        }
    });

    clearButton.addEventListener('click', () => {
        todoList.innerHTML = '';
        saveTasks();
    });

    filterTasks.addEventListener('change', filterTaskList);

    todoList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            e.target.parentElement.remove();
            saveTasks();
        } else if (e.target.tagName === 'LI') {
            e.target.classList.toggle('done');
            saveTasks();
        }
    });

    function addTask(task, date, priority) {
        const li = document.createElement('li');
        li.textContent = task;

        const dateSpan = document.createElement('span');
        dateSpan.textContent = date;
        dateSpan.classList.add('date');
        li.appendChild(dateSpan);

        const prioritySpan = document.createElement('span');
        prioritySpan.textContent = priority;
        prioritySpan.classList.add('priority');
        li.appendChild(prioritySpan);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'x';
        li.appendChild(removeButton);

        todoList.appendChild(li);
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        todoList.querySelectorAll('li').forEach(li => {
            tasks.push({
                task: li.childNodes[0].textContent,
                date: li.querySelector('.date').textContent,
                priority: li.querySelector('.priority').textContent,
                done: li.classList.contains('done')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskObj => {
            const { task, date, priority, done } = taskObj;
            addTask(task, date, priority);
            if (done) {
                todoList.lastChild.classList.add('done');
            }
        });
    }

    function filterTaskList() {
        const filter = filterTasks.value;
        todoList.querySelectorAll('li').forEach(li => {
            switch (filter) {
                case 'all':
                    li.style.display = '';
                    break;
                case 'completed':
                    li.style.display = li.classList.contains('done') ? '' : 'none';
                    break;
                case 'incomplete':
                    li.style.display = li.classList.contains('done') ? 'none' : '';
                    break;
            }
        });
    }
});
