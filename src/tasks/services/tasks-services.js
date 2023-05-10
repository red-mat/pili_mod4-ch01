const { TasksRepository } = require("../core/models");

class TasksServices {
    constructor(repository) {
        if (!(repository instanceof TasksRepository))
            throw new TypeError("repository not is TasksRepository")
        this.repository = repository
    }

    getAll() {
        return this.repository.getAll()
    }

    getById(id) {
        return this.repository.READ(id)
    }

    newTask(data) {
        return this.repository.CREATE(data)
    }

    updateTask(task) {
        return this.repository.UPDATE(task)
    }

    deleteTask(id) {
        return this.repository.DELETE(id)
    }
}

module.exports = TasksServices