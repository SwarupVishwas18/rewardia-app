import AuthNav from "./components/AuthNav";
import coin from "./assets/coin.png";
import "./Account.css"
function Account() {
    return (
        <div className="account-page">
            <AuthNav />
            <div className="account-main">
                <section className="account-info">
                    <div className="account-ls"><img src="https://robohash.org/swarupvishwas.png" alt="" /></div>
                    <div className="account-rs">
                        <h1>Swarup Vishwas</h1>
                        <div className="username">@halfbloodprince</div>
                        <div className="highlight-green">
                            <div className="logout-btn">Logout</div>
                        </div>
                    </div>
                </section>
                <section className="account-stats">
                    <ul className="account-stats">
                        <li>Total Missions : 2303</li>
                        <li>Total Tasks : 2303</li>
                        <li>Completed Tasks : 2303</li>
                        <li>Rewards Bought : 2303</li>
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default Account