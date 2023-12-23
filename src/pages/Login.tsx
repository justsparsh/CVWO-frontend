import UsernameEntry from "../components/UsernameEntry";
import LoginButton from "../components/LoginButton";
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";

const Login: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [showSignupButton, setShowSignupButton] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleLoginButtonClick = () => {
        fetch(`http://localhost:3000/users?name=${inputValue}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("User data:", data);
                navigate('/home');
            })
            .catch((error) => {
                console.error("Error:", error);
                setShowSignupButton(true);
            });
    };

    const handleSignupButtonClick = () => {
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: inputValue,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Response from server:", data);
                navigate('/home');
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div>
            <div style={{ padding: "25px" }}>
                <UsernameEntry value={inputValue} onChange={handleInputChange} />
            </div>

            <div>
                <LoginButton label="Login" onClick={handleLoginButtonClick} />
            </div>
            <div>
                {showSignupButton && (
                    <LoginButton label="Signup" onClick={handleSignupButtonClick}/>
                )}
            </div>
        </div>
    );
};

export default Login;
