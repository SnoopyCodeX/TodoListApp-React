import React, { useState } from 'react';
import Task from '../../models/task';
import TaskItem from '../TaskItem/TaskItem';
import TaskModal from '../TaskModal/TaskModal';

function TaskList() {
    const [task, setTask] = useState([]);
    const [name, setName] = useState("");

    const handleAddTask = () => {
        if(name.trim().length === 0) return;

        const newTask = new Task({
            id: task.length + 1,
            taskName: name.trim(),
            isDone: false,
            isDeleted: false
        });

        setTask((prevTasks) => [...prevTasks, newTask]);
        setName("");
    };

    const handleDeleteTask = (id) => setTask(task.map(_task => {
        if(_task.id === id)
            _task.isDeleted = true;

        return _task;
    }));

    const handleUpdateNameTask = (id, newName) => setTask(task.map(_task => {
        if(_task.id === id)
            _task.taskName = newName;

        return _task;
    }));

    const handleUpdateStatusTask = (id) => {
        setTask(task.map(_task => {
            if(_task.id === id)
                _task.isDone = !_task.isDone;

            return _task;
        }));
    };

    const handleOnChange = (evt) => setName(evt.target.value);

    const handleOnKeyUp = (evt) => {
        if(evt.key === 'Enter')
            handleAddTask();
    };

    return (
        <div className='container-fluid bg-light'>
            <div className='container bg-light'>
                <div className='row mt-4 ht-500'>

                    <div className='col'></div>

                    <div className='col-md-10 bg-light shadow'>

                        <div className="card bg-info mt-4">
                            <h4 className="text-white ps-3 pt-2 pb-2">Todo-List App</h4>
                        </div>

                        <div className="shadow">
                            <div className="input-group p-4">
                            <input type="text" id='task-name-input' className="form-control" placeholder="Task name" value={name} onChange={handleOnChange} onKeyUp={handleOnKeyUp} />
                            <button className="btn btn-outline-success" onClick={handleAddTask} >+</button>
                            </div>
                        </div>

                        <h4 className="text-info mt-4">Tasks: </h4>

                        <div className='task-list'>
                            <div className="m-3">
                            {
                                task && task.map((_task, index) => {
                                    if(!_task.isDeleted) {
                                        return ( 
                                            <div key={index}>
                                                <TaskItem 
                                                    task={_task} 
                                                    handleUpdateStatusTask={handleUpdateStatusTask} 
                                                    handleDeleteTask={handleDeleteTask} /> 

                                                <TaskModal
                                                    task={_task} 
                                                    handleUpdateNameTask={handleUpdateNameTask} />
                                            </div>
                                        );
                                    }

                                    return (<div key={index}></div>);
                                }) 
                            }
                            </div>
                        </div>

                    </div>
                    
                    <div className='col'></div>
                </div>
            </div>
        </div>
    );
}

export default TaskList;