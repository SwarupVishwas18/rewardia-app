import { useState } from "react";
import AuthNav from "./components/AuthNav";
import Card from "./components/Card";
import './Card.css'
import { FaPlus, FaPlusCircle } from "react-icons/fa";

function Shop() {

    const [title, setTitle] = useState("Shop");
    const [statusFilter, setStatusFilter] = useState(0);
    const [rewards, setRewards] = useState([{
        title: "Black Clover",
        points: 50,
        id: 1
    }, {
        title: "Black Clover",
        points: 50,
        id: 1
    }]);
    const allTitles = ["Shop", "Bought Rewards"]

    const handleStatusChange = (e) => {
        setStatusFilter(e.target.value)
        setTitle(allTitles[parseInt(e.target.value)])
    }

    return (
        <div className="shop-main">
            <AuthNav />
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
                        <Card key={id} reward={rewards[index]} />
                    ))}
                </div>
            </section>
            <div className="add-reward-btn">
                <FaPlusCircle />
            </div>
        </div>
    )
}

export default Shop;