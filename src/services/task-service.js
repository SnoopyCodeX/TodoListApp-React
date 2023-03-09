const SERVICE_URL = 'http://localhost:3001/tasks';

const createTask = (task) => {
    return fetch(SERVICE_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task.serialize())
    });
}

const updateTask = (task) => {
    return fetch(`${SERVICE_URL}/${task.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task.serialize())
    });
}

export {
    SERVICE_URL,
    createTask,
    updateTask
};