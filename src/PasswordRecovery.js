import "./PasswordRecovery.css"
import "./styles.css"
import "./Forms.css"
import { useState } from 'react';

export default function Recoverpassword() {
  const [username, setusername] = useState("");
  const [token, settoken] = useState(null);
  const [apply, setapply] = useState(true);

  const generateToken = () => {
    fetch("http://192.168.70.108:8080/generatetoken/" + username)
      .then(res => {
        if (!res.ok) { 
          alert("Incorrect username!") }
        else {res.json()
        alert("Request prepared!")
        setapply(false)
      }
      })
      .then((json) =>
        settoken(json))
    
  }

  const getemail = () => {
    fetch("http://192.168.70.108:8080/sendemail/" + username)
      .then(res => res.json())
    alert("Please check your e-mail!")
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
            {apply === true && 
            <div>
              <input class="form-control" type="text" placeholder="Username" value={username} onChange={(e) => setusername(e.target.value)} />
              <br></br> 
            <button onClick={generateToken} className = "login-btn-2">Apply</button>
            </div>}

            {apply === false && 
            <div>
              <input class="form-control" type="text" placeholder="Username" value={username} />
              <br></br>
              <button onClick={getemail} className = "login-btn-2">Get recovery link</button>
              </div>}
          </div>

        </div>

      </div>

    </div>
  );
}