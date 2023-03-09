export default class Task {
    constructor({id, taskName, isDone, isDeleted}) {
        this.id = id;
        this.taskName = taskName;
        this.isDone = isDone;
        this.isDeleted = isDeleted;
    }

    serialize() {
        let id = this.id;
        let taskName = this.taskName;
        let isDone = this.isDone;
        let isDeleted = this.isDeleted;

        return { id, taskName, isDone, isDeleted };
    }
}