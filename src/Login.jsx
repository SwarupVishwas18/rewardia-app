import { useState, useEffect } from "react";
import { login, saveSession, initDatabase, checkSession } from "./api";
import { useNavigate } from "react-router";

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

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


    const handleLogin = () => {
        if (username == "" || password == "") {
            alert("Data not entered")
        } else {
            login(username, password)
                .then((result) => {
                    if (result.success) {
                        console.log(result.data);
                        saveSession(result.data.id, crypto.randomUUID().toString()).then((res) => {
                            // navigate("/home")
                            console.log(res);

                        }).catch((e) => {
                            console.log(e);
                            alert("issue saving session")
                        })
                    } else {
                        alert("maybe incorrect data")
                    }
                }).catch((e) => {
                    console.log(e);
                })
        }
    }

    return (
        <section className="center-flex">
            <div className="form-main">
                <div className="ls">
                    <h1>Login</h1>
                    <div className="input-main">
                        <label htmlFor="username">Username : </label>
                        <input type="text" value={username} onChange={(e) => { setUsername(e.target.value) }} name="username" id="username" />
                    </div>
                    <div className="input-main">
                        <label htmlFor="password">Password : </label>
                        <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} name="password" id="password" />
                    </div>
                    <div className="btns-main">
                        <button className="submit-btn" onClick={handleLogin}>Submit</button>
                        <a href="/">
                            <button className="secondary-btn">Go Back</button>
                        </a>
                    </div>
                </div>
                <div className="rs">
                    <img src="/signup.png" alt="" />
                </div>
            </div>
        </section>
    )
}

export default Login;