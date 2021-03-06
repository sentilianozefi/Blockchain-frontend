import "./PasswordRecovery.css"
import "./styles.css"
import "./Forms.css"
import { useState } from 'react';
import  Swal from 'sweetalert2';

export default function Recoverpassword() {
  const [username, setusername] = useState("");
  const [token, settoken] = useState(null);
  const [btnstate, setbtnstate] = useState(true)

  const generateToken = () => {
    fetch("http://192.168.70.108:8080/generatetoken/" + username)
      .then(res => {
        if (!res.ok) {
          Swal.fire({
            icon: 'error',
            title: 'Incorrect username!',
            text: '',
          })
        }
        else {
          setbtnstate(false)
          res.json()
          Swal.fire(
            'Please check your e-mail!',
            '',
            'success'
          )
        }
      })
      .then((json) =>
        settoken(json))

  }

  const getLink = () =>{
    if(username === ""){
      Swal.fire({
        icon: 'question',
        title: 'Please enter your username!',
        text: '',
      })
    }
    else{
      generateToken();
    }
  }

  return (
    <div>
      <div className=" header">
        <a href="/" className="home">Whistleblowing</a>
        <div className="header-right">
          <a className="login-btn" href="/login">Log in</a>
          <a className="signup-btn" href="/signup">Sign up</a>
        </div>
      </div>
      <div className="recover-body">
        <div className="recover-area">
          <div className="form-recover-password">
            <h1>FORGOT PASSWORD?</h1>
            <p>Please enter your username below and we will send you information to recover your account</p>

            <br />
            <div>
              <input class="form-control" type="text" placeholder="Username" value={username} onChange={(e) => setusername(e.target.value)} />
              <br></br>
              {btnstate === true ?
              <button onClick={getLink} className="login-btn-2">Get recovery link</button> : 
              <button className="login-btn-2" disabled>E-mail sent</button>
            }
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}