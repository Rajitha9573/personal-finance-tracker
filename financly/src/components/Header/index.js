import React, { useEffect } from "react";
import "./Style.css"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth} from "../../FireBase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";



const Header = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate()

    useEffect(()=> {

        if(user){
            navigate("/dashboard")

        }
    }, [user, loading])

    function onClickLogout(){
        try{
            alert("Logout")
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/")
            toast.success("Logged Out Successfully!")
          }).catch((error) => {
            toast.error(error.message)
            // An error happened.
          });

        }catch(e){
            toast.error(e.message)
        }
        
    }


    return(

        <div className="navbar">
            <p className="logo">Financly.</p>
            {user && (
                <p onClick={onClickLogout} className="logout-btn">Logout</p>

            )}
            
        </div>
    )
}

export default Header;