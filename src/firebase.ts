import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBPcqQRwMfl0jLSX4NhVPau4acx3-dDbK0",
  authDomain: "netflix-clone-7e978.firebaseapp.com",
  projectId: "netflix-clone-7e978",
  storageBucket: "netflix-clone-7e978.firebasestorage.app",
  messagingSenderId: "427260987681",
  appId: "1:427260987681:web:9af049ea426d63ceaa9660"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app); //authentication
const db = getFirestore(app);  //database

const signup = async(name: string, email: string, password: string)=>{
  try{
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await addDoc(collection(db, "user"),{
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    })
  }catch(error){
    const err = error as FirebaseError
    toast.error(err.code.split('/')[1].split('-').join(" "));  //for notification
  }
}

const login = async(email: string, password: string)=>{
  try{
    await signInWithEmailAndPassword(auth, email, password);
  }catch(error){
    const err = error as FirebaseError
    toast.error(err.code.split('/')[1].split('-').join(" "));  //for notification
  }
}
const logout = ()=>{
  try{
    signOut(auth);
  }catch(error){
      console.log(error);
  }
}
export {auth, db, signup, login, logout}