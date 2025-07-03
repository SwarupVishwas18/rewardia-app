import AuthNav from "./components/AuthNav";
import coin from "./assets/coin.png";
import "./Account.css"
import { useNavigate } from "react-router";
import { clearSession, getUser, initDatabase, checkSession } from "./api";
import { useEffect, useState } from "react";
function Account() {
    const navigate = useNavigate()

    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {

        initDatabase().then((result2) => {
            checkSession().then((result) => {
                if (result) {
                    console.log(result);

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
    }, [])

    const handleLogout = () => {
        clearSession().then(() => {
            console.log("deleted");
            navigate("/")
        })
    }
    return (
        <div className="account-page">
            <AuthNav userDetails={userDetails} />
            <div className="account-main">
                <section className="account-info">
                    <div className="account-ls"><img src={`https://robohash.org/${userDetails.username}.png`} alt="" /></div>
                    <div className="account-rs">
                        <h1>{userDetails.name}</h1>
                        <div className="username">@{userDetails.username}</div>
                        <div className="highlight-green">
                            <div className="logout-btn" onClick={handleLogout}>Logout</div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}

export default Account