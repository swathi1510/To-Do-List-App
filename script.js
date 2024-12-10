// Select elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Add task function
function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return alert('Please enter a task.');

  // Create task element
  const taskItem = document.createElement('li');
  taskItem.className = 'task-item';

  taskItem.innerHTML = `
    <span>${taskText}</span>
    <div class="task-actions">
      <button class="complete-btn">✔</button>
      <button class="delete-btn">✖</button>
    </div>
  `;

  // Add event listeners for actions
  taskItem.querySelector('.complete-btn').addEventListener('click', () => {
    taskItem.classList.toggle('completed');
  });

  taskItem.querySelector('.delete-btn').addEventListener('click', () => {
    taskItem.remove();
  });

  // Append to task list and clear input
  taskList.appendChild(taskItem);
  taskInput.value = '';
}

// Event listeners
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});