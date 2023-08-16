import {Context, createContext, useState} from "react";
import HomePage from "./components/HomePage";
// import NavBar from "./components/NavBar";
import NavBarMUI from "./components/NavBarMUI";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutPage from "./components/About/AboutPage";
import LoginScreen from "./components/LoginScreen";



export const DarkModeContext: Context<any> = createContext(false);

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: "#3767af",
            },
            secondary: {
                main: '#fffbad'
            }
        }
    });

    const handleDarkModeToggle = (): void => {
        setDarkMode(!darkMode);
    }

    const routes = [
        {
            path: "/",
            element: <HomePage/>
        },
        {
            path: "/about",
            element: <AboutPage/>
        },
        {
            path: "/login",
            element: <LoginScreen/>
        }
    ]

    const containerHeight = {
        height: "100vh",
    };

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>

                <ThemeProvider theme={theme}>
                    <CssBaseline>
                        <DarkModeContext.Provider value={{darkMode, handleDarkModeToggle}}>
                            <NavBarMUI/>


                            <div className="d-flex flex-column p-4 gap-4 py-md-5" style={containerHeight}>
                                <Router>
                                    <Routes>
                                        {routes.map((route, index) => (
                                            <Route
                                                key={index}
                                                path={route.path}
                                                element={route.element}
                                            />
                                        ))}

                                    </Routes>
                                </Router>


                            </div>
                        </DarkModeContext.Provider>
                    </CssBaseline>
                </ThemeProvider>
            </LocalizationProvider>
        </>
    );
}

export default App;
