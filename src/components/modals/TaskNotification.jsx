import { useState } from "react"
import { insertReward } from "../../api";

function TaskNotification({ points, setIsModalVisible }) {




    return (
        <div className="modal-bg">
            <div className="modal">
                <h1>Hurray Task Completed!! Points Got : {points} </h1>
                <div className="modal-form">

                    <div className="modal-btns">
                        <button onClick={() => { setIsModalVisible(false) }}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskNotification