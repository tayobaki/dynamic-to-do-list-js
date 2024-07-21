document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-button');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function addTask(taskText, save = true) {
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    const li = document.createElement('li');
    li.textContent = taskText;
    li.classList.add('task-item');

    const removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    removeButton.className = 'remove-btn';
    removeButton.onclick = () => {
      taskList.removeChild(li);
      const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      const updatedTasks = tasks.filter(task => task !== taskText);
      saveTasks(updatedTasks);
    };

    li.appendChild(removeButton);
    taskList.appendChild(li);

    if (save) {
      const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      tasks.push(taskText);
      saveTasks(tasks);
    }

    taskInput.value = "";
  }

  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false));
  }

  addButton.addEventListener('click', () => addTask(taskInput.value.trim()));

  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask(taskInput.value.trim());
    }
  });

  loadTasks();
});
