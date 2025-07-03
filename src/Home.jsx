import { useEffect, useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import AuthNav from "./components/AuthNav";
import MissionList from "./components/MissionList";
import TaskContainer from "./components/TaskContainer";
import "./Home.css";
import { checkSession, getAllMissions, getUser, initDatabase } from "./api";
import AddMission from "./components/modals/AddMission";
function Home() {

    const [userId, setUserId] = useState()
    const [missions, setMissions] = useState([])
    const [activeMission, setActiveMission] = useState({
        title: ""
    })

    const [userDetails, setUserDetails] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false);
    let [tasks, setTasks] = useState([]);

    useEffect(() => {
        initDatabase().then((result2) => {
            checkSession().then((result) => {
                if (result) {
                    console.log(result);
                    setUserId(result.user_id)

                    getAllMissions(result.user_id).then((res) => {
                        console.log(userId);
                        console.log(res);
                        setMissions(res)
                        if (res.length > 0) {
                            setActiveMission(res[0])
                            console.log(res[0]);
                        }
                    }).catch((e) => {
                        console.log(userId);
                    })

                    getUser(result.user_id).then((data) => {
                        setUserDetails(data)
                    })
                } else {
                    navigate("/")
                }
            })
        }).catch((err) => {
            console.log(err);
        });
    }, [userId])
    return (
        <div className="main">
            {isModalVisible && <AddMission setIsModalVisible={setIsModalVisible} setMissions={setMissions} userId={userId} missions={missions} />}
            <AuthNav userDetails={userDetails} />
            <div className="home-container">
                <div className="home-ls">
                    <MissionList setActiveMission={setActiveMission} missions={missions} setMissions={setMissions} />
                    <div className="btns-main">
                        <button onClick={() => setIsModalVisible(true)}>Add Mission</button>
                    </div>
                </div>
                <div className="home-rs">
                    <TaskContainer taskCtrTitle={"My Day"} activeMission={activeMission} userId={userId} tasks={tasks} setTasks={setTasks} userDetails={userDetails} />
                    <AddTaskForm userId={userId} mission={activeMission} setTasks={setTasks} tasks={tasks} />
                </div>
            </div>
        </div>
    )
}

export default Home;