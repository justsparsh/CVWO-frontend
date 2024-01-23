import EditBox from "./EditBox";
import { PostProps } from "../types/PostProps";
import React, { useState } from "react";
import "./post_styles.css";
import { DeleteOutline } from "@mui/icons-material";
import { Button } from "@mui/material";

const Post: React.FC<PostProps> = ({
    id,
    threadID,
    text,
    userName,
    created_at,
    name,
    colorCode,
    linkToThread,
    threadTitle,
    ticker_list,
    sentiment_list,
    deletePress,
    editPress,
}) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const onDeletePress = () => {
        deletePress(id);
    };
    const onEditPress = () => {
        setIsEditing(true);
    };

    const submitEditButton = (textInput: string) => {
        editPress(id, textInput);
    };

    const cancelEditButton = () => {
        setIsEditing(false);
    };

    return (
        <div>
            {isEditing && <EditBox initialText={text} submitEdit={submitEditButton} cancelEdit={cancelEditButton} />}
            <div className="post-card" style={{ backgroundColor: colorCode || "#DCF2F1" }}>
                {threadTitle && (
                    <div className="title">
                        <p> {threadTitle} </p>
                    </div>
                )}
                <div className="username">
                    {"Posted by: "} {userName}
                    {threadTitle && (
                        <p style={{ marginLeft: "auto" }}>
                            {"Tags: "} {ticker_list ? ticker_list[0] : undefined}
                            {", "}
                            {sentiment_list ? sentiment_list[0] : undefined}
                        </p>
                    )}
                </div>
                <div className="text">
                    <p> {text} </p>
                </div>
                <div className="bottom-div">
                    <div>
                        {linkToThread && (
                            <a href={`/thread/${name}/${threadID ? threadID : id}`} style={{ marginRight: "auto" }}>
                                View Thread
                            </a>
                        )}
                    </div>
                    <div>
                        {name === userName && (
                            <Button
                                onClick={onEditPress}
                                style={{ textTransform: "none", maxHeight: "15px", fontSize: "13px" }}
                            >
                                Edit Text
                            </Button>
                        )}
                    </div>
                    <p style={{ marginLeft: "auto" }}>
                        {"Posted on: "} {new Date(created_at).toLocaleDateString()}
                    </p>
                    <div>
                        {name === userName && (
                            <Button onClick={onDeletePress}>
                                <DeleteOutline fontSize="small" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
