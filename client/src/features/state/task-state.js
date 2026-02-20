export class TaskState {
  #tasks = [];

  addTask = (task) => this.#tasks.push(task);

  getTasks = () => this.#tasks;

  getTaskById = (id) => this.#tasks.find((task) => task.id === id);

  updateTask = (task) => {
    this.#tasks = this.#tasks.map((t) => (t.id === task.id ? task : t));
  };

  deleteTask = (task) => {
    this.#tasks = this.#tasks.filter((t) => t.id !== task.id);
  };
}
