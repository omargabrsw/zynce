//Import taskController
import {getTasks} from "../controllers/taskController.js";

export function handleRoutes(req,res){
  //Get Tasks
  if (req.method === "GET" && req.url === "/api/tasks") {
    return getTasks(req,res);
  }

    res.writeHead(404, "Not Found");
}
