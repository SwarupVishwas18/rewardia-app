import { FaTrash } from "react-icons/fa";
import coin from "../assets/coin.png"
import { useEffect, useState } from "react";
import { deleteTask, editTask, editUserPoints, getUser } from "../api";

function Task({ task, setTasks, tasks }) {

    const [checked, setChecked] = useState(task.is_completed == 1)

    const handleDelete = () => {
        deleteTask(task.id).then(() => {
            setTasks(tasks.filter(t => (t.id != task.id)))
        }).catch((e) => { console.log(e) })
    }

    const handleCheck = () => {

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(today.getDate()).padStart(2, '0');

        const completedDate = `${year}-${month}-${day}`;

        console.log(task);

        editTask({
            id: task.id,
            missionId: task.mission,
            task_name: task.task_name,
            userId: task.user_id,
            points: task.points,
            due_date: task.due_date,
            is_completed: 1,
            completedDate: completedDate
        }).then((res) => {
            console.log(res);

            setTasks(tasks.filter(t => (t.id != task.id)))
            setChecked(!checked)

            console.log(task);


            getUser(task.user_id)
                .then((userRes) => {
                    console.log(userRes);

                    const storedDate = new Date(task.due_date);
                    const currentDate = new Date();

                    // Set time of both dates to midnight for accurate day comparison
                    storedDate.setHours(0, 0, 0, 0);
                    currentDate.setHours(0, 0, 0, 0);

                    const diffTime = storedDate - currentDate; // in milliseconds
                    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

                    const acqPoints = userRes.points + parseInt((task.points * (diffDays / 5)))

                    editUserPoints(task.user_id, acqPoints).then((pointRes) => {
                        console.log(pointRes);

                        alert("Congrats!! Points acquired : " + parseInt((task.points * (diffDays / 5))))
                    })
                })
        }).catch(e => {
            console.log(e);

        })

    };

    return (
        <div className="task">
            <div className="task-check"><input type="checkbox" name="checkbox" checked={checked} onChange={handleCheck} id="" /></div>
            <div className="task-title">{task.task_name}</div>
            <div className="task-points">{task.points} <img src={coin} alt="" /></div>
            <div className="task-deadline">{task.due_date}</div>
            <div className="task-delete" onClick={handleDelete}><FaTrash /></div>
        </div>
    )
}

export default Task;