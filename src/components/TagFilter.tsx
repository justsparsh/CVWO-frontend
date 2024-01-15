import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";

interface Stock {
    name: string;
}

const TagFilter: React.FC = () => {
    const dataSource: Stock[] = [
        { name: "TSLA" },
        { name: "AAPL" },
        { name: "SPY" },
        { name: "VOO" },
        { name: "JPM" },
        { name: "AMZN" },
    ];

    const [value, setValue] = useState<Stock[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [optionList, setOptionList] = useState<Stock[]>([]);

    return (
        <div style={{ width: "250px" }}>
            <div>{value.map((stock) => stock.name).join(", ")}</div>
            <Autocomplete
                multiple
                options={optionList}
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue as Stock[]);
                }}
                getOptionLabel={(option) => option.name}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setOptionList(newInputValue !== "" ? dataSource : []);
                    setInputValue(newInputValue);
                }}
                renderInput={(params) => <TextField {...params} label="Stock Ticker" variant="outlined" />}
                filterOptions={createFilterOptions({ matchFrom: "start" })}
                noOptionsText=""
            />
        </div>
    );
};

export default TagFilter;
