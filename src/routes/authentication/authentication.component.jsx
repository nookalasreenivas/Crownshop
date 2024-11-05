import {auth, googlesigninwithpopup, createusemodelviaauth, googlesignwithredirect} from "../../utils/firebase/firebase.utils" 
import { useEffect } from "react";
import {getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import "./authentication.styles.scss";
const Auth = ()=>{
    useEffect(()=>{
        gerResult();
    },[]);

     const gerResult=async()=> {
            const response= await getRedirectResult(auth)
            console.log(response);
            
        }
    const signgooglewithpopup=async()=>{
        const {user} = await googlesigninwithpopup();
        console.log(user);
        const userDocRef = await createusemodelviaauth(user);
    }
    return(
        <div className="authentication-container">
            <SignInForm></SignInForm>
            <SignUpForm></SignUpForm>
        </div>
    )
        
}

export default Auth 