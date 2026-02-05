// HTTP NodeJS Module import

import * as http from "node:http";

import { handleRoutes } from "./routes/taskRoutes";

// Make Web Server

const server = http.createServer(

server.on('request',handleRoutes(req,res)));

server.listen(8000, "127.0.0.1");

