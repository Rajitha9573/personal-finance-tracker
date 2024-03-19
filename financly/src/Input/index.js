import React from "react";
import "./style.css";

const Input = ({ label, state, setState, placeholder, type }) => {



  return (
    <div className="inputWrapper">

      <p className="label">{label}</p>

      <input
        type={type}
        value={state}
        placeholder={placeholder}
        onChange={(e) => setState(e.target.value)}
        className="inputBox"
      />
      
    </div>
  );
};
export default Input;
