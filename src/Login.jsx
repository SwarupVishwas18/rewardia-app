function Login() {
    return (
        <section className="center-flex">
            <div className="form-main">
                <div className="ls">
                    <h1>Login</h1>
                        <div className="input-main">
                            <label htmlFor="email">Email Address : </label>
                            <input type="email" name="email" id="email" />
                        </div>
                        <div className="input-main">
                            <label htmlFor="password">Password : </label>
                            <input type="password" name="password" id="password" />
                        </div>
                    <div className="btns-main">
                        <button className="submit-btn">Submit</button>
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