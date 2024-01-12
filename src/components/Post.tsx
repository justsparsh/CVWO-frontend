import React from "react";

export type PostProps = {
    id: number;
    text: string;
    userName: string;
    created_at: Date;
    name: string | undefined;
    colorCode?: string;
    linkToThread: boolean;
};

const Post: React.FC<PostProps> = ({ id, text, userName, created_at, name, colorCode, linkToThread }) => {
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
            <div style={{ textAlign: "left", display: "flex", alignItems: "center" }}>
                <p>
                    {"User: "} {userName}
                </p>
                {linkToThread && (
                    <a href={`/thread/${name}/${id}`} style={{ marginLeft: "auto" }}>
                        View Thread
                    </a>
                )}
            </div>
            <div style={{ textAlign: "left" }}>
                <p> {text} </p>
            </div>
            <div style={{ textAlign: "right" }}>
                <p>
                    {"Posted on: "} {new Date(created_at).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};

export default Post;
