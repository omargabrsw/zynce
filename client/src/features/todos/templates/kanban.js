// TODO: refactor this
export function renderKanban(tasks) {
  document.head.insertAdjacentHTML(
    "beforeend",
    `<link rel="stylesheet" href="./assets/css/kanban.css">`,
  );
  let grid = renderGrid(tasks);

  for (const column of grid.children) {
    const tasksContainer = column.querySelector(".column-tasks");

    tasks
      .filter((task) => task.taskStatus.toLowerCase() === column.id)
      .forEach((task) => {
        tasksContainer.insertAdjacentHTML(
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
  const statuses = tasks.map((task) => task.taskStatus);
  const uniqueStatuses = [...new Set(statuses)];

  uniqueStatuses.forEach((status) => {
    const statusColumn = document.createElement("div");
    statusColumn.id = status.toLowerCase();
    statusColumn.classList.add("status-column");

    // Header
    const header = document.createElement("div");
    header.classList.add("column-header");
    header.textContent = status;

    // Tasks container
    const tasksContainer = document.createElement("div");
    tasksContainer.classList.add("column-tasks");

    // Add task button container
    const addTaskContainer = document.createElement("div");
    addTaskContainer.classList.add("column-add");

    const addButton = document.createElement("button");
    addButton.textContent = "+ Add Task";
    addTaskContainer.appendChild(addButton);

    // Assemble column
    statusColumn.appendChild(header);
    statusColumn.appendChild(tasksContainer);
    statusColumn.appendChild(addTaskContainer);

    grid.appendChild(statusColumn);
  });

  return grid;
}
