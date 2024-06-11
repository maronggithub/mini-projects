const form = document.getElementById("form");
const taskTitleinput = document.getElementById("task-title");
const errorMessage = document.getElementById("error-message");
const textRequireMessage = document.getElementById("text-require-message");
const taskDetailinput = document.getElementById("task-detail");
const dueDateinput = document.getElementById("due-date");
const addTask = document.getElementById("add-task");
const todoList = document.getElementById("todos");
// const beAdded = document.getElementById("be-ad");
let isComposing = false;

// Limit the input to 10 characters
taskTitleinput.addEventListener("compositionstart", () => {
            isComposing = true;
        });

taskTitleinput.addEventListener("compositionend", () => {
            isComposing = false;
            validateInput();
        });

taskTitleinput.addEventListener("input",()=> {
    if(!isComposing) {
        validateInput();
    }
});

function validateInput() {
    if(taskTitleinput.value.length > 10) {
        taskTitleinput.value = taskTitleinput.value.slice(0,10);
        errorMessage.style.display = "block";
    } else {
        errorMessage.style.display = "none";
    }
};


// task-detail pull down function
function toggleDetailBox(icon) {
    icon.addEventListener('click', () => {
        const taskElement = icon.closest('.task');
        taskElement.classList.toggle('expanded');
        if (icon.classList.contains('fa-circle-arrow-down')) {
            icon.classList.remove('fa-circle-arrow-down');
            icon.classList.add('fa-circle-arrow-up');
        } else {
            icon.classList.remove('fa-circle-arrow-up');
            icon.classList.add('fa-circle-arrow-down');
        }
    });
}
// Initial event listeners for already existing icons
document.querySelectorAll('.fa-circle-arrow-down').forEach(icon => {
    toggleDetailBox(icon);
});

//delete function
function deleteTask(icon) {
    icon.addEventListener('click', () => {
        const deleteElement = icon.closest('.task');
        const taskTitle = deleteElement.querySelector('.todo').innerText;
        deleteElement.remove();
        deleteTodoFromLocalStorage(taskTitle);
    });
}

function deleteTodoFromLocalStorage(taskTitle) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(todo => todo.title !== taskTitle);
    localStorage.setItem('todos', JSON.stringify(todos));
}


//load tasks from localstorage
// const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
// todoList.innerHTML = '';
// savedTodos.forEach(todo => {
//     addTodoElement(todo);
// });

// Check if task exists in local storage
function isTaskExist(title,detail, dueDate) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    return todos.some(todo => todo.title === title&&todo.detail === detail && 
        todo.dueDate === dueDate);
}

//addTask function
addTask.addEventListener("click", (e) => {
    e.preventDefault();
    const taskTitle = taskTitleinput.value.trim();
    const taskDetail = taskDetailinput.value.trim();
    const dueDate = dueDateinput.value ? dueDateinput.value : "-";

    if (taskTitle) {
        if (isTaskExist(taskTitle, taskDetail, dueDate)) {
            textRequireMessage.style.display = "block";
            textRequireMessage.textContent = "Task already added!";
            taskTitleinput.addEventListener('focus', () => {
            taskTitleinput.value = '';
            taskDetailinput.value = '';
            dueDateinput.value = '';
            textRequireMessage.style.display = 'none';

        });
        } else {
            const todo = {
                title: taskTitle,
                detail: taskDetail,
                dueDate: dueDate,
                completed: false
            };
            addTodoElement(todo);
            saveTodoToLocalStorage(todo);
            taskTitleinput.value = '';
            taskDetailinput.value = '';
            dueDateinput.value = '';
            textRequireMessage.style.display = "none";
        }
    } else {
        textRequireMessage.style.display = "block";
        textRequireMessage.textContent = "Task title is required!";
        taskTitleinput.addEventListener('focus', () => {
            textRequireMessage.style.display = 'none';
        });
    }
});

//show task on website
function addTodoElement(todo) {
    const li = document.createElement('li');
    li.classList.add('task');
    if (todo.completed) {
        li.classList.add('complete');
    }
    li.innerHTML = `
        <div id="info-box">
            <span class="todo">${todo.title}</span>
            <span class="due-date">Due date: ${todo.dueDate}</span>
            <p id="icon-box">
                <i class="fa-solid fa-circle-arrow-down"></i>
                <i class="fa-solid fa-trash-can"></i>
            </p>
        </div>
        <p id="detail-box">${todo.detail}</p>`;
        if (todo.completed) {
            completeList.appendChild(li);
                } else {
            todoList.appendChild(li);
            }
        const newIcon = li.querySelector('.fa-circle-arrow-down');
        const deleteIcon = li.querySelector('.fa-trash-can');
        toggleDetailBox(newIcon);
        deleteTask(deleteIcon);
        li.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() !== 'i') { // Prevent triggering when clicking icons
            toggleCompleteTask(li, todo);
        }
    });
};

function saveTodoToLocalStorage(todo) {
            const todos = JSON.parse(localStorage.getItem('todos')) || [];
            todos.push(todo);
            localStorage.setItem('todos', JSON.stringify(todos));
        }


function updateTodoInLocalStorage(updatedTodo) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const index = todos.findIndex(todo => todo.title === updatedTodo.title);
    if (index !== -1) {
        todos[index] = updatedTodo;
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

function loadTodosFromLocalStorage() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(addTodoElement);
}

function toggleCompleteTask(taskElement, todo) {
    todo.completed = !todo.completed;
    taskElement.classList.toggle('complete');
    if (todo.completed) {
        completeList.appendChild(taskElement);
    } else {
        todoList.appendChild(taskElement);
    }
    updateTodoInLocalStorage(todo);
}

loadTodosFromLocalStorage();
