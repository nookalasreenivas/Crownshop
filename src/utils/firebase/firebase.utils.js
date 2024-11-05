import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBlwBojqWkPzXeF6UDWDWqZIt3k0N2QIx0",
    authDomain: "crown-shopping-a1056.firebaseapp.com",
    projectId: "crown-shopping-a1056",
    storageBucket: "crown-shopping-a1056.appspot.com",
    messagingSenderId: "675403769705",
    appId: "1:675403769705:web:fdd972fef30c8d4c077ff8",
    measurementId: "G-PG4DQT4LQR"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.getCustomParameters({
    prompt:'select_account'
  });

export const auth = getAuth();
export const googlesigninwithpopup = ()=>{
   return signInWithPopup(auth, provider)
}
export const googlesignwithredirect = ()=>{
    signInWithRedirect(auth, provider)
}
export const db= getFirestore();
export const getcollectiontodocument = async(collectionkeys, objectoadd )=>{
    const collectionRef = collection(db, collectionkeys);
    const batch = writeBatch(db);
    objectoadd.forEach(object => {
        const docRef = doc(collectionRef,  object.title.toLowerCase());
        batch.set(docRef, object)
    });
    await batch.commit();
    console.log("Done")
}   

export const getCategories = async()=>{
    const collectionRefs = collection(db, 'collections');
    const q = query(collectionRefs);
    const collectionSnapshot = await getDocs(q);

    const categoryMap = collectionSnapshot.docs.reduce((acc, docSnapshot)=>{
        const {title,items}= docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    },{})

    return categoryMap;
}

export const createusemodelviaauth= async(userAuth, addiontalinformation={})=>{
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    //console.log(userDocRef );

    const userSnapshot = await getDoc(userDocRef);
    //console.log(userSnapshot);
    //console.log(userSnapshot.exists())
    if(!userSnapshot.exists()){
        const {displayName, email}=userAuth;
        const createdAt =  new Date();
    try{
        await setDoc(userDocRef ,{
            displayName,
            email,
            createdAt,
            ...addiontalinformation
        })
    }catch(error){
        console.log(error.message)
    }
}
    return userDocRef 
}

export const  createuseremailandpassword=async(email, password)=>{
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)

}

export const  signwithemailandpassword=async(email, password)=>{
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)

}

export const signoutUser= async()=> await signOut(auth);

export const onAuthStateChangedListner = (callback)=> onAuthStateChanged(auth, callback);