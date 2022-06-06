import React from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {useState} from 'react';
export default function Recover() {

    const [newPassword, setnewPassword] = useState("");
    const [confirmpass, setconfirmpass] = useState("");

    let params = useParams();

    const resetpass = () => {
        fetch("http://192.168.70.108:8080/respas/"+params.token+"/"+newPassword)
          .then(res =>{ if(!res.ok){
              alert("Token expired or wrong token!")
          }
          else {res.json()
          alert("Password saved!")}
        })
        }
        
      

      const reset = () =>{
          if(newPassword === "" || confirmpass === ""){
              alert("One or more of the required fields is empty!")
          }
          else if(newPassword !== confirmpass){
              alert("Passwords do not match!")
          }
          else
          resetpass();
      }
    

    return (

        <div>
            <div>
                <button onClick={() => console.log(params)}>test</button>
                <label>New password:</label>
                <input type="password" value={newPassword} onChange={e=>setnewPassword(e.target.value)}/>
            </div>
            <div>
                <label>Confirm password:</label>
                <input type="password" value={confirmpass} onChange={e=>setconfirmpass(e.target.value)}/>
            </div>
            <button onClick={reset}>Save password</button>

        </div>
    );
}