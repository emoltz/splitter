// Import the functions you need from the SDKs you need
import {initializeApp, FirebaseApp} from "firebase/app";
import {getAuth, Auth, GoogleAuthProvider} from "firebase/auth";
// import {config} from 'dotenv';
//
// config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBkP37_Hj-cGXgnVy8DlMRn0reawJQGgFg",
    authDomain: "splitter-project-e5beb.firebaseapp.com",
    projectId: "splitter-project-e5beb",
    storageBucket: "splitter-project-e5beb.appspot.com",
    messagingSenderId: "756621339090",
    appId: "1:756621339090:web:8d613566d8cfe85115800b"
};

// Initialize Firebase
export const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth();
export const provider = new GoogleAuthProvider();