import BillsList from "./bills/BillsList.tsx";
import {Container} from '@nextui-org/react';
import LoginScreen from "./LoginScreen.tsx";
import {Loading} from "@nextui-org/react";

import {useCurrentUser} from "../../lib/hooks";


function HomePage() {
    const {user, loading} = useCurrentUser();
    if (loading) {
        return <Loading/>;
    }

    return (
        <Container
            lg
        >
            {!user &&

                <LoginScreen/>

            }
            {user &&
                <div>Signed in as {user?.displayName}</div>
            }
            <div className={"p-3"}/>
            <BillsList/>


        </Container>
    );
}

export default HomePage;
