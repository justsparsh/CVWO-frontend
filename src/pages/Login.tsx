import UsernameEntry from "../components/UsernameEntry";
import LoginButton from "../components/LoginButton";

import React, {useState} from "react";

const Login: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [showSignupButton, setShowSignupButton] = useState<boolean>(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
      };

    const handleLoginButtonClick = () => {
        // Now you can use the inputValue as needed, e.g., make an API call
        console.log('Button clicked! Input value:', inputValue)};
        setShowSignupButton(true);

    // const handleSignupButtonClick = () => {

    // };

    return (
        <div>
            <div style={{padding: "25px"}}>
                <UsernameEntry value={inputValue} onChange={handleInputChange}/>
            </div>

            <div>
                <LoginButton onClick={handleLoginButtonClick}/>

                {showSignupButton && (
                    <LoginButton onClick={handleLoginButtonClick}/>
                )}
            </div>
        </div>
    )
};

export default Login;
