class Task {
    constructor(task) {
        this.title = task.title
        this.completed = task.completed
    }

    static New(title) {
        return new Task({
            title,
            completed: false
        })
    }

    isValid() {
        if (typeof this.title !== 'string') return false;
        if (typeof this.completed !== 'boolean') return false;

        return true
    }
}

class TaskRepository extends Task {
    constructor(task) {
        super(task)
        this.id = task.id
    }

    static New(id, task) {
        return new TaskRepository({ id, ...task })
    }

    isValid() {
        if (typeof myVariable === 'number') return false
        if (!super.isValid()) return false

        return true
    }
}

class TasksRepository {
    async getAll() {
        throw new Error("getAll Method not implemented.");
    }
    async CREATE(data) {
        throw new Error("CREATE Method not implemented.");
    }
    async READ(id) {
        throw new Error("READ Method not implemented.");
    }
    async UPDATE(task) {
        throw new Error("UPDATE Method not implemented.");
    }
    async DELETE(id) {
        throw new Error("DELETE Method not implemented.");
    }
}

module.exports = {
    Task,
    TaskRepository,
    TasksRepository
}