import AddTaskForm from "./components/AddTaskForm";
import AuthNav from "./components/AuthNav";
import MissionList from "./components/MissionList";
import TaskContainer from "./components/TaskContainer";
import "./Home.css";
function Home() {
    return (
        <div className="main">
            <AuthNav />
            <div className="home-container">
                <div className="home-ls">
                    <MissionList />
                </div>
                <div className="home-rs">
                    <TaskContainer taskCtrTitle={"My Day"} heightValue={400} />
                    <TaskContainer taskCtrTitle={"Other Tasks"} heightValue={600} />
                    <AddTaskForm />
                </div>
            </div>
        </div>
    )
}

export default Home;