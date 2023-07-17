import BillsList from "./bills/BillsList";
import {Container} from '@nextui-org/react';
// import LoginScreen from "./LoginScreen";
// import {Loading} from "@nextui-org/react";
//
// import {useCurrentUser} from "../../lib/hooks";


function HomePage() {

    return (
        <Container
            lg
        >
            <div className={"p-3"}/>
            <BillsList/>


        </Container>
    );
}

export default HomePage;
