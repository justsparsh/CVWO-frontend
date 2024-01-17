import { PostProps } from "../types/PostProps";
import React from "react";
import "./post_styles.css";

const Post: React.FC<PostProps> = ({
    id,
    text,
    userName,
    created_at,
    name,
    colorCode,
    linkToThread,
    threadTitle,
    ticker_list,
    sentiment_list,
}) => {
    return (
        <div className="post-card" style={{ backgroundColor: colorCode || "white" }}>
            {threadTitle && (
                <div className="title">
                    <p> {threadTitle} </p>
                </div>
            )}
            <div className="username">
                {"Posted by: "} {userName}
                <p style={{ marginLeft: "auto" }}>
                    {"Tags: "} {ticker_list ? ticker_list[0] : undefined}
                    {", "}
                    {sentiment_list ? sentiment_list[0] : undefined}
                </p>
            </div>
            <div className="text">
                <p> {text} </p>
            </div>
            <div className="bottom-div">
                {linkToThread && (
                    <a href={`/thread/${name}/${id}`} style={{ marginRight: "auto" }}>
                        View Thread
                    </a>
                )}
                <p style={{ marginLeft: "auto" }}>
                    {"Posted on: "} {new Date(created_at).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};

export default Post;
