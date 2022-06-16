import { useState } from "react";
import { useParams } from "react-router-dom"

export default function ChangeUserPass(){
    const [newpass, setnewpass] = useState("");
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    let params = useParams();

    const adminresetpass = async () =>{
        const res = await fetch("http://192.168.70.108:8080/adminchangepass/"+params.admin+"/"+params.username, {
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
              }})
          const json = await res.json();

        }
        const passwordbtn = () => {
            if (newpass === "") {
              alert("Password can not be empty!")
            }
            else if (!strongRegex.test(newpass)) {
              alert("New password does not meet the conditions!");
            }
            else {
              adminresetpass();
              alert("Password updated successfully!");
            }
          }
   
    return(
        <div>
            <input type = "password" value={newpass} onChange={(e)=>setnewpass(e.target.value)}/>
            <button onClick={passwordbtn}>Submit</button>
            <h1>{params.username}</h1>
        </div>
    )
}