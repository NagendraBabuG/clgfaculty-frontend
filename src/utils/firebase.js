// Import the functions you need from the SDKs you need
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'
import { initializeApp } from "firebase/app";
import axios from 'axios';
import {GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAIcvhbf4GgDDy1j7x6hb1HWvMWCD5zttw",
    authDomain: "facultyiiitdmk.firebaseapp.com",
    databaseURL: "https://facultyiiitdmk-default-rtdb.firebaseio.com",
    projectId: "facultyiiitdmk",
    storageBucket: "facultyiiitdmk.appspot.com",
    messagingSenderId: "36533526390",
    appId: "1:36533526390:web:52f9b7c3e523c265266457",
    measurementId: "G-MG8CT1DP3M"
  };


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt : "select_account"
});
export const auth = getAuth();
export const signInWithGooglePopup = ()=> signInWithPopup(auth, provider);         

export const db = getFirestore();


export const  createUserDocumentFromAuth = async(userAuth, additionalInformation={})=>
{
  console.log(additionalInformation)
  if(!userAuth) return;
  const userDocRef = doc(db, 'employees', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if(!userSnapshot.exists())
  {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try{
      await setDoc(userDocRef, {displayName, email, createdAt, ...additionalInformation,});
    }
    catch(error)
    {
      console.log('error creating the user ', error.message)
    }
  
  }

 // console.log(userDocRef)
  return userDocRef;


};  


export const createAuthUserWithEmailAndPassword = async(email, password)=> {
    console.log(email, password)
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}


export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}
export const getUserDoc = async (user)=>
{
  if(!user) return null
  console.log(user.uid)
  const userDocRef = doc(db, 'employees', user.uid);
  console.log(userDocRef)
  const userSnapshot = await getDoc(userDocRef);
  if(!userSnapshot.exists()) return null
  console.log('exists')
  const userDoc = userSnapshot.data()
  sessionStorage.setItem("userData", userDoc.role)
  console.log("userSnapshot ", userDoc)
  return userDoc;

  //const usersCollection = firebase.firestore().collection("employees");

            // // Query the collection for the user document with the corresponding UID
            // usersCollection.doc(user.uid).get().then((doc) => {
            //   if (doc.exists) {
            //     // User document found
            //     const userData = doc.data(); 
            //     console.log(userData)// Get the user data from the document
            //     sessionStorage.setItem("userData", userData)
            //     // Use the user data as needed
            //   } else {
            //     // User document not found
            //   }
            // })
}
export const signOutUser = () => {
  signOut(auth);
  sessionStorage.removeItem('user')
}

export const handleGoogleSignIn = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("User signed in with Google:", user.auth.currentUser.auth);
    const token = await user.getIdToken();
    console.log(token)
    const expirationMs = 45*60*1000
    const data = {
      "id" : token,
      "name": user.displayName,
      "email": user.email
    }
    const item = {
    data,
    expiration: Date.now() + expirationMs, // Calculate expiration timestamp
    };
    
    sessionStorage.setItem('user', JSON.stringify(item))
    axios.post("http://localhost:5000/createUser", data).then((res)=>{
      if(res.status != 400)
      {
        console.log(res.data)
      }
    }).catch((error)=>{
      console.log(error)
    })
    window.location.reload()

  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};