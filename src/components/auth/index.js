import React from "react";
//import './index.css'
import { handleGoogleSignIn } from "../../utils/firebase";


const SignInButton = ()=>{
    return (
        <div className="google-sign-in">
        <button onClick={handleGoogleSignIn}>Sign In with Google</button>
      </div>
    )
}
export default SignInButton