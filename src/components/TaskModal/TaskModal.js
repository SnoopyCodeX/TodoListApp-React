import React, { useState } from 'react';

function TaskModal({
    task,
    handleUpdateNameTask
}) {
    const [newName, setNewName] = useState(task.taskName);

    const handleOnChange = (evt) => setNewName(evt.target.value);

    const handleOnKeyUp = (evt) => {
        if(evt.key === 'Enter')
            document.querySelector("#updateBtn").click();
    };

    return (
        <div className="modal fade" id={`editTaskModal${task.id}`} tabIndex="-1" aria-labelledby={`editTaskModalLabel${task.id}`} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id={`editTaskModalLabel${task.id}`}>Edit Task</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className="input-group p-4">
                            <input type="text" className="form-control" placeholder="Task name" value={newName} onChange={handleOnChange} onKeyUp={handleOnKeyUp} />
                            <button id="updateBtn" className="btn btn-outline-success" data-bs-dismiss="modal" onClick={() => handleUpdateNameTask(task.id, newName)} >Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskModal;