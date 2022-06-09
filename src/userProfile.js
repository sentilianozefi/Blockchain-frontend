import "./styles.css";
import "./user.css";
import "./reports.css"

export default function Profile(props) {

  return (
    <div className="report-body">

        <h1 className="hello-name">Hello {props.username}</h1>
       <input 
       type = "text" 
       value = {props.reportTitle} 
       onChange = {props.setreportTitle} 
       placeholder = "Enter the report title"
       className="title"
       />
       <br></br>
        <textarea
        className="textarea"
          value={props.newreport}
          onChange={props.setnewreport}
          placeholder='please enter your report here(max. 4000 characters)'
          wrap="hard"
          maxLength="4000"
        />
        <br />
        <button className="signup-btn add-report" onClick={props.addReport}>Add report</button>


    </div>
  );
}