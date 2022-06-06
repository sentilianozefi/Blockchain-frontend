import "./styles.css";
import "./user.css";
import Image from "./Image";

export default function EditUser(props) {


    return (
        <div className="data-form">
           
            <form>

                <div class="mb-3" className="form-inputs">
                    <label class="form-label" className="form-label">Name: </label>
                    <input class="form-control"
                        type="text"
                        placeholder={props.oldname}
                        value={props.newname}
                        onChange={props.setnewname}
                    />
                </div>
                <div class="mb-3" className="form-inputs">
                    <label class="form-label" className="form-label">Surname: </label>
                    <input class="form-control"
                        type="text"
                        placeholder={props.oldsurname}
                        value={props.newsurname}
                        onChange={props.setnewsurname}
                    />
                </div>

                <div class="mb-3" className="form-inputs">
                    <label class="form-label" className="form-label">E-mail: </label>
                    <input class="form-control"
                        type="text"
                        placeholder={props.oldemail}
                        value={props.newemail}
                        onChange={props.setnewemail}
                    />
                </div>
                <div class="mb-3" className="form-inputs">
                    <label class="form-label" className="form-label">Username: </label>
                    <input class="form-control"
                        type="text"
                        defaultValue={props.inputValue}
                        readOnly
                    />
                </div>
                <button class="btn btn-primary" className="login-btn update-password"><a className="changepass" href="#" onClick={props.seteditpasstrue}>Update password &#8595;</a></button>

                <div className="edit-btns">
                    <button className="login-btn" onClick={props.updatebtn}>Update</button>
                    <button className="login-btn" onClick={props.setEditfalseseteditpassfalse}>Close</button>
                </div>
            </form>
        </div>

    );

}