export class Task {
  constructor(taskId, taskName, taskDesc, taskStatus) {
    this.taskId = taskId;
    this.taskName = taskName;
    this.taskDesc = taskDesc;
    this.taskStatus = taskStatus;
  }
  isPending() {
    return this.taskStatus.toLowerCase() === "pending";
  }
  isDone() {
    return this.taskStatus.toLowerCase() === "done";
  }
}
