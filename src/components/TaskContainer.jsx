import Task from "./Task"

function TaskContainer({ taskCtrTitle, heightValue }) {
    let sampleTask = {
        title: "Control your bs",
        points: 5,
        deadline: "23rd December 25",
        isChecked: false
    }

    return (
        <section className="tasks">
            <h1 className="subtitle">
                {taskCtrTitle}
            </h1>
            <div className="tasks-container">
                <div className="task-container">
                    <Task task={sampleTask} />
                </div>
                <div className="task-container">
                    <Task task={sampleTask} />
                </div>
                <div className="task-container">
                    <Task task={sampleTask} />
                </div>
                <div className="task-container">
                    <Task task={sampleTask} />
                </div>
            </div>
        </section>
    )
}

export default TaskContainer;