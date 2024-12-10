// Select DOM Elements
const taskInput = document.getElementById('task-input');
const deadlineInput = document.getElementById('deadline-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Add Task Function
function addTask() {
  const taskText = taskInput.value.trim();
  const deadline = deadlineInput.value;

  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  if (deadline === '') {
    alert('Please set a deadline!');
    return;
  }

  // Create List Item
  const listItem = document.createElement('li');

  // Add Task Content and Buttons
  listItem.innerHTML = `
    <span class="task-text">${taskText}</span>
    <div class="details">
      <span class="deadline">Deadline: ${new Date(deadline).toLocaleString()}</span>
      <button onclick="toggleDone(this)">✔</button>
      <button onclick="removeTask(this)">✖</button>
    </div>
  `;

  // Append to Task List
  taskList.appendChild(listItem);

  // Clear Inputs
  taskInput.value = '';
  deadlineInput.value = '';

  // Check if Task is Overdue
  checkOverdue();
}

// Toggle Task Completion
function toggleDone(button) {
  const taskItem = button.closest('li');
  taskItem.classList.toggle('done');
}

// Remove Task Function
function removeTask(button) {
  const taskItem = button.closest('li');
  taskList.removeChild(taskItem);
}

// Check Overdue Tasks
function checkOverdue() {
  const tasks = document.querySelectorAll('.task-list li');
  const now = new Date();

  tasks.forEach(task => {
    const deadlineText = task.querySelector('.deadline').textContent;
    const deadlineDate = new Date(deadlineText.replace('Deadline: ', ''));

    if (deadlineDate < now && !task.classList.contains('done')) {
      task.classList.add('overdue');
    } else {
      task.classList.remove('overdue');
    }
  });
}

// Event Listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});
setInterval(checkOverdue, 60000); // Check overdue tasks every minute
