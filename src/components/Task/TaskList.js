import React, { useState } from 'react';
import Task from '../../models/tasks';
import TaskItem from '../TaskItem/TaskItem';
import TaskModal from '../TaskModal/TaskModal';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState("");

    const handleAddTask = () => {
        if(name.trim().length === 0) return;

        const newTask = new Task({
            id: tasks.length + 1,
            taskName: name.trim(),
            isDone: false,
            isDeleted: false
        });

        setTasks((prevTasks) => [...prevTasks, newTask]);
        setName("");
    };

    const handleDeleteTask = (id) => setTasks(tasks.map((task) => {
        if(task.id === id)
            task.isDeleted = true;

        return task;
    }));

    const handleUpdateNameTask = (id, newName) => setTasks(tasks.map(task => {
        if(task.id === id)
            task.taskName = newName;

        return task;
    }));

    const handleUpdateStatusTask = (id) => {
        setTasks(tasks.map(task => {
            if(task.id === id)
                task.isDone = !task.isDone;

            return task;
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
                            <input type="text" id='tasks-name-input' className="form-control" placeholder="Task name" value={name} onChange={handleOnChange} onKeyUp={handleOnKeyUp} />
                            <button className="btn btn-outline-success" onClick={handleAddTask} >+</button>
                            </div>
                        </div>

                        <h4 className="text-info mt-4">Tasks: </h4>

                        <div className='tasks-list'>
                            <div className="m-3">
                            {
                                tasks && tasks.map((task, index) => {
                                    if(!task.isDeleted) {
                                        return ( 
                                            <div key={index}>
                                                <TaskItem 
                                                    tasks={task} 
                                                    handleUpdateStatusTask={handleUpdateStatusTask} 
                                                    handleDeleteTask={handleDeleteTask} /> 

                                                <TaskModal
                                                    tasks={task} 
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