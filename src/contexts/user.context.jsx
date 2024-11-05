import { createContext, useState, useEffect } from "react";
import{onAuthStateChangedListner, createusemodelviaauth} from "../utils/firebase/firebase.utils";
 
export const Usercontext = createContext({
    currentUser: null,
    setCurrentUser: ()=> null
});

export const Userprovider = ({children})=>{
    const [currentUser, setCurrentUser]= useState(null);
    const values={currentUser, setCurrentUser};
    useEffect(()=>{
        const unSbscribe = onAuthStateChangedListner(user=>{
           if(user){
            createusemodelviaauth(user)
           }
           setCurrentUser(user)
        });
        return unSbscribe;
    },[]);

    return <Usercontext.Provider value={values}>{children}</Usercontext.Provider>
}