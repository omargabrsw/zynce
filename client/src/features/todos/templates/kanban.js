export function renderKanban(tasks) {
  document.head.insertAdjacentHTML(
    "beforeend",
    `<link rel="stylesheet" href="./assets/css/kanban.css">`,
  );
  let grid = renderGrid(tasks);
  for (const child of grid.children) {
    tasks
      .filter((task) => task.taskStatus.toLowerCase() === child.id)
      .forEach((task) => {
        child.insertAdjacentHTML(
          "beforeend",
          `
      <div class="task" data-id="${task.taskId}">
        <h3 class="task-title">${task.taskName}</h3>
        <p class="task-desc">${task.taskDesc}</p>
        <p class="task-status">${task.taskStatus}</p>
      </div>
          `,
        );
      });
  }
}

function renderGrid(tasks) {
  const grid = document.createElement("div");
  grid.id = "kanban-grid";
  document.getElementById("app").appendChild(grid);
  tasks.forEach((task) => {
    const statusColumn = document.createElement("div");
    statusColumn.id = task.taskStatus.toLowerCase();
    statusColumn.classList.add("status-column");
    grid.appendChild(statusColumn);
  });

  return grid;
}
