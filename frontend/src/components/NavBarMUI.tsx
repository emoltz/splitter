import {JSX} from "react";
import {Image, Link, Navbar, Spacer, Text} from "@nextui-org/react";
import {Button, CircularProgress} from "@mui/material";
import {useCurrentUser} from "../../lib/hooks";


// import DarkModeToggle from "./DarkModeToggle.tsx";

class Page{
    title: string;
    link: string;
    constructor(title: string, link: string) {
        this.title = title;
        this.link = link;
    }
}

export default function NavBarMUI(): JSX.Element {
    const {user, loading} = useCurrentUser();
    const pages: Page[] = [
        // ADD NEW ROUTES HERE
        new Page("Home", "/"),
        new Page("About", "/about"),
        new Page("Login", "/login"),
    ]


    return (
        <Navbar
            isBordered
            variant={"floating"}

        >
            <Navbar.Brand>
                <Navbar.Toggle aria-label={"toggle"}/>
                <Spacer y={.5}/>
                <Image src={"/split_logo.png"} width={50} height={50} alt={"logo"}/>
                <Text h1>Splitter</Text>
                <Spacer y={1}/>
                <Text i>the bill splitting app</Text>
            </Navbar.Brand>
            <Navbar.Content enableCursorHighlight hideIn={"sm"} variant={"underline"}>
                {!user &&

                <Button
                    variant={"outlined"}
                    disabled={loading}
                    startIcon={loading && <CircularProgress size={20}/>}
                >
                    Login
                </Button>
                }
                {user &&
                <Button
                    variant={"outlined"}
                    >
                    My Profile
                </Button>

                }


            </Navbar.Content>
            <Navbar.Collapse>
                {pages.map((item) => (
                    <Navbar.CollapseItem key={item.title}>
                        <Link
                            color="inherit"
                            css={{
                                minWidth: "100%",
                            }}
                            href={item.link}
                        >
                            {item.title}
                        </Link>
                    </Navbar.CollapseItem>
                ))}
            </Navbar.Collapse>


        </Navbar>
    )
}