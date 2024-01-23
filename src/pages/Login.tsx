import { apiURL } from "../data/API_URL";
import StandardButton from "../components/StandardButton";
import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleLoginButtonClick = () => {
        if (inputValue !== "") {
            fetch(`${apiURL}/users?name=${inputValue}`, {
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
                        alert("It seems you do not have an account. Please sign up.");
                    }
                })
                .catch((error) => {
                    alert("There was an error in retrieving your info. Please refresh and try again.");
                    console.error("Error:", error);
                });
        } else {
            alert("Please enter a valid name.");
        }
    };

    const handleSignupButtonClick = () => {
        if (inputValue !== "") {
            fetch(`${apiURL}/users`, {
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
                <TextField value={inputValue} onChange={handleInputChange} label="Username" variant="outlined" />
            </div>

            <div>
                <StandardButton label="Login" onClick={handleLoginButtonClick} />
            </div>
            <div>
                <StandardButton label="Signup" onClick={handleSignupButtonClick} />
            </div>
        </div>
    );
};

export default Login;
