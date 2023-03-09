export default class Task {
    constructor({id, taskName, isDone, isDeleted}) {
        this.id = id;
        this.taskName = taskName;
        this.isDone = isDone;
        this.isDeleted = isDeleted;
    }
}