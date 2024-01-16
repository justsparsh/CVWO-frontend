import React from "react";

export type PostProps = {
    id: number | undefined;
    threadID?: number;
    text: string;
    userName: string;
    created_at: Date;
    name: string | undefined;
    colorCode?: string;
    linkToThread: boolean;
    threadTitle?: string;
};

const Post: React.FC<PostProps> = ({ id, text, userName, created_at, name, colorCode, linkToThread, threadTitle }) => {
    return (
        <div
            style={{
                borderStyle: "solid",
                borderWidth: "2px",
                borderRadius: "5px",
                marginBottom: "20px",
                padding: "5px",
                backgroundColor: colorCode || "white",
            }}
        >
            {threadTitle && (
                <div style={{ fontWeight: "bold", textAlign: "left" }}>
                    <p> {threadTitle} </p>
                </div>
            )}
            <div style={{ textAlign: "left", alignItems: "center" }}>
                <p>
                    {"User: "} {userName}
                </p>
            </div>
            <div style={{ textAlign: "left" }}>
                <p> {text} </p>
            </div>
            <div style={{ textAlign: "left", display: "flex", alignItems: "center" }}>
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
