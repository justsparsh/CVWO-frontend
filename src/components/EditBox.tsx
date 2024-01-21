import React, { useRef } from "react";
import { TextField, Stack, Button } from "@mui/material";

type EditBoxProps = {
    initialText: string;
    submitEdit: (textInput: string) => void;
    cancelEdit: () => void;
};

const EditBox: React.FC<EditBoxProps> = ({ initialText, submitEdit, cancelEdit }) => {
    const textInputRef = useRef<HTMLInputElement>(null);
    const handleSubmit = () => {
        submitEdit(textInputRef.current?.value || "");
    };
    return (
        <div
            style={{
                position: "absolute",
                top: "20px",
                left: "20%",
                right: "20%",
                bottom: 0,
                zIndex: 2,
                background: "rgba(255, 255, 255, 1)",
                width: "75%",
            }}
        >
            <TextField
                defaultValue={initialText}
                variant="outlined"
                fullWidth
                style={{ marginBottom: "8px" }}
                multiline={true}
                inputRef={textInputRef}
                required
                inputProps={{ maxLength: 1000 }}
            />

            <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button variant="contained" onClick={handleSubmit}>
                    Submit
                </Button>
                <Button variant="outlined" onClick={cancelEdit}>
                    Cancel
                </Button>
            </Stack>
        </div>
    );
};

export default EditBox;
