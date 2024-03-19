import React, { useState } from "react";
import "./style.css";
import Input from "../../Input";
import Button from "../../Button/Button";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db, provider } from "../../FireBase";
import { getDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";

const SignupSignin = () => {
  // const [value, setValue] = useState({name:"", email:"", password:"", conformPassword:""});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();

  function signUpWithEmail() {
    setLoading(true);

    console.log(name, email, password, conformPassword);

    if (name !== "" && email !== "" && password !== "" && conformPassword !== "") {
      if (password === conformPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            createDoc(user);
            console.log(user);
            setLoading(false);
            toast.success("Sign Up Successfully!");
            setName("");
            setEmail("");
            setPassword("");
            setConformPassword("");
            navigate("/dashboard")
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
      } else {
        toast.error("Password and Conform Password does not match!");
        setLoading(false);
      }
    } else {
      toast.error("all fields are mandatory!");
      setLoading(false);
    }
  }

  function loginWithEmail() {
    setLoading(true)
    console.log(email, password);
    if ( email !== "" && password !== "") {
      
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;

            console.log("user login", user)
            setLoading(false);
            toast.success("User Logged in!");
            setName("");
            setEmail("");
            setPassword("");
            setConformPassword("");
            navigate("/dashboard")
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            
          });
      
    } else {
      toast.error("all fields are mandatory!");
      setLoading(false);
    }
  }

  async function createDoc(user) {

    if(!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if(!userData.exits){
      try{
        await setDoc(doc(db, "users", user.uid), {
          name:  user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date()
    
        });
        toast.success("doc is created")
  
      }catch(e){
        toast.error(e.message)
      }

    }
    else{
      toast.error("doc already created")
    }
 }

 function googleAuth(){
  try{
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      toast.success("User authenticated!")
      createDoc(user)
      navigate("/dashboard")
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage)
      // The email of the user's account used.
      const email = error.customData.email;
      
    });

  }catch(e){
    toast.error(e.message)
  }
 }

  return (
    <>
      {loginForm ? (
        <>
          
          <div className="login-wrapper">
            <h2 className="signup-heading">
              Login on <span className="Financly">Financly.</span>
            </h2>
            <form>
              <Input
                type="email"
                label={"Email"}
                state={email}
                setState={setEmail}
                placeholder={"name123@gmail.com"}
              />

              <Input
                type="password"
                label={"Password"}
                state={password}
                setState={setPassword}
                placeholder={"Password"}
              />

              <Button
                disable={loading}
                type="button"
                text={loading ? "Loading..." : "Login With Email and Passworrd"}
                onClick={loginWithEmail}
              />
              <p className="OrText">or</p>
              <Button
                disable={loading}
                type="button"
                text={loading ? "Loading..." : "Login With Google"}
                onClick={googleAuth}
              />
              <p className="choice" onClick={() => setLoginForm(!loginForm)}>
                or Don't Have An Account ? Click Here
              </p>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="login-wrapper">
            <h2 className="signup-heading">
              Sign Up on <span className="Financly">Financly.</span>
            </h2>
            <form>
              <Input
                type="text"
                label={"Full Name"}
                state={name}
                setState={setName}
                placeholder={"Enter Name"}
              />

              <Input
                type="email"
                label={"Email"}
                state={email}
                setState={setEmail}
                placeholder={"name123@gmail.com"}
              />

              <Input
                type="password"
                label={"Password"}
                state={password}
                setState={setPassword}
                placeholder={"Password"}
              />

              <Input
                type="password"
                label={"Conform Password"}
                state={conformPassword}
                setState={setConformPassword}
                placeholder={"Conform Password"}
              />

              <Button
                disable={loading}
                type="button"
                text={loading ? "Loading..." : "Signup With Email"}
                onClick={signUpWithEmail}
              />
              <p className="OrText">or</p>
              <Button
                disable={loading}
                type="button"
                text={loading ? "Loading..." : "Signup With Google"}
                onClick={googleAuth}
              />
              <p className="choice" onClick={() => setLoginForm(!loginForm)}>
                or Have An Account Already ? Click Here
              </p>
            </form>
          </div>
        </>
      )}
      {/* <div className="login-wrapper">
      <h2 className="signup-heading">
        Sign Up on <span className="Financly">Financly.</span>
      </h2>
      <form>
        <Input
          type="text"
          label={"Full Name"}
          state={name}
          setState={setName}
          placeholder={"Enter Name"}
        />

        <Input
          type="email"
          label={"Email"}
          state={email}
          setState={setEmail}
          placeholder={"name123@gmail.com"}
        />

        <Input
          type="password"
          label={"Password"}
          state={password}
          setState={setPassword}
          placeholder={"Password"}
        />

        <Input
          type="password"
          label={"Conform Password"}
          state={conformPassword}
          setState={setConformPassword}
          placeholder={"Conform Password"}
        />

        <Button
          disable={loading}
          type="button"
          text={loading ? "Loading..." : "Signup With Email"}
          onClick={signUpWithEmail}
        />
        <p className="OrText">or</p>
        <Button
          disable={loading}
          type="button"
          text={loading ? "Loading..." : "Signup With Google"}
        />
      </form>
    </div> */}
    </>
  );
};

export default SignupSignin;
