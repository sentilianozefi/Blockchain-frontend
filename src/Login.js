import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import "./Forms.css"
import "./user.css";
import profileicon from './profileicon.png';
import React, { useEffect, useState } from "react";
import Profile from "./userProfile";
import EditUser from "./editUser";
import Editpass from "./editpass";
import Header from "./header";
import "./reports.css"
import Image from "./Image";

export default function Login() {

  const [users, setUsers] = useState(null);
  const [inputValue, setValue] = useState('');
  const [passValue, setPassValue] = useState('');
  const [newreport, setnewreport] = useState("");
  const [reports, setReports] = useState([]);
  const [edit, setEdit] = useState(false);
  const [newname, setnewname] = useState("");
  const [newsurname, setnewsurname] = useState("");
  const [newemail, setnewemail] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [oldpassword, setoldpassword] = useState("");
  const [editeduser, setediteduser] = useState([]);
  const [editpass, seteditpass] = useState(false);
  const [newedit, setnewedit] = useState(false);
  const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  const [file, setfile] = useState(null);
  const [base64URL, setbase64URL] = useState("");

  const getBase64 = (file) => {
    return new Promise(resolve => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        //console.log("Called", reader);
        baseURL = reader.result;
        let base64String = baseURL.split(',').pop();
        resolve(base64String);
      };
      //console.log(file);
    });
  };

  const PostImg = async () => {
    const res = await fetch('http://192.168.70.108:8080/setpic/' + inputValue, { method: 'POST', body: base64URL })
    const json = await res.json();

  }
  const imgbtn = () => {
    PostImg();
    setEdit(false);
    setnewedit(false);
    alert("You have successfully uploaded your profile picture!");
    fetchData();
  }


  const handleFileInputChange = (e) => {
    let { file } = useState;

    file = e.target.files[0];

    getBase64(file)
      .then(result => {
        setbase64URL(
          result
        );
      })
      .catch(err => {
        console.log(err);
      });

    setfile(
      e.target.files[0]
    );
  };



  const createReport = () => {
    fetch("http://192.168.70.108:8080/CreateReport", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: inputValue,
        report: newreport

      }),
    })
      .then((res) => {
        res.json()
        getReport();
        alert("You successfully added a new report.")

      });
  };

  const getReport = async () => {
    const res = await fetch("http://192.168.70.108:8080/GetReports/" + inputValue);
    const json = await res.json()
    setReports(json)

  }

  const addReport = () => {
    if (newreport === "") {
      alert("Can not add empty report")
    }
    else {
      createReport();
      setnewreport("");
    }
  };


  const cancelReport = (id) => {
    fetch("http://192.168.70.108:8080/UpdateReport/" + id + "/" + true, {
      method: 'PUT',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response =>{
      response.json(),
      getReport()}
    )

  }

  const fetchData = async () => {
    const res = await fetch("http://192.168.70.108:8080/GetUser/" + inputValue + "/" + passValue);
    const json = await res.json()

    if (!res.ok) {
      setUsers(null);
      alert("Wrong username or password!");
    }
    else setUsers(json);

  }

  const login = () => {
    if (inputValue === "" || passValue === "") {
      alert("One or more fields are empty")
    }
    else {
      getReport();
      fetchData();
    }

  }


  const update = () => {
    fetch("http://192.168.70.108:8080/UpdateUserProfile/" + inputValue + "/" + newname + "/" + newsurname + "/" + newemail, {
      method: 'PUT',
      body: JSON.stringify({
        name: newname,
        surname: newsurname,
        email: newemail
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
        'Authorization': 'Bearer key',
      }
    }).then(response =>
      response.json()
    ).then(json => {
      console.log(json)
      setediteduser(
        json
      );
    })

  }
  const updatebtn = () => {
    if (newname === "" || newsurname === "" || newemail === "") {
      alert("One or more fields is empty")
    }
    else {
      update();
      alert("Your data updated successfully!")
      seteditpass(false);
      setEdit(false);
      setnewedit(false);
      fetchData();

    }
  }


  const changepass = () => {
    fetch("http://192.168.70.108:8080/changePassword/" + inputValue + "/" + passValue + "/" + newpassword, {
      method: 'PUT',
      body: JSON.stringify({
        password: newpassword
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response =>
      response.json()
    ).then(json => {
      console.log(json)
      setediteduser(
        json
      );
    })

  }
  const passwordbtn = () => {
    if (oldpassword === "" || newpassword === "") {
      alert("One or more fields is empty")
    }
    else if (oldpassword !== passValue) {
      alert("Old password is wrong!")
    }
    else if (!strongRegex.test(newpassword)) {
      alert("New password does not meet the conditions!");
    }
    else {
      changepass();
      alert("Password updated successfully!")
      seteditpass(false);

    }
  }




  return (
    <div>
      {users === null &&

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

              <h1 className="welcome">Log in</h1>
              <div className="form-inputs">
                <label className="form-label">Username: </label>
                <input className="form-input" type="text" value={inputValue} onChange={evt => setValue(evt.target.value)} placeholder="Enter your username"></input>
              </div>

              <div className="form-inputs">
                <label className="form-label">Password: </label>
                <input className="form-input" type="password" value={passValue} onChange={evt => setPassValue(evt.target.value)} placeholder="Enter your password"></input>
              </div>

              <button className="login-btn-2" onClick={login}>Log in</button>
              <div id="forgot-password">
                <Link to="/recover">Forgot password?</Link>
              </div>

              <p className="sign-up-bottom">
                Don't have an account yet? <br />
                <Link id="sign-up" to="/signup">Sign up here</Link>
              </p>

            </form>
          </div>
        </div>}

      {users !== null && newedit === false &&

        <div>

          <Header
            logout={() => window.location.reload()}
            setEdittrue={() => { setEdit(true); setnewedit(true) }}
          />

          <div className="userpage">

            <div>
              <Profile
                username={users.name + " " + users.surname}
                newreport={newreport}
                setnewreport={e => setnewreport(e.target.value)}
                addReport={addReport}
              />
              <div className="allreports">
                {reports !== null && reports.map((el) => (<div className="reports"><li key={el.username} className="reportlist" >{el.report}<br />
                  {el.canceled === false ?
                    <button
                      onClick={() => cancelReport(el.id)}
                      className="cancelreport"
                      value={el.id}>Cancel report</button> :
                    <button className="cancelreport" disabled>Canceled</button>}</li></div>))}
              </div>
            </div>
            <div>


            </div>
          </div>
        </div>
      }
      {edit === true && newedit === true &&

        <div>
          <Header
            logout={() => window.location.reload()}
            setEdittrue={()=>{setEdit(true); setnewedit(true)}}
          />
          <div className="edit-form">
            <Image getImg={users.base64 ? "data:image/jpeg;base64," + users.base64 : profileicon} PostImg={imgbtn} handleFileInputChange={handleFileInputChange} />
            <div className="edit-profile">
              <EditUser
                newname={newname}
                setnewname={e => setnewname(e.target.value)}
                newsurname={newsurname}
                setnewsurname={e => setnewsurname(e.target.value)}
                newemail={newemail}
                setnewemail={e => setnewemail(e.target.value)}
                inputValue={inputValue}
                seteditpasstrue={() => seteditpass(true)}
                oldname={users.name}
                oldsurname={users.surname}
                oldemail={users.email}
                updatebtn={updatebtn}
                setEditfalseseteditpassfalse={() => { setEdit(false); seteditpass(false); setnewedit(false) }}
              />
              {editpass === true &&
                <Editpass
                  oldpassword={oldpassword}
                  setoldpassword={e => setoldpassword(e.target.value)}
                  newpassword={newpassword}
                  setnewpassword={e => setnewpassword(e.target.value)}
                  passwordbtn={passwordbtn} />

              }
            </div>
          </div>
        </div>
      }

    </div>

  );
}
