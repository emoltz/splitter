import BillsList from "./bills/BillsList.tsx";
import {Container} from '@nextui-org/react';

function HomePage() {

    return (
        <Container
            lg
        >
            <BillsList/>
        </Container>
    );
}

export default HomePage;
