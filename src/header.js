import { Link } from "react-router-dom";
export default function Header(props) {
    return (
        <div>
            <div className="header">
                <a href="/" className="home">Whistleblowing</a>
                <div className="header-right">
                    <button className="login-btn" ><a onClick={props.setEdittrue}>Edit Profile</a></button>
                    <button className="log-out" id="logout-btn" onClick={props.logout}> <a href="/login">Log out</a></button>
                </div>
            </div>
        </div>);
}