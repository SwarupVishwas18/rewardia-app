import { useState } from "react";
import { insertTask } from "../api";
import { useNavigate } from "react-router";

function AddTaskForm({ userId, mission, setTasks, tasks }) {

    const [title, setTitle] = useState("")
    const [points, setPoints] = useState(0)
    const [date, setDate] = useState("")

    const navigate = useNavigate()

    const handleAddTask = () => {
        if (title == "" || points == 0 || date == "") {
            alert("data not entered properly")
        } else {
            console.log(mission);
            insertTask({
                missionId: mission.id,
                task_name: title,
                userId: userId,
                points: points,
                due_date: date,
            }).then((res) => {
                console.log(res);

                setTasks([...tasks, {
                    mission: mission,
                    task_name: title,
                    userId: userId,
                    points: points,
                    due_date: date,
                    id: res
                }])
                navigate(0)
            }).catch((e) => {
                console.log(e);


            })
        }
    }

    return (
        <div className="add-task-form">
            <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} className="title-input" placeholder="Enter the task...." />
            <input type="number" value={points} onChange={(e) => { setPoints(e.target.value) }} name="" id="" className="points-input" />
            <input type="date" value={date} onChange={(e) => { setDate(e.target.value) }} name="" id="" className="deadline-input" />
            <button onClick={handleAddTask}>Submit</button>
        </div>
    )
}

export default AddTaskForm;