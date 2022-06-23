import { Link } from "react-router-dom";
import "./styles.css";

export default function App() {


  return (
    <div>
      <div className=" header">
        <a href="/" className="home">Whistleblowing</a>
        <div className="header-right">
          <a className="login-btn" href="/login">Log in</a>
          <a className="signup-btn" href="/signup">Sign up</a>
          <a className="login-btn" href="/admin"> Admin</a>
        </div>
      </div>
      <div className="body">
        <h1 className="hello">Hello</h1>
      </div>
    </div>
  );
}
