
const app = document.getElementById('app');

 function fetchTasks() {

  return tasks = JSON.parse(fetch("http://localhost:8000/api/tasks"));

}


async function kanbanRender(app) {
const tasks = await fetchTasks();
  app.addEventListener('load',()=>{
tasks.forEach(task => {
  
});
  })

}
