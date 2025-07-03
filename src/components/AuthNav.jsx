import logo from "../assets/logo.png"
import coin from "../assets/coin.png"
import shop from "../assets/shop.png"
import profile from "../assets/profile.png"
import { useEffect } from "react"

function AuthNav({ userDetails }) {

    useEffect(() => {

        console.log(userDetails);
    }, [userDetails])


    return (
        <nav>
            <div className="nav-ls">
                <a href="/">
                    <img src={logo} alt="" />
                </a>
            </div>
            <div className="nav-rs">
                <div className="highlight nav-links">
                    <a href="/shop"> <img src={coin} alt="" className="icon" /> {userDetails.points}</a>
                    <a href="/shop"><img src={shop} alt="" className="icon" />Shop</a>
                    <a className="account" href="/account">
                        <img src={`https://robohash.org/${userDetails.username}.png`} />
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default AuthNav;