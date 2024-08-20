let menu = document.querySelector('#menu-icon');
let navlist = document.querySelectorAll('.navlist');

menu.onclick= () => {
  menu.classList.toggle('bx-x');
  navlist.classList.toggle('open');
}

const sr = ScrollReveal({
  distance: '65px',
  duration: 2600,
  delay:450,
  reset: true
});

sr.reveal('.hero-text',{delay:200,origin:'top'});
sr.reveal('.hero-img',{delay:450,origin:'top'});
sr.reveal('.icons',{delay:200,origin:'top'});

// Get DOM elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const allTasksBtn = document.getElementById('all-tasks');
const completedTasksBtn = document.getElementById('completed-tasks');
const pendingTasksBtn = document.getElementById('pending-tasks');

// Function to load tasks from local storage
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        tasks.forEach(task => {
            createTaskElement(task.text, task.completed);
        });
    }
}

// Function to create a new task element
function createTaskElement(text, completed) {
    const li = document.createElement('li');
    li.textContent = text;
    if (completed) {
        li.classList.add('completed');
    }

    // Add check/uncheck functionality
    const checkBtn = document.createElement('button');
    checkBtn.textContent = completed ? 'undo' : 'done';
    checkBtn.addEventListener('click', () => {
        toggleTaskCompletion(li);
    });

    // Add delete functionality
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'delete';
    deleteBtn.addEventListener('click', () => {
        deleteTask(li);
    });

    const taskAction = document.createElement('div');
    taskAction.classList.add('task-action');
    taskAction.appendChild(checkBtn);
    taskAction.appendChild(deleteBtn);
    li.appendChild(taskAction);

    taskList.appendChild(li);
    saveTasks();
}

// Function to toggle task completion
function toggleTaskCompletion(li) {
    li.classList.toggle('completed');
    saveTasks();
}

// Function to delete a task
function deleteTask(li) {
    taskList.removeChild(li);
    saveTasks();
}

// Function to save tasks to local storage
function saveTasks() {
    const tasks = [];
    const taskItems = taskList.querySelectorAll('li');
    taskItems.forEach(item => {
        tasks.push({
            text: item.textContent,
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add task functionality
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        createTaskElement(taskText, false);
        taskInput.value = ''; // Clear input field
    }
});

// Filter functionality (all, completed, pending)
allTasksBtn.addEventListener('click', () => {
    taskList.querySelectorAll('li').forEach(item => {
        item.style.display = 'block'; 
    });
    allTasksBtn.classList.add('active');
    completedTasksBtn.classList.remove('active');
    pendingTasksBtn.classList.remove('active');
});

completedTasksBtn.addEventListener('click', () => {
    taskList.querySelectorAll('li').forEach(item => {
        item.style.display = item.classList.contains('completed') ? 'block' : 'none';
    });
    completedTasksBtn.classList.add('active');
    allTasksBtn.classList.remove('active');
    pendingTasksBtn.classList.remove('active');
});

pendingTasksBtn.addEventListener('click', () => {
    taskList.querySelectorAll('li').forEach(item => {
        item.style.display = !item.classList.contains('completed') ? 'block' : 'none';
    });
    pendingTasksBtn.classList.add('active');
    allTasksBtn.classList.remove('active');
    completedTasksBtn.classList.remove('active');
});

// Load tasks on page load mltb sabload karne ke liye page par
loadTasks();