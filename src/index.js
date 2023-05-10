const tasks = require("./data/tasks");
const HttpHandlers = require("./tasks/infrastructure/httpHandlers/handlers");
const InMemoryRepository = require("./tasks/infrastructure/repositories/in-memory");
const TasksServices = require("./tasks/services/tasks-services");
const Logger = require("./utils/logger");
const express = require("express");


const PORT = 2030;
const ROUTE = "/tasks";
const ROUTE_PARAM = ROUTE + "/:id";

const repository = new InMemoryRepository(tasks);
const services = new TasksServices(repository);
const httHandlers = new HttpHandlers(services);

const app = express();
app.use(express.json());

app.get(ROUTE, (req, res) => httHandlers.GET(req, res));
app.get(ROUTE_PARAM, (req, res) => httHandlers.GET_PARAM(req, res));

app.post(ROUTE, (req, res) => httHandlers.POST(req, res));

app.put(ROUTE, (req, res) => httHandlers.PUT(req, res));

app.delete(ROUTE_PARAM, (req, res) => httHandlers.DELETE(req, res));

app.listen(PORT, function () {
    Logger.success("INIT", `Server started on port ${PORT}`);
});
