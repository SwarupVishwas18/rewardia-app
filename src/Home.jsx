import { useEffect, useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import AuthNav from "./components/AuthNav";
import MissionList from "./components/MissionList";
import TaskContainer from "./components/TaskContainer";
import "./Home.css";
import { checkSession, getAllMissions, initDatabase } from "./api";
import AddMission from "./components/modals/AddMission";
function Home() {

    const [userId, setUserId] = useState()
    const [missions, setMissions] = useState([])
    const [activeMission, setActiveMission] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        initDatabase().then((result2) => {
            checkSession().then((result) => {
                if (result) {
                    console.log(result);
                    setUserId(result.user_id)
                    console.log(userId);

                    getAllMissions(userId).then((res) => {
                        console.log(res);
                        setMissions(res)
                        if (res.length > 0) {
                            setActiveMission(res[0])
                        }
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
            <AuthNav />
            <div className="home-container">
                <div className="home-ls">
                    <MissionList setActiveMission={setActiveMission} missions={missions} setMissions={setMissions} />
                    <div className="btns-main">
                        <button onClick={() => setIsModalVisible(true)}>Add Mission</button>
                    </div>
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