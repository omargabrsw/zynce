let input = document.getElementById('task-name');
let submitBtn = document.querySelector("[type='submit']");
let taskList = document.querySelector('.tasks');
let savedTasks = JSON.parse(window.localStorage.getItem('tasks')) || [];
renderTasks();

submitBtn.addEventListener('click', () => {
  savedTasks.push(input.value.trim());
  localStorage.setItem('tasks', JSON.stringify(savedTasks));
  renderTasks();
});

function renderTasks() {
  if (savedTasks) {
    taskList.innerHTML = '';
    savedTasks.forEach((element, index) => {
      let task = document.createElement('li');
      task.classList.add('task');
      let taskTitle = document.createElement('p');
      taskTitle.textContent = element;
      let deleteBtn = document.createElement('button');
      deleteBtn.classList.add('delete-button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = () => {
        savedTasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
        renderTasks();
      };
      task.append(taskTitle, deleteBtn);
      taskList.append(task);
    });
  }
}
