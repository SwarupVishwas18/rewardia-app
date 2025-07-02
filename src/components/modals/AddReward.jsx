import { useState } from "react"
import { insertReward } from "../../api";

function AddReward({ setIsModalVisible, setRewards, userId, rewards }) {

    const [name, setName] = useState("");
    const [points, setPoints] = useState(0);

    const handleSubmit = () => {
        if (points == 0 || name == "") {
            alert("data not entered")
        } else {

            insertReward({
                name: name,
                points: parseInt(points),
                status: 0,
                userId: userId
            }).then(res => {
                console.log(res);
                setRewards([...rewards, res])
            }).catch(e => {
                console.log(e);
            })
        }
    }


    return (
        <div className="modal-bg">
            <div className="modal">
                <h1>Add Reward</h1>
                <div className="modal-form">
                    <div className="modal-input">
                        <label htmlFor="reward-title">Reward Title :</label>
                        <input type="text" name="reward-title" value={name} onChange={(e) => { setName(e.target.value) }} id="reward-title" />
                    </div>
                    <div className="modal-input">
                        <label htmlFor="reward-points">Reward Points : </label>
                        <input type="number" name="reward-points" value={points} onChange={(e) => { setPoints(e.target.value) }} id="reward-points" />
                    </div>
                    <div className="modal-btns">
                        <button onClick={handleSubmit}>Submit</button>
                        <button onClick={() => { setIsModalVisible(false) }}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddReward