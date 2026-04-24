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

  tasks.push({ text: input, completed: false });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  document.getElementById("taskInput").value = "";

  showTasks();
}

// Add task on Enter key
document.getElementById("taskInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// Display tasks
function showTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  // Show/hide Clear All button
  let clearBtn = document.getElementById("clearAllBtn");
  clearBtn.style.display = tasks.length > 0 ? "block" : "none";

  if (tasks.length === 0) {
    list.innerHTML = '<li class="empty-state">No tasks yet. Add one above!</li>';
    return;
  }

  tasks.forEach((task, index) => {
    let completedClass = task.completed ? "completed" : "";
    list.innerHTML += `
      <li class="${completedClass}" style="animation-delay: ${index * 0.05}s">
        <span class="task-text" onclick="toggleComplete(${index})">${task.text}</span>
        <div class="actions">
          <button class="complete-btn" onclick="toggleComplete(${index})">✓</button>
          <button class="edit-btn" onclick="editTask(${index})">✏️</button>
          <button class="delete" onclick="deleteTask(${index})">✕</button>
        </div>
      </li>
    `;
  });
}

// Toggle complete status
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTasks();
}

// Edit task
function editTask(index) {
  let newText = prompt("Edit your task:", tasks[index].text);
  
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
  }
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

// Clear all tasks
function clearAllTasks() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
  }
}

// Initial load
loadTasks();

// Initial load
loadTasks();