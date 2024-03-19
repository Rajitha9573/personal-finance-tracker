import React from "react";
import "./style.css"


const Button = ({text, onClick, type, disable })=> {


    return (

        <div className="SignupBtn">

            <button disable={disable} type={type} onClick={onClick} className="loginBtn">{text}</button>

        </div>
    )
}

export default Button;