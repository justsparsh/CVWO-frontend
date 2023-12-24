import React from "react";

type PostProps = {
    text: string;
    author: string;
    timestamp: Date;
};

const Post: React.FC<PostProps> = ({ text, author, timestamp }) => {
    return (
        <div style={{ borderStyle: "solid", borderWidth: "2px", borderRadius: "5px", marginBottom: "20px", padding: "5px" }}>
            <div style={{ textAlign: "left" }}>
                <p>
                    {"User: "} {author}
                </p>

                <p> {text} </p>
            </div>
            <div style={{ textAlign: "right" }}>
                <p>
                    {"Posted on: "} {timestamp.toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};

export default Post;
