let tasks = [];

// Load tasks from localStorage
function loadTasks() {
  let saved = localStorage.getItem("tasks");

  if (saved) {
    tasks = JSON.parse(saved);
    showTasks();
  }
}

// Add new task
function addTask() {
  let input = document.getElementById("taskInput").value;

  if (input === "") {
    alert("Please enter a task");
    return;
  }

  tasks.push(input);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  document.getElementById("taskInput").value = "";

  showTasks();
}

// Display tasks
function showTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  if (tasks.length === 0) {
    list.innerHTML = '<li class="empty-state">No tasks yet. Add one above!</li>';
    return;
  }

  tasks.forEach((task, index) => {
    list.innerHTML += `
      <li style="animation-delay: ${index * 0.05}s">
        <span class="task-text">${task}</span>
        <button class="delete" onclick="deleteTask(${index})">✕</button>
      </li>
    `;
  });
}

// Delete task with animation
function deleteTask(index) {
  let list = document.getElementById("taskList");
  let items = list.querySelectorAll("li");
  
  if (items[index]) {
    items[index].classList.add("removing");
    
    setTimeout(() => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      showTasks();
    }, 300);
  } else {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
  }
}

// Initial load
loadTasks();