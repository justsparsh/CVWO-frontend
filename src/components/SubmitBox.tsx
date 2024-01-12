import React from "react";
import { TextField, Stack, Button } from "@mui/material";

interface submitBoxProps {
    textFieldValue: string;
    textFieldChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    submitPress: () => void;
    cancelPress: () => void;
    withTitle: boolean;
    titleFieldValue?: string;
    titleFieldChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SubmitBox: React.FC<submitBoxProps> = ({
    textFieldValue,
    textFieldChange,
    submitPress,
    cancelPress,
    withTitle,
    titleFieldValue,
    titleFieldChange,
}) => {
    return (
        <div
            style={{
                position: "absolute",
                top: "20px",
                left: "20%",
                right: "20%",
                bottom: 0,
                zIndex: 1,
                background: "rgba(255, 255, 255, 0.9)",
            }}
        >
            {withTitle && (
                <TextField
                    label="Post Title"
                    variant="outlined"
                    fullWidth
                    style={{ marginBottom: "8px" }}
                    multiline={true}
                    value={titleFieldValue}
                    onChange={titleFieldChange}
                />
            )}
            <TextField
                label="Post Text"
                variant="outlined"
                fullWidth
                style={{ marginBottom: "8px" }}
                multiline={true}
                value={textFieldValue}
                onChange={textFieldChange}
            />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button variant="contained" onClick={submitPress}>
                    Submit
                </Button>
                <Button variant="outlined" onClick={cancelPress}>
                    Cancel
                </Button>
            </Stack>
        </div>
    );
};

export default SubmitBox;
