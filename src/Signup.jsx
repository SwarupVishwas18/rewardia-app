import { useState, useEffect } from "react";
import { saveSession, signup, initDatabase, checkSession } from "./api";
import { useNavigate } from "react-router";

function Signup() {

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRepassword] = useState("")
    const navigate = useNavigate()

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

    const handleSignup = () => {
        if (name == "" || username == "" || password == "" || repassword == "") {
            alert("Data not entered")
        } else {
            if (password != repassword) {
                alert("Password and Comfirm Password are different")
            } else {
                signup(username, name, password)
                    .then((result) => {
                        if (result.success) {
                            console.log(result.data);

                            saveSession(result.data, crypto.randomUUID()).then((res) => {
                                setTimeout(() => {
                                    navigate("/home")

                                }, 1000)
                            }).catch((e) => {
                                console.log(e);
                                alert("error adding data")

                            })

                        }
                        else {

                            alert("username already exists")
                        }
                    }).catch((e) => {
                        console.log(e);
                    })
            }
        }
    }

    return (
        <section className="center-flex">
            <div className="form-main">
                <div className="ls">
                    <h1>Signup</h1>
                    <div className="input-container">
                        <div className="input-main">
                            <label htmlFor="name">Name  </label>
                            <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" name="name" id="name" />
                        </div>
                        <div className="input-main">
                            <label htmlFor="userid">User Id  </label>
                            <input value={username} onChange={(e) => { setUsername(e.target.value) }} type="text" name="userid" id="userid" />
                        </div>
                        <div className="input-main">
                            <label htmlFor="password">Password  </label>
                            <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" name="password" id="password" />
                        </div>
                        <div className="input-main">
                            <label htmlFor="re-password">Confirm Password  </label>
                            <input value={repassword} onChange={(e) => { setRepassword(e.target.value) }} type="password" name="re-password" id="re-password" />
                        </div>
                    </div>
                    <div className="btns-main">
                        <button className="submit-btn" onClick={handleSignup}>Submit</button>
                        <button onClick={() => { navigate("/") }} className="secondary-btn">Go Back</button>
                    </div>
                </div>
                <div className="rs">
                    <img src="/signup.png" alt="" />
                </div>
            </div>
        </section>
    )
}

export default Signup;