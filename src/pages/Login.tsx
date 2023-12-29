import UsernameEntry from "../components/UsernameEntry";
import StandardButton from "../components/StandardButton";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const Login: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [showSignupButton, setShowSignupButton] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleLoginButtonClick = () => {
        if (inputValue !== "") {
            fetch(`http://localhost:3000/users?name=${inputValue}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("User data:", data);
                    if (data.length > 0) {
                        navigate(`/home/${inputValue}`);
                    } else {
                        setShowSignupButton(true);
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    //setShowSignupButton(true);
                });
        } else {
            alert("Please enter a valid name.");
        }
    };

    const handleSignupButtonClick = () => {
        if (inputValue !== "") {
            fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: inputValue,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("Response from server:", data);
                    navigate(`/home/${inputValue}`);
                })
                .catch((error) => {
                    console.error("Error:", error);
                    if (error.message.includes("422")) {
                        alert("This username already exists. Please choose a different name.");
                    } else {
                        alert("An error occurred while processing your request.");
                    }
                });
        } else {
            alert("Please enter a valid name.");
        }
    };

    return (
        <div>
            <div style={{ padding: "25px" }}>
                <UsernameEntry value={inputValue} onChange={handleInputChange} />
            </div>

            <div>
                <StandardButton label="Login" onClick={handleLoginButtonClick} />
            </div>
            <div> {showSignupButton && <StandardButton label="Signup" onClick={handleSignupButtonClick} />} </div>
        </div>
    );
};

export default Login;
