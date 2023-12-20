import UsernameEntry from "../components/UsernameEntry";
import LoginButton from "../components/LoginButton";

import React, {useState} from "react";

const Login: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
      };

      const handleButtonClick = () => {
        // Now you can use the inputValue as needed, e.g., make an API call
        console.log('Button clicked! Input value:', inputValue)};


    return (
        <div>
            <UsernameEntry value={inputValue} onChange={handleInputChange}/>
            <LoginButton onClick={handleButtonClick}/>
        </div>
    )
};

export default Login;
