import { PostProps } from "../types/PostProps";
import React from "react";
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
}) => {
    const onDeletePress = () => {
        deletePress(id);
    };
    return (
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
                {linkToThread && (
                    <a href={`/thread/${name}/${threadID ? threadID : id}`} style={{ marginRight: "auto" }}>
                        View Thread
                    </a>
                )}
                <p style={{ marginLeft: "auto" }}>
                    {"Posted on: "} {new Date(created_at).toLocaleDateString()}
                </p>
                {name === userName && (
                    <Button onClick={onDeletePress}>
                        <DeleteOutline fontSize="small" />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Post;
