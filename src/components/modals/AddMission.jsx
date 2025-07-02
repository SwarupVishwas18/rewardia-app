import { useState } from "react"
import { insertMission } from "../../api";

function AddMission({ setIsModalVisible, setMissions, userId, missions }) {

    const [name, setName] = useState("");

    const handleSubmit = () => {
        if (name == "") {
            alert("data not entered")
        } else {

            insertMission({
                title: name,
                userId: userId
            }).then(res => {
                console.log(res);
                setMissions([...missions, {
                    id: res,
                    title: name,
                    userId: userId
                }])

                setIsModalVisible(false)
            }).catch(e => {
                console.log(e);
            })
        }
    }


    return (
        <div className="modal-bg">
            <div className="modal">
                <h1>Add Mission</h1>
                <div className="modal-form">
                    <div className="modal-input">
                        <label htmlFor="reward-title">Mission Title :</label>
                        <input type="text" name="reward-title" value={name} onChange={(e) => { setName(e.target.value) }} id="reward-title" />
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

export default AddMission