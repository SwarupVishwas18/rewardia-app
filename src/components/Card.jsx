import { FaShoppingCart, FaTrash } from "react-icons/fa";
import coin from "../assets/coin.png"
import { deleteReward, editReward } from "../api";

function Card({ reward, setRewards, displayRewards }) {

    const handleBuying = () => {

        editReward({
            id: reward.id,
            name: reward.name,
            points: reward.points,
            status: 1,
            userId: reward.user_id
        }).then((res) => {
            console.log(res);

            console.log("edited");

            setRewards(displayRewards.filter((r) => r.id != reward.id))
        }).catch((e) => {
            console.log(e);

        })
    }

    const handleDelete = () => {
        deleteReward(reward.id).then(() => {
            setRewards(displayRewards.filter((r) => r.id != reward.id))
        })
    }


    return (
        <div className="shop-card">
            <div className="reward-title">{reward.name}</div>
            <div className="reward-point">{reward.points}<img src={coin} alt="" /></div>
            <div className="reward-buy">
                <button onClick={handleBuying}>
                    <FaShoppingCart />
                </button>
            </div>
            <div className="reward-delete">
                <button onClick={handleDelete}>
                    <FaTrash />
                </button>
            </div>
        </div>
    )
}

export default Card;