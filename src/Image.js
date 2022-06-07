import React, { useState } from "react";
import "./styles.css";

export default function Image(props) {
    return (
        <div className="image">
            <label>Choose photo
            <input type="file" onChange={props.handleFileInputChange} className="custom-file-input"/></label>
            <button onClick={props.PostImg} className="uploadpic">Upload</button>
            <div><img src={props.getImg} className="profilepic"/></div>
        </div>
    );
}