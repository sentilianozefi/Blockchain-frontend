import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import "./styles.css";
import "./Forms.css";
import "./user.css";

export default function Admin() {
    const [admins, setadmins] = useState(null);
    const [admin, setadmin] = useState("");
    const [adminpass, setadminpass] = useState("");
    const [users, setusers] = useState([]);
    const [filter, setfilter] = useState("");

    const getAdmin = async () => {
        const res = await fetch("http://192.168.70.108:8080/GetAdmin/" + admin + "/" + adminpass);
        const json = await res.json()

        if (!res.ok) {
            setadmins(null);
            alert("Wrong username or password!");
        }
        else setadmins(json)
    }

    const getUsers = async () => {
        const res = await fetch("http://192.168.70.108:8080/GetUsers");
        const json = await res.json()
        setusers(json)
    }

    const login = () => {
        if (admin === "" || adminpass === "") {
            alert("One or more fields are empty")
        }
        else {
            getUsers();
            getAdmin();
        }

    }

    return (
        <div>
            {admins === null &&

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
                                <label className="form-label">Admin </label>
                                <input
                                    className="form-input"
                                    type="text"
                                    value={admin}
                                    onChange={evt => setadmin(evt.target.value)}
                                    placeholder="Enter your username" />
                            </div>

                            <div className="form-inputs">
                                <label className="form-label">Password </label>
                                <input
                                    className="form-input"
                                    type="password"
                                    value={adminpass}
                                    onChange={evt => setadminpass(evt.target.value)}
                                    placeholder="Enter your password" />
                            </div>
                            <button className="login-btn-2" onClick={login}>Log in</button>
                        </form>
                    </div>
                </div>
            }
            {admins !== null &&
                <div>
                    <div className="header">
                        <a href="/" className="home">Whistleblowing</a>
                        <div className="header-right">
                            <button className="log-out" id="logout-btn"> <a href="/admin">Log out</a></button>
                        </div>
                    </div>
                    <div>
                        <input value = {filter} onChange = {(evt) => setfilter(evt.target.value)} type='search' />
                    </div>
                    <div>
                        <ul>
                            {users.filter((el) => filter === "" || el.includes(filter))
                            .map((el) => 
                                <li>{el}</li>
                            )}
                            </ul>
                    </div>
                </div>}
        </div>
    )
}