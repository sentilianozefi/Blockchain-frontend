import React, { useState } from "react";
import "./styles.css";

export default function Image(props) {
    return (
        <div className="image">
            <div><img src={props.getImg} className="profilepic" /><label className="upload__pic"><i class="material-icons">&#xe439;</i>
                <input type="file" onChange={props.handleFileInputChange} className="custom-file-input" /></label> </div>

        </div>
    );
}