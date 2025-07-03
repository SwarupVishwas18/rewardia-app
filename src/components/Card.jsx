import { FaShoppingCart, FaTrash } from "react-icons/fa";
import coin from "../assets/coin.png"
import { deleteReward, editReward, editUserPoints } from "../api";
import { useNavigate } from "react-router";

function Card({ reward, setRewards, displayRewards, isDisabled, userDetails }) {

    const navigate = useNavigate()

    const handleBuying = () => {

        editUserPoints(userDetails.id, userDetails.points - reward.points).then((pointRes) => {
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

                alert("Congrats you bought an item : " + reward.name)
                navigate(0)
            }).catch((e) => {
                console.log(e);

            })
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
                <button onClick={handleBuying} disabled={isDisabled}>
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