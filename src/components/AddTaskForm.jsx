function AddTaskForm() {
    return (
        <div className="add-task-form">
            <input type="text" className="title-input" placeholder="Enter the task...." />
            <input type="number" name="" id="" className="points-input" defaultValue={0} />
            <input type="date" name="" id="" className="deadline-input" />
        </div>
    )
}

export default AddTaskForm;