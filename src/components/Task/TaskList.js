import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import boredAnimation from '../../assets/bored-animation.json';
import { SERVICE_URL, createTask, updateTask } from '../../services/task-service';
import Task from '../../models/task';
import TaskItem from '../TaskItem/TaskItem';
import TaskModal from '../TaskModal/TaskModal';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState("");
    let deletedTasksCount = 0;

    useEffect(() => {
        fetch(SERVICE_URL)
            .then(res => res.json())
            .then(res => {
                setTasks(_ => [...res.map(savedTask => new Task({...savedTask}))]);
            });
        
    }, [setTasks]);

    const handleAddTask = () => {
        if(name.trim().length === 0) return;

        deletedTasksCount = 0;

        const newTask = new Task({
            id: tasks.length + 1,
            taskName: name.trim(),
            isDone: false,
            isDeleted: false
        });

        createTask(newTask)
            .then(_ => setTasks(prevTasks => [...prevTasks, newTask]));

        setName("");
    };

    const handleDeleteTask = (id) => {
        const task = tasks.find(task => task.id === id);
        deletedTasksCount = 0;

        if(task) {
            task.isDeleted = true;
            updateTask(task)
                .then(_ => setTasks(prevTasks => [...prevTasks]));
        }
    }

    const handleUpdateNameTask = (id, newName) => {
        const task = tasks.find(task => task.id === id);
        deletedTasksCount = 0;

        if(task) {
            task.taskName = newName;
            updateTask(task)
                .then(_ => setTasks(prevTasks => [...prevTasks]));
        }
    }

    const handleUpdateStatusTask = (id) => {
        const task = tasks.find(task => task.id === id);
        deletedTasksCount = 0;

        if(task) {
            task.isDone = !task.isDone;
            updateTask(task)
                .then(_ => setTasks(prevTasks => [...prevTasks]));
        }
    }

    const handleOnChange = (evt) => {
        setName(evt.target.value);
        deletedTasksCount = 0;
    }

    const handleOnKeyUp = (evt) => {
        if(evt.key === 'Enter')
            handleAddTask();
        
        deletedTasksCount = 0;
    };

    return (
        <div className='container-fluid bg-light-ct'>
            <div className='container bg-light-ct'>
                <div className='row mt-4 ht-500 bg-light-ct'>

                    <div className='col'></div>

                    <div className='col-md-10 bg-light-ct shadow'>

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
                                tasks &&  tasks.map((task, index) => {
                                    if(!task.isDeleted) {
                                        return ( 
                                            <div key={index}>
                                                <TaskItem 
                                                    task={task} 
                                                    handleUpdateStatusTask={handleUpdateStatusTask} 
                                                    handleDeleteTask={handleDeleteTask} /> 

                                                <TaskModal
                                                    task={task} 
                                                    handleUpdateNameTask={handleUpdateNameTask} />
                                            </div>
                                        );
                                    } else {
                                        deletedTasksCount += 1;

                                        if(deletedTasksCount >= tasks.length)
                                            return (
                                                <div key={index}>
                                                    <Lottie
                                                        className="empty-list"
                                                        animationData={boredAnimation}
                                                        loop={true} />
                                                    
                                                    <center className='text-info'>You have no tasks to do...</center>
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