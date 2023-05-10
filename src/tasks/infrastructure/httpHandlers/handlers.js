const Logger = require("../../../utils/logger")

class HttpHandlers {
    constructor(services) {
        this.services = services
        Logger.success('INSTANCE', 'httpHandlers')
    }

    async GET(_req, res) {
        Logger.log('GET', '/tasks get all tasks')
        const tasks = await this.services.getAll()
        res.json(tasks)
    }

    async GET_PARAM(req, res) {
        const { id } = req.params;

        Logger.log("GET", `/tasks/${id}`);

        const task = await this.services.getById(id);
        if (task) res.send(task);
        if (!task) {
            Logger.warn(`Task with id ${id} was not found.`)
            res.status(404).send({ error: `Task with id ${id} was not found.` })
        }
    }

    async POST(req, res) {
        const data = req.body;
        const task = await this.services.newTask(data);

        Logger.log("POST", `data: ${JSON.stringify(data)}`);

        if (task) res.status(201).send(task);
        if (!task) {
            Logger.warn("fail create new task");
            res.status(400).send({ error: "fail create new task" })
        }

    }

    async PUT(req, res) {
        const task = req.body;
        const newTask = await this.services.updateTask(task);

        Logger.log("PUT", `/tasks`);

        if (newTask) res.send(newTask);
        if (!newTask) {
            Logger.warn("fail update task");
            res.status(400).send({ error: "fail update task" })
        }

    }

    async DELETE(req, res) {
        const { id } = req.params;
        const deleteTask = await this.services.deleteTask(id);

        Logger.log("DELETE", `/tasks`);

        if (deleteTask) res.send([deleteTask]);
        if (!deleteTask) {
            Logger.warn(`Cannot DELETE task ${id}`);
            res.status(500).send({ error: `Cannot DELETE task ${id}` })
        }

    }
}

module.exports = HttpHandlers