import BillsList from "./bills/BillsList.tsx";
import {Container} from '@nextui-org/react';
import LoginScreen from "./LoginScreen.tsx";
import {auth} from '../../lib/firebase'
import {User} from "firebase/auth";

function HomePage() {
    const user: User | null = auth.currentUser;

    return (
        <Container
            lg
        >
            <BillsList/>
            <LoginScreen/>
        </Container>
    );
}

export default HomePage;
