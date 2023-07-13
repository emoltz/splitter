import {auth} from '../../lib/firebase';
import {GoogleAuthProvider, signInWithPopup, UserCredential, User} from "firebase/auth";
import GoogleButton from "react-google-button";


export default function LoginScreen(){
    // GOOGLE

    const signInWithGoogle = async (): Promise<void> => {
        if (!auth){
            return;
        }
        const provider: GoogleAuthProvider = new GoogleAuthProvider();
        const result: UserCredential = await signInWithPopup(auth, provider);
        const user: User = result.user;
        if (user){
            console.log(user, " is logged in.");
        }
    }

    return(
        <div className={"flex"}>
            <GoogleButton onClick={signInWithGoogle}/>
        </div>
    )
}