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
        fetch("http://192.168.70.108:8080/Updatevisibility/"+false+"/"+el.id, {
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
        fetch("http://192.168.70.108:8080/Updatevisibility/"+true+"/"+el.id, {
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
            {admins !== null && replist === false &&
                <div>
                    <div className="header">
                        <a href="/" className="home">Whistleblowing</a>
                        <div className="header-right">
                            <button className="log-out" id="logout-btn"> <a href="/admin">Log out</a></button>
                        </div>
                    </div>
                    <div>
                        <input value={filter} onChange={(evt) => setfilter(evt.target.value)} type='search' />
                    </div>
                    <div>
                        <ul>
                            {users.filter((el) => filter === "" || el.userName.includes(filter))
                                .map((el) =>
                                    <li><h1 onClick={() => { setReplist(true); getReport(el.userName) }}>{el.userName}</h1>
                                        <button> <Link to={"/admin/reset/" + el.userName + "/" + admins.userName} target='_blank'>Reset password</Link></button>
                                        {el.state === false ? <button onClick={() => disableuser(el.userName)}>Disable user</button> : <button onClick={() => enableuser(el.userName)}>Enable user</button>}
                                    </li>
                                )}
                        </ul>
                    </div>
                </div>
            }
            {admins !== null && replist === true && <div>
                {reports && reports.map((el) => <ul><li><p>{el.username}</p><p>{el.title}</p><p>{el.report}</p>  
                {el.display === true ? 
                <button value = {el.id} onClick={()=>hidereport(el)}>Hide report</button> : <button value = {el.id} onClick={()=>showreport(el)}>Show report</button>}</li></ul>)}
                <button onClick={() => setReplist(false)}>Close</button>
            </div>
            }
        </div>
    )
}