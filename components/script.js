// Get elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const toggleBtn = document.getElementById('theme-toggle');
const themeStyle = document.getElementById('theme-style');

// Function to create a new To-Do item
function addTask() {
    const taskText = todoInput.value.trim();

    // Check if the input is not empty
    if (taskText !== '') {
        const li = document.createElement('li');
        li.classList.add('task');
        li.innerHTML = `${taskText} <button class="remove" onclick="removeTask(this)"><i class="fa fa-trash"></i></button>`;

        // Append to the list
        todoList.appendChild(li);

        // Save the updated list to localStorage
        saveTasks();

        todoInput.value = ''; // Clear input field
    }
}

// Function to remove a task
function removeTask(button) {
    const taskItem = button.parentElement;
    todoList.removeChild(taskItem);

    // Save the updated list to localStorage after removal
    saveTasks();
}

// Function to save tasks to localStorage
function saveTasks() {
    const tasks = [];
    const taskItems = todoList.querySelectorAll('li');
    taskItems.forEach(task => {
        tasks.push(task.firstChild.textContent.trim()); // Only store the task text
    });

    // Save the tasks array as a string in localStorage
    localStorage.setItem('todos', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('todos'));

    // If there are any stored tasks, add them to the list
    if (storedTasks && storedTasks.length > 0) {
        storedTasks.forEach(taskText => {
            const li = document.createElement('li');
            li.classList.add('task');
            li.innerHTML = `${taskText} <button class="remove" onclick="removeTask(this)"><i class="fa fa-trash"></i></button>`;
            todoList.appendChild(li);
        });
    }
}

// Add task when "Add" button is clicked
addBtn.addEventListener('click', addTask);

// Add task when Enter key is pressed
todoInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Theme toggle functionality
toggleBtn.addEventListener('click', function() {
    // Toggle the theme between light and dark
    const isDarkTheme = document.body.classList.contains('dark-theme');

    if (isDarkTheme) {
        // Switch to light theme
        document.body.classList.remove('dark-theme');
        themeStyle.setAttribute('href', 'style-light.css');
        toggleBtn.innerHTML = '<i class="fa fa-moon"></i>';
    } else {
        // Switch to dark theme
        document.body.classList.add('dark-theme');
        themeStyle.setAttribute('href', 'style-dark.css');
        toggleBtn.innerHTML = '<i class="fa fa-sun"></i>';
    }
});

// Load tasks from localStorage when the page loads
window.addEventListener('load', loadTasks);
