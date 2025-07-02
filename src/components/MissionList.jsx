import { useState } from "react";
import AddMission from "./modals/AddMission";

function MissionList({ missions, setActiveMission, setMissions }) {

    


    return (
        <div className="mission-div">
            
            <section className="missions">
                <h1 className="subtitle">Missions</h1>
                <div className="mission-list">
                    {missions.map((mission, index) => {
                        return (
                            <div className="mission-link" key={mission.id}><a href="">{mission.title}</a></div>
                        )
                    })}
                </div>
              
            </section>
        </div>
    )
}

export default MissionList;