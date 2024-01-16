import { Stock, Sentiment } from "./TagFilter";
import React, { useRef, useState } from "react";
import { TextField, Stack, Button, Autocomplete } from "@mui/material";
import { createFilterOptions } from "@mui/material";

interface submitBoxProps {
    submitPress: (threadText: string, threadTitle?: string, stock?: string, sentiment?: string) => void;
    cancelPress: () => void;
    isThread: boolean;
}

const stocks: Stock[] = [
    { name: "TSLA" },
    { name: "AAPL" },
    { name: "SPY" },
    { name: "VOO" },
    { name: "JPM" },
    { name: "AMZN" },
];
const dataSource: Sentiment[] = [{ name: "Bullish" }, { name: "Neutral" }, { name: "Bearish" }];

const SubmitBox: React.FC<submitBoxProps> = ({ submitPress, cancelPress, isThread }) => {
    const titleInputRef = useRef<HTMLInputElement>(null);
    const textInputRef = useRef<HTMLInputElement>(null);

    const [stockValue, setStockValue] = useState<Stock | null>(null);
    const [stockInput, setStockInput] = useState("");
    const [optionList, setOptionList] = useState<Stock[]>([]);

    const [sentimentValue, setSentimentValue] = useState<Sentiment | null>(null);
    const [sentimentInput, setSentimentInput] = useState("");

    const handleSubmit = () => {
        const titleValue = titleInputRef.current?.value || "";
        const textValue = textInputRef.current?.value || "";
        submitPress(
            textValue,
            isThread ? titleValue : undefined,
            isThread ? stockValue?.name : undefined,
            isThread ? sentimentValue?.name : undefined,
        );
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
                background: "rgba(255, 255, 255, 0.95)",
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
            {isThread && (
                <div>
                    <div style={{ width: "250px", margin: "10px" }}>
                        <Autocomplete
                            options={optionList}
                            value={stockValue}
                            onChange={(event, newValue) => {
                                setStockValue(newValue as Stock);
                            }}
                            getOptionLabel={(option) => option.name}
                            inputValue={stockInput}
                            onInputChange={(event, newInputValue) => {
                                setOptionList(newInputValue !== "" ? stocks : []);
                                setStockInput(newInputValue);
                            }}
                            renderInput={(params) => <TextField {...params} label="Stock Ticker" variant="outlined" />}
                            filterOptions={createFilterOptions({ matchFrom: "start" })}
                            noOptionsText=""
                        />
                    </div>
                    <div style={{ width: "250px", margin: "10px" }}>
                        <Autocomplete
                            options={dataSource}
                            value={sentimentValue}
                            onChange={(event, newValue) => {
                                setSentimentValue(newValue as Sentiment);
                            }}
                            getOptionLabel={(option) => option.name}
                            inputValue={sentimentInput}
                            onInputChange={(event, newInputValue) => {
                                setSentimentInput(newInputValue);
                            }}
                            renderInput={(params) => <TextField {...params} label="Sentiment" variant="outlined" />}
                            filterOptions={createFilterOptions({ matchFrom: "start" })}
                            noOptionsText=""
                        />
                    </div>
                </div>
            )}

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
