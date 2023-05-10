const Logger = require("../../../utils/logger");
const { TasksRepository, TaskRepository, Task } = require("../../core/models");

const getNewId = (listTask) => listTask[listTask.length - 1].id + 1

class InMemoryRepository extends TasksRepository {
    constructor(tasks = []) {
        super();
        this.tasks = tasks;
    }

    async getAll() {
        return this.tasks;
    }

    async CREATE(data) {
        const task = new Task(data);

        if (!task.isValid()) {
            Logger.error('task not is valid')

            return null
        }


        const id = getNewId(this.tasks)
        const taskRepository = TaskRepository.New(id, task)
        this.tasks.push(taskRepository);

        return taskRepository;
    }

    async READ(id) {
        const tasks = this.tasks.filter((t) => t.id == id)[0];

        return tasks ?? null;
    }

    async UPDATE(task) {
        const taskUpdated = new TaskRepository(task)

        if (!taskUpdated.isValid()) return null

        const currentTask = await this.READ(task.id);
        if (!currentTask) return null;

        const tasks = this.tasks.filter((t) => t.id !== task.id);
        tasks.push(taskUpdated);

        this.tasks = tasks.sort((t1, t2) => t1.id - t2.id);

        return task;
    }

    async DELETE(id) {
        const task = this.READ(id);
        if (!task) return null;

        const tasks = this.tasks.filter((t) => t.id != id);
        this.tasks = tasks.sort((t1, t2) => t1.id - t2.id);

        return task;
    }
}

module.exports = InMemoryRepository;
