import StandardButton from "./StandardButton";
import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";

export interface Stock {
    name: string;
}
export interface Sentiment {
    name: string;
}

interface tagFilterProps {
    onTagFilter: (selectedStocks: Stock[], selectedSentiments: Sentiment[]) => void;
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

const TagFilter: React.FC<tagFilterProps> = ({ onTagFilter }) => {
    const [stockValue, setStockValue] = useState<Stock[]>([]);
    const [stockInput, setStockInput] = useState("");
    const [optionList, setOptionList] = useState<Stock[]>([]);

    const [sentimentValue, setSentimentValue] = useState<Sentiment[]>([]);
    const [sentimentInput, setSentimentInput] = useState("");

    const handleFilterClick = () => {
        onTagFilter(stockValue, sentimentValue);
    };

    return (
        <div>
            <div style={{ width: "250px", margin: "10px" }}>
                <Autocomplete
                    multiple
                    options={optionList}
                    value={stockValue}
                    onChange={(event, newValue) => {
                        setStockValue(newValue as Stock[]);
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
                    multiple
                    options={dataSource}
                    value={sentimentValue}
                    onChange={(event, newValue) => {
                        setSentimentValue(newValue as Sentiment[]);
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
            <StandardButton label={"Filter"} onClick={handleFilterClick} />
        </div>
    );
};

export default TagFilter;
