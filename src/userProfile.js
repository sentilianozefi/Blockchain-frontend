import { Link } from "react-router-dom";
import "./styles.css";
import "./user.css";
import "./reports.css"
import "./userProfile.css"

export default function Profile(props) {

  return (
    <div className="container">
      <div className="nav-item wrapper-1">
         <ul class="nav flex-column" id="nav-elements" className="nav-items">
          <li class="nav-item" id="nav-element" className="nav-item add-report">
            <Link class="nav-link active" aria-current="page" to="#">Add Report</Link>
          </li>
          <li class="nav-item" id="nav-element" className="nav-item">
            <Link class="nav-link" to="#" onClick={props.reportList}>My Reports</Link>
          </li>
          <li class="nav-item" id="nav-element" className="nav-item">
            <Link class="nav-link" to="#" onClick={props.setEdittrue}>Settings</Link>
          </li>
        </ul>
      </div>
      <div class="vl"></div>
      <div className="wrapper-2">
        <div className="report-body">

          <h1 className="hello-name">Hello {props.username}</h1>
          <input
            type="text"
            value={props.reportTitle}
            onChange={props.setreportTitle}
            placeholder="Enter the report title"
            className="title"
          />
          <br></br>
          <textarea
            className="textarea"
            value={props.newreport}
            onChange={props.setnewreport}
            placeholder='Please enter your report here(max. 4000 characters)'
            wrap="hard"
            maxLength="4000"
          />
          <br />
          <button className="signup-btn add-report-btn" onClick={props.addReport}>Save</button>
        </div>
      </div>
    </div>
  );
}