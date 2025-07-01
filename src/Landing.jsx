import logo from "./assets/logo.png"
import "./Landing.css"
import ill from "./assets/landing.png"
import { useState, useEffect } from "react"
import { checkSession, initDatabase } from "./api"
import { useNavigate } from "react-router"
function Landing() {

    const navigate = useNavigate()

    const features = [{
        title: "Group Your Goals with Missions",
        subtitle: "Create categories like Work, Fitness, or Study. Organize your tasks with purpose.",
        img: "/image.png"
    },
    {
        title: "Add Tasks, Set Your Own Points",
        subtitle: "Assign custom point values to each task based on difficulty or priority. Your effort, your value.",
        img: "/image.png"
    }
        , {
        title: "Earn, Save, Redeem",
        subtitle: "Spend your earned points in the in-app shop. From fun perks to unlockables.",
        img: "/image.png"
    }
        , {
        title: "Your Personal Productivity Dashboard",
        subtitle: "See how far you’ve come with daily stats, streaks, and visual achievements.",
        img: "/image.png"
    }]

    const [currentFeature, setCurrentFeature] = useState(features[0])

    useEffect(() => {
        initDatabase().then((result2) => {
            checkSession().then((result) => {
                if (result) {
                    navigate("/home")
                }
            })
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    return (
        <div className="landing">
            <div className="landing-header">
                <nav>
                    <div className="nav-ls">
                        <a href="/">
                            <img src={logo} alt="" />
                        </a>
                    </div>
                    <div className="nav-rs">
                        <div className="highlight nav-links">
                            <a href="/login">Login</a>
                            <a href="/signup">Signup</a>
                        </div>
                    </div>
                </nav>

                <div className="hero">
                    <div className="hero-ls">
                        <h1>Rewardia</h1>
                        <h2>
                            Convert your tasks in rewards
                        </h2>
                    </div>
                </div>
            </div>
            <div className="how-to">
                <h1>How it works</h1>
                <div className="howtocontainer">
                    <div className="howtocard">
                        <h2>Add Task</h2>
                    </div>
                    <div className="howtocard">
                        <h2>Complete Task</h2>
                    </div>
                    <div className="howtocard">
                        <h2>Earn Points</h2>
                    </div>
                    <div className="howtocard">
                        <h2>Redeem Rewards</h2>
                    </div>
                </div>
            </div>

            <div className="features">
                <h1>Features</h1>
                <div className="feature-container">
                    <div className="feature-ls">
                        <h2 className="ftr-title">
                            {currentFeature.title}
                        </h2>
                        <div className="ftr-sub">
                            {currentFeature.subtitle}
                        </div>
                        <div className="ftr-img">
                            <img src={currentFeature.img} alt={currentFeature.img} />
                        </div>
                    </div>
                    <div className="feature-rs">
                        {
                            features.map((feature, index) => {
                                return (<img src={feature.img} alt={currentFeature.img} onClick={() => { setCurrentFeature(feature) }} style={{ top: `${index * 10}px`, right: `${index * 5}px` }} />)
                            })
                        }
                    </div>
                </div>
            </div>
            <footer>
                &copy; <a href="https://github.com/SwarupVishwas18/">Swarup Vishwas</a>
            </footer>
        </div>
    )
}

/*
    There will be 4 sections

    2. How to use?
        - Add tasks 
        - Complete Task
        - If task not completed in Time Rewards will be deducted
    3. Features
        - Missions
        - Rewards
        - Account Stats
    4. Footer
        - Github
*/

export default Landing;