import { FaShoppingCart, FaTrash } from "react-icons/fa";
import coin from "../assets/coin.png"

function Card({ reward }) {
    return (
        <div className="shop-card">
            <div className="reward-title">{reward.title}</div>
            <div className="reward-point">{reward.points}<img src={coin} alt="" /></div>
            <div className="reward-buy">
                <button>
                    <FaShoppingCart />
                </button>
            </div>
            <div className="reward-delete">
                <button>
                    <FaTrash />
                </button>
            </div>
        </div>
    )
}

export default Card;