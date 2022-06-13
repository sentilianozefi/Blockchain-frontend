import {Link} from 'react-router-dom';
import { useState } from "react";
import "./styles.css";
import "./Forms.css";
import "./user.css";

export default function Admin() {
    // const [admins, setadmins] = useState([]);
    const [admin, setadmin] = useState("");
    const [adminpass, setadminpass] = useState("");
    return (
        <div>
            {/* {admins === null && */}

                <div>
                    <div className=" header">
                        <a href="/" className="home">Whistleblowing</a>
                        <div className="header-right">
                            <a className="login-btn" href="/login">Log in</a>
                            <a className="signup-btn" href="/signup">Sign up</a>
                        </div>
                    </div>
                    <div className="form-content-2" >
                        <form onSubmit={e => e.preventDefault()} className="login-form">

                            <h1 className="welcome">Log in as administrator</h1>
                            <div className="form-inputs">
                                <label className="form-label">Username: </label>
                                <input className="form-input" type="text" value={admin} onChange={evt => setadmin(evt.target.value)} placeholder="Enter your username"></input>
                            </div>

                            <div className="form-inputs">
                                <label className="form-label">Password: </label>
                                <input className="form-input" type="password" value={adminpass} onChange={evt => setadminpass(evt.target.value)} placeholder="Enter your password"></input>
                            </div>

                            <button className="login-btn-2">Log in</button>
                            {/* <div id="forgot-password">
                                <Link to="/recover">Forgot password?</Link>
                            </div>

                            <p className="sign-up-bottom">
                                Don't have an account yet? <br />
                                <Link id="sign-up" to="/signup">Sign up here</Link>
                            </p> */}

                        </form>
                    </div>
                </div>
                {/* } */}
        </div>
    )
}