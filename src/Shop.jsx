import { useState, useEffect, use } from "react";
import AuthNav from "./components/AuthNav";
import Card from "./components/Card";
import './Card.css'
import { FaPlus, FaPlusCircle } from "react-icons/fa";
import AddReward from "./components/modals/AddReward";
import { initDatabase, checkSession, getAllRewards, getUser } from "./api";
import { useNavigate } from "react-router";

function Shop() {

    const [title, setTitle] = useState("Shop");
    const [statusFilter, setStatusFilter] = useState(0);
    const [rewards, setRewards] = useState([]);
    const allTitles = ["Shop", "Bought Rewards"]
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [userId, setUserId] = useState();
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({})


    useEffect(() => {
        initDatabase().then((result2) => {
            checkSession().then((result) => {
                if (result) {
                    console.log(result);
                    setUserId(result.user_id)
                    console.log(userId);

                    getAllRewards(userId, 0).then((res) => {
                        console.log(res);
                        setRewards(res)
                    })

                    getUser(result.user_id).then((data) => {
                        console.log(data);

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

    const handleStatusChange = (e) => {
        setStatusFilter(e.target.value)
        setTitle(allTitles[parseInt(e.target.value)])
        getAllRewards(userId, parseInt(e.target.value)).then((res) => {
            console.log(res);
            setRewards(res)
        })
    }

    return (
        <div className="shop-main">
            {isModalVisible && <AddReward setIsModalVisible={setIsModalVisible} setRewards={setRewards} userId={userId} rewards={rewards} />}
            <AuthNav userDetails={userDetails} />
            <section className="card-section">
                <div className="container-title">
                    <h1>{title}</h1>
                    <div>
                        <select name="status" id="status" className="statusSelector" value={statusFilter} onChange={handleStatusChange} >
                            <option value="0">Shop</option>
                            <option value="1">Bought Products</option>
                        </select>
                    </div>
                </div>
                <div className="card-container">
                    {rewards.length == 0 && <h2>No Rewards Found.</h2>}
                    {rewards.map((id, index) => (
                        <Card key={index} reward={rewards[index]} setRewards={setRewards} displayRewards={rewards} isDisabled={rewards[index].points > userDetails.points} userDetails={userDetails} />
                    ))}
                </div>
            </section>
            {statusFilter == 0 && (<div className="add-reward-btn" onClick={() => { setIsModalVisible(true) }}>
                <FaPlusCircle />
            </div>)}
        </div>
    )
}

export default Shop;