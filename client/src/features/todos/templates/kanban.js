export function renderKanban(tasks) {
  document.head.insertAdjacentHTML('beforeend',`<link rel="stylesheet" href="./assets/css/kanban.css">`)
  let grid = document.getElementById('kanban-grid');
  let pending = document.getElementById('pending');
  let inProgress = document.getElementById('in-progress');
  let done = document.getElementById('done');
  if (!grid) {
    grid = document.createElement('div');
    grid.id = 'kanban-grid';
    document.getElementById('app').prepend(grid);
  }
  if (!pending) {
    pending = document.createElement('div');
    pending.id = 'pending';
    grid.appendChild(pending);
  }
  if (!inProgress) {
    inProgress = document.createElement('div');
    inProgress.id = 'in-progress';
    grid.appendChild(inProgress);
  }
  if (!done) {
    done = document.createElement('div');
    done.id = 'done';
    grid.appendChild(done);
  }
  tasks.forEach((task) => {
    if (task.status.toLowerCase() === pending.id)
      pending.insertAdjacentHTML("beforeend", `
       <h3 class='task-title'>${task.task_name}</h3>
       <p class='task-desc'>${task.task_description}<p>
       <p class='task-status'>${task.status}<p>
`);

    if (task.status.toLowerCase() === inProgress.id)
      inProgress.insertAdjacentHTML("beforeend", `
       <h3 class='task-title'>${task.task_name}</h3>
       <p class='task-desc'>${task.task_description}<p>
       <p class='task-status'>${task.status}<p>
`);
    if (task.status.toLowerCase() === done.id)
      done.insertAdjacentHTML("beforeend", `
       <h3 class='task-title'>${task.task_name}</h3>
       <p class='task-desc'>${task.task_description}<p>
       <p class='task-status'>${task.status}<p>
`);
    console.table(tasks);
    console.log(task.task_name);
    console.log(task.task_description);
    console.log(task.status);
  });
}
