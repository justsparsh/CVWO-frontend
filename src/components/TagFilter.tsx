import StandardButton from "./StandardButton";
import { StockProp, SentimentProp } from "../types/FilterDataProps";
import { stocks, sentiments } from "../data/FilterData";
import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";

interface tagFilterProps {
    onTagFilter: (selectedStocks: StockProp[], selectedSentiments: SentimentProp[]) => void;
}

const TagFilter: React.FC<tagFilterProps> = ({ onTagFilter }) => {
    const [stockValue, setStockValue] = useState<StockProp[]>([]);
    const [stockInput, setStockInput] = useState("");
    const [optionList, setOptionList] = useState<StockProp[]>([]);

    const [sentimentValue, setSentimentValue] = useState<SentimentProp[]>([]);
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
                        setStockValue(newValue as StockProp[]);
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
                    options={sentiments}
                    value={sentimentValue}
                    onChange={(event, newValue) => {
                        setSentimentValue(newValue as SentimentProp[]);
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
