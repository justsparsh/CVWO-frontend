// import TagFilter from "./TagFilter";
import React, { useRef } from "react";
import { TextField, Stack, Button } from "@mui/material";

interface submitBoxProps {
    submitPress: (threadText: string, threadTitle?: string) => void;
    cancelPress: () => void;
    isThread: boolean;
}

const SubmitBox: React.FC<submitBoxProps> = ({ submitPress, cancelPress, isThread }) => {
    const titleInputRef = useRef<HTMLInputElement>(null);
    const textInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        const titleValue = titleInputRef.current?.value || "";
        const textValue = textInputRef.current?.value || "";
        submitPress(textValue, isThread ? titleValue : undefined);
    };

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
            {isThread && (
                <TextField
                    label="Post Title"
                    variant="outlined"
                    fullWidth
                    style={{ marginBottom: "8px" }}
                    multiline={true}
                    inputRef={titleInputRef}
                />
            )}
            <TextField
                label="Post Text"
                variant="outlined"
                fullWidth
                style={{ marginBottom: "8px" }}
                multiline={true}
                inputRef={textInputRef}
            />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button variant="contained" onClick={handleSubmit}>
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
