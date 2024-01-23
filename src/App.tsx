import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Thread from "./pages/Thread";
import MyThreads from "./pages/MyThreads";
import MyComments from "./pages/MyComments";
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, orange } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: blue,
        secondary: orange,
    },
});
console.log("App activated");
const App: React.FC = () => {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/home/:name" element={<HomePage />} />
                        <Route path="/thread/:name/:threadID" element={<Thread />} />
                        <Route path="/mythreads/:name" element={<MyThreads />} />
                        <Route path="/myposts/:name" element={<MyComments />} />
                        <Route path="/" element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
};

export default App;
