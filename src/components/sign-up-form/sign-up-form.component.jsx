import { useState } from "react";
import{createuseremailandpassword, createusemodelviaauth} from "../../utils/firebase/firebase.utils";
import FormInput  from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";
//import { Usercontext } from "../../contexts/user.context";
const defaultValue={
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
};

const SignUpForm=()=>{
    const [formFields, setFormFields]= useState(defaultValue);
    const{displayName, email,password,confirmPassword}=formFields;
    //const{setCurrentUser} = useContext(Usercontext);
    const handleChange=(event)=>{
        const{name,value}=event.target;
        setFormFields({
            ...formFields,
            [name]: value
        })
    }
    const resetFormfields=()=>{
        setFormFields(defaultValue)
    }
    const handleSubmit=async(event)=>{
        event.preventDefault();
       if(password !== confirmPassword){
        alert("Password does not match")
       }
       try{
        const{user} = await createuseremailandpassword({
            email,
            password
        });
         await createusemodelviaauth(user,{
            displayName
         });
         
         resetFormfields();
         //setCurrentUser(user)
       }
       catch(error){
        if(error.code === "auth/email-already-in-use"){
            alert('Cannot create user, email already in use');
        }
        else{
            console.log('ddd',error)
        }
       
       }
    }
    return(
        <div className='sign-up-container'>
        <h2>Don't have an account?</h2>
        <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Dispay Name" type="text" name="displayName" value={displayName} onChange={handleChange} required/>
                <FormInput label="Email" type="email" name="email" value={email} onChange={handleChange} required />
                <FormInput label="Password" type="password" name="password" value={password} onChange={handleChange} required />
                <FormInput label="Confirm Password" type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} required />
               
                <Button type="submit">Sign Up</Button>
               
            </form>
        </div>
    )
}

export default SignUpForm