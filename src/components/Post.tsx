import React from "react";

export type PostProps = {
    id: number;
    text: string;
    userName: string;
    created_at: Date;
};

const Post: React.FC<PostProps> = ({ text, userName, created_at }) => {
    return (
        <div
            style={{
                borderStyle: "solid",
                borderWidth: "2px",
                borderRadius: "5px",
                marginBottom: "20px",
                padding: "5px",
            }}
        >
            <div style={{ textAlign: "left" }}>
                <p>
                    {"User: "} {userName}
                </p>

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
