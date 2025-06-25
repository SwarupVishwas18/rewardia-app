import coin from "../assets/coin.png"

function Task({ task }) {
    return (
        <div className="task">
            <div className="task-check"><input type="checkbox" name="checkbox" id="" /></div>
            <div className="task-title">{task.title}</div>
            <div className="task-points">{task.points} <img src={coin} alt="" /></div>
            <div className="task-deadline">{task.deadline}</div>
        </div>
    )
}

export default Task;