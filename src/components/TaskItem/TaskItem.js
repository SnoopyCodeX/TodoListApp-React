import React from 'react';

function TaskItem({
    task,
    handleUpdateStatusTask,
    handleDeleteTask
}) {

    return (
        <div className="mb-2 p-2 shadow border">

            <div className="input-group row ps-3">
                <div className={`col-md-10 border-0 ${task.isDone ? 'text-success text-decoration-line-through' : ''}`}>
                    {task.taskName}
                </div>

                <button className="btn btn-outline-primary col me-2" data-bs-toggle="modal" data-bs-target={`#editTaskModal${task.id}`}>
                    <i className='fa fa-pencil'></i>
                </button>

                <button className={`btn ${task.isDone ? 'btn-outline-danger' : 'btn-outline-success'} col me-2`} onClick={() => handleUpdateStatusTask(task.id)}>
                    {
                    task.isDone ? <i className='fa fa-ban'></i> : <i className='fa fa-check'></i>
                    }
                </button>

                <button className="btn btn-outline-danger col" onClick={() => handleDeleteTask(task.id)}>
                    <i className='fa fa-trash'></i>
                </button>
            </div>

        </div>
    );
}

export default TaskItem;