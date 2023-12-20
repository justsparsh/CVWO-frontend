import React, {ChangeEvent} from "react";
import { TextField } from "@mui/material";

interface TextFieldProps {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  }

const UsernameEntry: React.FC<TextFieldProps> = ({value, onChange}) => {

    return (
        <TextField 
            value={value}
            onChange={onChange}
            id="username_entry" 
            label="Username" 
            variant="outlined"/>
    )
};

export default UsernameEntry;