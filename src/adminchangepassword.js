import { useState } from "react";
import { useParams } from "react-router-dom"
import "./PasswordRecovery.css"
import "./Forms.css"
import  Swal from 'sweetalert2';

export default function ChangeUserPass() {
  const [newpass, setnewpass] = useState("");
  const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  let params = useParams();

  const adminresetpass = async () => {
    const res = await fetch("http://192.168.70.108:8080/adminchangepass/" + params.admin + "/" + params.username, {
      method: "POST",
      body: newpass,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
        'Authorization': 'Bearer key',
      }
    })
    const json = await res.json();

  }
  const passwordbtn = () => {
    if (newpass === "") {
      Swal.fire(
        'Password can not be empty!',
        "",
        'question'
      )
    }
    else if (!strongRegex.test(newpass)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '\n New password does not meet the conditions! \n Remember: Password must contain at least 8 characters including: \n An uppercase letter, a number and a special character!',
      });
    }
    else {
      adminresetpass();
      Swal.fire(
        'Success!',
        'Password updated successfully!',
        'success'
      );
    }
  }

  return (
    <div className="recover-body ">
      <div className="recover-area2">
        <h2>Reset password for user "{params.username}"</h2>
        <br /><br />
        <input className="form-control" type="password" value={newpass} onChange={(e) => setnewpass(e.target.value)} placeholder="New password" /><br />
        <button className="login-btn-2" onClick={passwordbtn}>Reset</button>
      </div>
    </div>
  )
}