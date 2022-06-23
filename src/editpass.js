import "./styles.css";
import "./user.css";
export default function Editpass(props) {


  return (
    <div>
      <div className="edit-pass">
        <div class="mb-3" className="form-inputs">
          <label class="form-label" className="form-label">Old Password: </label>
          <input class="form-control"
            type="password"
            placeholder="Enter the old password"
            value={props.oldpassword}
            onChange={props.setoldpassword}
          />
        </div>
        <div class="mb-3" className="form-inputs">
          <label class="form-label" className="form-label">New Password: </label>
          <input class="form-control"
            type="password"
            placeholder="Enter the new password"
            value={props.newpassword}
            onChange={props.setnewpassword}
          />
        </div>
        <p className="explanation" style={{ "color": "red" }}>*Password must contain at least: 8 characters, an uppercase letter, a number and a special character</p>


      </div>
      <button className="savepass" style={{ "margin-top": "20px" }} onClick={props.passwordbtn}>Save password</button>
    </div>

  );
}
