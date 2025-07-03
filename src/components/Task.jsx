import { FaTrash } from "react-icons/fa";
import coin from "../assets/coin.png"
import { useEffect } from "react";

function Task({ task, setTasks, tasks }) {

    // useEffect()

    return (
        <div className="task">
            <div className="task-check"><input type="checkbox" name="checkbox" id="" /></div>
            <div className="task-title">{task.task_name}</div>
            <div className="task-points">{task.points} <img src={coin} alt="" /></div>
            <div className="task-deadline">{task.due_date}</div>
            <div className="task-delete"><FaTrash /></div>
        </div>
    )
}

export default Task;