import React from "react";
import Header from "../components/Header";
import SignupSignin from "../components/SignupSignin";
import "./style.css"


const Signup = () => {


    return (

        <div>
            <Header />
            <div className="wrapper">

                <SignupSignin />
                
            </div>


        </div>
    )

}

export default Signup;