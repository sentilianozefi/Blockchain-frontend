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
    const [reports, setReports] = useState([]);
    const [replist, setReplist] = useState(false);

    const hidereport = (el) => {
        fetch("http://192.168.70.108:8080/Updatevisibility/" + false + "/" + el.id, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            response.json(),
                getReport(el.username),
                alert("You hid a report!")
        }
        )

    }

    const showreport = (el) => {
        fetch("http://192.168.70.108:8080/Updatevisibility/" + true + "/" + el.id, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            response.json(),
                getReport(el.username),
                alert("You showed a report!")
        }
        )

    }

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

    const disableuser = (el) => {
        fetch("http://192.168.70.108:8080/admindisableuser/" + admins.userName + "/" + el + "/" + true, {
            method: "POST"
        }).then((res) => res.json()).then(alert("User has been disabled!"),
            getUsers())
    }
    const enableuser = (el) => {
        fetch("http://192.168.70.108:8080/admindisableuser/" + admins.userName + "/" + el + "/" + false, {
            method: "POST"
        }).then((res) => res.json()).then(alert("User has been enabled!"),
            getUsers())
    }

    const getReport = async (el) => {
        const res = await fetch("http://192.168.70.108:8080/GetReports/" + el);
        const json = await res.json()
        setReports(json)
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
                    <div className="login-body">
                        <div className="login-form home-divs">
                            <form onSubmit={e => e.preventDefault()}>
                                <h1 className="welcome">Log in<br />as administrator</h1>
                                <div className="form-inputs">
                                    <label className="form-label">Admin-Username </label>
                                    <input
                                        className="form-input"
                                        type="text" value={admin}
                                        onChange={evt => setadmin(evt.target.value)}
                                        placeholder="Enter your username">
                                    </input>
                                </div>
                                <div className="form-inputs">
                                    <label className="form-label">Password </label>
                                    <input
                                        className="form-input"
                                        type="password" value={adminpass}
                                        onChange={evt => setadminpass(evt.target.value)}
                                        placeholder="Enter your password">
                                    </input>
                                </div>
                                <button className="login-btn-2" onClick={login}>Log in</button>
                            </form>
                        </div>
                    </div>
                </div>
            }
            {admins !== null && replist === false &&
                <div>
                    <div className="header">
                        <a href="/" className="home">Whistleblowing</a>
                        <div className="header-right">
                            <button className="log-out" id="logout-btn" onClick={() => window.location.reload()}>Log out</button>
                        </div>
                    </div>
                    <div className='admin-body'>
                        <div>
                            <input className="form-control" id="search-user" value={filter} onChange={(evt) => setfilter(evt.target.value)} type='search' placeholder='Search user' />
                        </div>
                        <div>
                            <div className='adminUsersList'>
                                {users.filter((el) => filter === "" || el.userName.includes(filter))
                                    .map((el) => <div className='adminPageUsers'>
                                        <div>
                                            <h6>Username: </h6>
                                            <h3>{el.userName}</h3>
                                            <h6>Name: </h6>
                                            <h4>{el.name}</h4>
                                            <h6>Surname: </h6>
                                            <h4>{el.surname}</h4>
                                        </div>
                                        <div className='adminbuttons'>
                                            <button className='admin-btn' onClick={() => { setReplist(true); getReport(el.userName) }}>Reports</button>
                                            <button className='admin-btn'> <Link to={"/admin/reset/" + el.userName + "/" + admins.userName} target='_blank'>Reset password</Link></button>
                                            {el.state === false ?
                                                <button className='admin-btn' onClick={() => disableuser(el.userName)}>Disable user</button> :
                                                <button className='admin-btn' onClick={() => enableuser(el.userName)}>Enable user</button>}
                                        </div>

                                    </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            }
            {admins !== null && replist === true && <div className='admin__reports'>
                {reports.length !== 0 ? reports.map((el) => <div className='admin-pg-report'>
                    <div>
                        <p>Author: {el.username}</p>
                        <p>Date created: {el.creationdate}</p>
                        <p>Canceled: {el.canceled.toString()}</p>
                        {el.display === true ?
                            <button className='admin-btn' value={el.id} onClick={() => hidereport(el)}>Hide report</button> :
                            <button className='admin-btn' value={el.id} onClick={() => showreport(el)}>Show report</button>}
                    </div>
                    <div>
                        <h6>{el.title}</h6>
                        <textarea style={{ 'width': '300px' }} value={el.report} /></div>
                </div>) : <div className='no-reports'><h1>This user has no reports!</h1></div>}
                <button className='edit-btns' id="admin-close-btn" onClick={() => setReplist(false)}>Close</button>
            </div>
            }
        </div>
    )
}