import { useState } from "react";
import{createusemodelviaauth, googlesigninwithpopup, signwithemailandpassword} from "../../utils/firebase/firebase.utils";
import FormInput  from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import Button,{BUTTON_TYPE_CLASSES} from "../button/button.component";
//import { Usercontext } from "../../contexts/user.context";
const defaultValue={
    email:'',
    password:'',
};

const SignInForm=()=>{
    //const {setCurrentUser}= useContext(Usercontext);
    const [formFields, setFormFields]= useState(defaultValue);
    const{email,password}=formFields;
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
    const signgooglewithpopup=async()=>{
        const {user} = await googlesigninwithpopup();
        await createusemodelviaauth(user);
       // setCurrentUser(user)
    }
    const handleSubmit=async(event)=>{
        event.preventDefault();
      
       try{
        const response = await signwithemailandpassword(email, password);
        //console.log(response);
         resetFormfields();
         //setCurrentUser(response)
       }
       catch(error){
        switch (error.code) {
            case 'auth/wrong-password':
              alert('incorrect password for email');
              break;
            case 'auth/user-not-found':
              alert('no user associated with this email');
              break;
              case 'auth/invalid-credential':
                alert("Invalid Credentials");
                break;
            default:
              console.log(error);
          }
       }
    }
    return(
        <div className='sign-up-container'>
        <h2>Already have an account?</h2>
        <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" name="email" value={email} onChange={handleChange} required />
                <FormInput label="Password" type="password" name="password" value={password} onChange={handleChange} required />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} onClick={signgooglewithpopup} type="submit">Google Sign In</Button>
                </div>
               
            </form>
        </div>
    )
}

export default SignInForm