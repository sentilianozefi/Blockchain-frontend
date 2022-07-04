import { Link, useNavigate } from "react-router-dom";
// import "./styles.css";
// import "./Forms.css";
import "./userProfile.css";
import "./Login.css";
import "./user.css";
import profileicon from './profileicon.png';
import React, { useEffect, useState } from "react";
import Profile from "./userProfile";
import EditUser from "./editUser";
import Editpass from "./editpass";
import Header from "./header";
import "./reports.css";
import Image from "./Image";
import { AiFillEdit } from "react-icons/ai"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from 'sweetalert2';

export default function Login() {

  const [users, setUsers] = useState(null);
  const [inputValue, setValue] = useState('');
  const [passValue, setPassValue] = useState('');
  const [newreport, setnewreport] = useState("");
  const [reportTitle, setreportTitle] = useState("");
  const [reports, setReports] = useState([]);
  const [edit, setEdit] = useState(false);
  const [newname, setnewname] = useState("");
  const [newsurname, setnewsurname] = useState("");
  const [newemail, setnewemail] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [oldpassword, setoldpassword] = useState("");
  const [editpass, seteditpass] = useState(false);
  const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  const [file, setfile] = useState(null);
  const [base64URL, setbase64URL] = useState("");
  const [report2, setreport2] = useState("");
  const [arr, setArr] = useState([]);
  const [report2title, setreport2title] = useState("");
  const [reportList, setreportList] = useState(false);

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

  const PostImg = () => {
    fetch('http://192.168.70.108:8080/setpic/' + inputValue, {
      method: 'POST',
      body: base64URL
    })
      .then((res) => {
        res.json()
      })
  }
  const imgbtn = () => {
    PostImg();
    setbase64URL("");
    Swal.fire(
      'Success!',
      'You successfully added a new profile picture!',
      'success'
    );
    fetchData();
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
        title: reportTitle,
        report: newreport

      }),
    })
      .then((res) => {
        res.json()
        getReport();
        Swal.fire(
          'Good job!',
          'You successfully added a new report.',
          'success'
        );

      });
  };

  const getReport = async () => {
    const res = await fetch("http://192.168.70.108:8080/GetReports/" + inputValue);
    const json = await res.json()
    setReports(json)

  }

  useEffect(() => {
    let temp = reports
    temp.map(el => {
      el = { ...el, displayEdit: false }
    })
    setArr(temp);
  }, [reports])

  const addReport = () => {
    if (newreport === "") {
      Swal.fire(
        'Can not add empty report!',
        "",
        'question'
      )
    }
    else if (reportTitle === "") {
      Swal.fire(
        'Please enter the title!',
        "",
        'question'
      )
    }
    else {
      createReport();
      setreportTitle("");
      setnewreport("");
    }
  };


  const cancelReport = (id) => {
    fetch("http://192.168.70.108:8080/UpdateReport/" + id + "/" + true, {
      method: 'PUT',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => {
      response.json(),
        getReport()
    }
    )

  }

  const fetchData = async () => {
    const res = await fetch("http://192.168.70.108:8080/GetUser/" + inputValue + "/" + passValue);
    const json = await res.json()

    if (!res.ok) {
      setUsers(null);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Wrong username or password!',
      });
    }
    else setUsers(json);

  }

  const login = () => {
    if (inputValue === "" || passValue === "") {
      Swal.fire(
        'One or more fields are empty!',
        "",
        'question'
      )
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
    )
  }
  const updatebtn = () => {
    if (newname === "" || newsurname === "" || newemail === "") {
      Swal.fire(
        'One or more fields are empty!',
        "",
        'question'
      )
    }
    else {
      update();
      Swal.fire(
        'Good job!',
        'Your data updated successfully!',
        'success'
      );
      setnewname("");
      setnewsurname("");
      setnewemail("");
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
    )
  }
  const passwordbtn = () => {
    if (oldpassword === "" || newpassword === "") {
      Swal.fire(
        'One or more fields are empty!',
        "",
        'question'
      )
    }
    else if (oldpassword !== passValue) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Old password is wrong!',
      })
    }
    else if (!strongRegex.test(newpassword)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'New password does not meet the conditions!',
      })
    }
    else {
      changepass();
      Swal.fire(
        'Good job!',
        'Password updated successfully!',
        'success'
      );
      setoldpassword("");
      setnewpassword("");
      seteditpass(false);

    }
  }
  const editreport = (id) => {
    fetch("http://192.168.70.108:8080/UpdateReportEssence/" + id + "/" + report2 + "/" + report2title, {
      method: 'PUT',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => {
      if (!response.ok) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Update time has passed!',
        });
      }
      else {
        response.json();
        getReport();
        Swal.fire(
          'You successfully edited your report!',
          '',
          'success'
        );
        setreport2("");
        setreport2title("");
      }
    }
    )
  }

  const reportedit = (id) => {
    if (report2 === "" || report2title === "") {
      Swal.fire(
        'You can not submit an empty report or an empty title!',
        '',
        'question'
      )
    }
    else {
      editreport(id);
      fetchData();
    }

  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      {users === null &&

        <div>
          <div className=" header">
            <a href="/" className="home">Whistleblowing</a>
            <div className="header-right">
              <Link to="/admin"><button className="login-btn"> Admin</button></Link>
              <Link to="/signup"><button className="signup-btn">Sign up</button></Link>

            </div>
          </div>
          <div className="login-body">
            <div className="login-form home-divs">
              <form onSubmit={e => e.preventDefault()}>
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
          </div>
        </div>}

      {users !== null && edit === false && users.state === false && reportList === false &&

        <div>

          <Header
            logout={() => window.location.reload()}
          />

          <div className="userpage">
            <div className="nav-item wrapper-1">
              <ul class="nav flex-column" id="nav-elements" className="nav-items">
                <li class="nav-item" id="nav-element" className="nav-item add-report">
                  <Link class="nav-link active" aria-current="page" to="#">Add Report</Link>
                </li>
                <li class="nav-item" id="nav-element" className="nav-item">
                  <Link class="nav-link" to="#" onClick={() => setreportList(true)}>My Reports</Link>
                </li>
                <li class="nav-item" id="nav-element" className="nav-item">
                  <Link class="nav-link" to="#" onClick={() => setEdit(true)}>Settings</Link>
                </li>
              </ul>
            </div>

            <div>
              <Profile
                username={users.name + " " + users.surname}
                reportTitle={reportTitle}
                setreportTitle={e => setreportTitle(e.target.value)}
                newreport={newreport}
                setnewreport={e => setnewreport(e.target.value)}
                addReport={addReport}
              />
            </div>
          </div>
        </div>
      }
      {reportList === true && users !== null && edit === false &&

        <div>
          <Header />
          <div className="userpage">
              <div className="nav-item wrapper-1">
                <ul class="nav flex-column" id="nav-elements" className="nav-items">
                  <li class="nav-item" id="nav-element" className="nav-item">
                    <Link class="nav-link active" aria-current="page" to="#" onClick={() => setreportList(false)}>Add Report</Link>
                  </li>
                  <li class="nav-item" id="nav-element" className="nav-item add-report">
                    <Link class="nav-link" to="#" >My Reports</Link>
                  </li>
                  <li class="nav-item" id="nav-element" className="nav-item">
                    <Link class="nav-link" to="#" onClick={() => { setEdit(true); setreportList(false) }}>Settings</Link>
                  </li>
                </ul>
              </div>
              <div class="vl"></div>
              <div className="wrapper-2-myreports">
                {arr !== null && arr.map((el) => <div className="reports">{el.display === true && <li key={el.username} className="reportlist">
                  <div className="report-container">
                    {el.canceled === false && <Button
                      onClick={() => { el.displayEdit = true; fetchData(); handleClickOpen(); setreport2title(el.title); setreport2(el.report) }}
                      type="button"
                      className="edit-btn"
                      id="edit-btn"
                    >
                      <AiFillEdit />
                    </Button>}
                    <h3>{el.title}</h3>

                    <div className="report-scrollable">{el.report}</div>
                  </div>
                  <br />
                  {el.canceled === false ?
                    <div>

                      {el.displayEdit &&
                        <div>
                          <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"

                          >
                            <DialogTitle id="alert-dialog-title">
                              <textarea className="form-input edit-title-input" value={report2title} onChange={e => setreport2title(e.target.value)}>{el.title}</textarea>
                            </DialogTitle>
                            <DialogContent className="dialog-content">
                              <DialogContentText id="alert-dialog-description">
                                <textarea id="edit-report-input" className="form-input edit-report-input" value={report2} onChange={(e) => setreport2(e.target.value)}>{el.report}</textarea>
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={() => { reportedit(el.id); el.displayEdit = !el.displayEdit; handleClose() }} autoFocus>
                                Save changes
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </div>
                      }
                      <button
                        onClick={() => cancelReport(el.id)}
                        className="cancelreport"
                        value={el.id}>Cancel report</button>
                    </div> :
                    <button className="cancelreport" disabled>Canceled</button>}</li>}</div>)}
              </div>
            </div>
          </div>
      }
      {edit === true &&

        <div>
          <Header
            logout={() => window.location.reload()}
          />
          <div className="nav-item wrapper-1">
            <ul class="nav flex-column" id="nav-elements" className="nav-items">
              <li class="nav-item" id="nav-element" className="nav-item">
                <Link class="nav-link" to="#" onClick={() => { setreportList(false); setEdit(false) }}>Add Report</Link>
              </li>
              <li class="nav-item" id="nav-element" className="nav-item">
                <Link class="nav-link" to="#" onClick={() => { setEdit(false); setreportList(true) }}>My Reports</Link>
              </li>
              <li class="nav-item" id="nav-element" className="nav-item add-report">
                <Link class="nav-link active" aria-current="page" to="#">Settings</Link>
              </li>
            </ul>
          </div>
          <div class="vl" style={{ 'height': '90%', 'marginTop': '10vh' }}></div>
          <div className="edit-form">
            <Image
              getImg={users.base64 ? "data:image/jpeg;base64," + users.base64 : profileicon}
              handleFileInputChange={handleFileInputChange} />
            {base64URL !== "" && <button style={{ 'transform': 'translate(-10px,-130px)' }} onClick={imgbtn} className="uploadpic">Upload</button>}
            <div className="edit-profile">
              <EditUser
                newname={newname}
                setnewname={e => setnewname(e.target.value)}
                newsurname={newsurname}
                setnewsurname={e => setnewsurname(e.target.value)}
                newemail={newemail}
                setnewemail={e => setnewemail(e.target.value)}
                inputValue={inputValue}
                seteditpasstrue={() => seteditpass(!editpass)}
                oldname={users.name}
                oldsurname={users.surname}
                oldemail={users.email}
                updatebtn={updatebtn}
                setEditfalseseteditpassfalse={() => { setEdit(false); seteditpass(false) }}
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
      {users !== null && edit === false && users.state === true &&
        <div>
          <div className=" header">
            <a href="/" className="home">Whistleblowing</a>
            <div className="header-right">
              <a className="login-btn" href="/login">Log in</a>
              <a className="signup-btn" href="/signup">Sign up</a>
            </div>
          </div>
          <div className="disabled"><div><h1>Sorry your account is disabled!</h1></div></div></div>}

    </div>

  );
}
