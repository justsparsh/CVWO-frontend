import React from "react";

type PostProps = {
    text: string;
    author: string;
    timestamp: Date;
}

const Post: React.FC<PostProps> = ({ text, author, timestamp }) => {
    return (
        <div>
            <div style={{ width: "50%", justifyContent: "left" }}>
                <p>{"User: "} {author}</p>
            </div>
            <div style={{ width: "50%", justifyContent: "left" }}>
                <p>{text}</p>
            </div>
            <div style={{ width: "50%", justifyContent: "right" }}>
                <p>{"Posted on: "} {timestamp.toISOString()}</p>
            </div>
        </div>
    );
}

export default Post;


