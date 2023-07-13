import BillsList from "./bills/BillsList";
import {Container} from '@nextui-org/react';
import LoginScreen from "./LoginScreen";
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

            <div className={"p-3"}/>
            <BillsList/>


        </Container>
    );
}

export default HomePage;
