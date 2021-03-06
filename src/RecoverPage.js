import React from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import "./PasswordRecovery.css";
import "./styles.css";
import "./Forms.css";
import  Swal from 'sweetalert2';

export default function Recover() {

    const [newPassword, setnewPassword] = useState("");
    const [confirmpass, setconfirmpass] = useState("");
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    let params = useParams();

    const resetpass = () => {
        fetch("http://192.168.70.108:8080/respas/" + params.token + "/" + newPassword)
            .then(res => {
                if (!res.ok) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Token has expired or wrong token!',
                        text: '',
                      })
                }
                else {
                    res.json()
                    Swal.fire(
                        'Password saved!',
                        '',
                        'success'
                      )
                }
            })
    }

    const reset = () => {
        if (newPassword === "" || confirmpass === "") {
            Swal.fire(
                'One or more of the required fields is empty!',
                "",
                'question'
              )
        }
        else if (newPassword !== confirmpass) {
            Swal.fire({
                icon: 'error',
                title: 'Passwords do not match!',
                text: '',
              })
        }
        else if (!strongRegex.test(newPassword)) {
            Swal.fire({
              icon: 'error',
              title: '\n New password does not meet the conditions! \n Remember: Password must contain at least 8 characters including: \n An uppercase letter, a number and a special character!',
              text: '',
            });
          }
        else
            resetpass();
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

                        <div className='form-inputs-recover'>

                            <label className='form-label'>New password:</label>

                            <input className='form-input input-with-border' type="password" value={newPassword} onChange={e => setnewPassword(e.target.value)} />

                        </div>

                        <div className='form-inputs-recover'>

                            <label className='form-label'>Confirm password:</label>

                            <input className='form-input input-with-border' type="password" value={confirmpass} onChange={e => setconfirmpass(e.target.value)} />

                        </div>

                        <div className='button-save-pw'>

                            <button className='signup-btn save-password' onClick={reset}>Save password</button>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}