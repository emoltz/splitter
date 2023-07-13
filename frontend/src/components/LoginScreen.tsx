import {auth} from '../../lib/firebase';
import {GoogleAuthProvider, signInWithPopup, UserCredential, User} from "firebase/auth";
import GoogleButton from "react-google-button";
import {Button} from "@mui/material";
import {useCurrentUser} from "../../lib/hooks";


export default function LoginScreen() {
    // GOOGLE
    const {user, loading} = useCurrentUser();


    const signInWithGoogle = async (): Promise<void> => {
        // const {user, loading} = useCurrentUser();

        if (!auth) {
            return;
        }
        const provider: GoogleAuthProvider = new GoogleAuthProvider();
        const result: UserCredential = await signInWithPopup(auth, provider);
        const user: User = result.user;
        if (user) {
            console.log(user, " is logged in.");
        }
    }

    const signOut = async (): Promise<void> => {
        if (!auth) {
            return;
        }
        await auth.signOut();
    }

    if (loading){
        return <div>loading...</div>
    }

    return (
        <>
             {!user &&
                <div className={"flex"}>
                    <GoogleButton onClick={signInWithGoogle}/>
                </div>
            }
            {user &&
                <div>
                    <Button variant={"contained"} onClick={signOut}>Sign Out</Button>
                </div>
            }
        </>
    )
}