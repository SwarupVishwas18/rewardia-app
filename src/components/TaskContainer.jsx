import { useEffect, useState } from "react";
import Task from "./Task"
import { getAllTasks } from "../api";

function TaskContainer({ taskCtrTitle, activeMission, userId, tasks, setTasks }) {




    useEffect(() => {
        if (activeMission != null) {
            console.log(activeMission);
            console.log(userId);


            getAllTasks(userId, activeMission.id).then((res) => {
                console.log(res);
                setTasks(res);
            })
        }

    }, [activeMission, userId])

    return (
        <section className="tasks">
            <h1 className="subtitle">
                {activeMission.title} Tasks
            </h1>
            <div className="tasks-container">
                {tasks.length == 0 && <h2>No Tasks Found.</h2>}
                {tasks.map((task, index) => (
                    <Task task={task} key={task.id} tasks={tasks} setTasks={setTasks} />
                ))}
            </div>
        </section>
    )
}

export default TaskContainer;