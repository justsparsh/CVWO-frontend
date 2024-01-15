import PostList from "../components/PostList";
import NavBar from "../components/NavBar";
import StandardButton from "../components/StandardButton";
import SubmitBox from "../components/SubmitBox";
import TagFilter from "../components/TagFilter";
import { fetchUserData } from "../components/fetchUserID";
import { fetchThreadCount } from "../components/fetchThreadCount";
import "./styles.css";

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Pagination } from "@mui/material";

const MyThreads: React.FC = () => {
    const navBarWidth = 200;
    const { name } = useParams();
    const [isAddingThread, setIsAddingThread] = useState(false);
    const [postListKey, setPostListKey] = useState(0);
    const [threadText, setThreadText] = useState("");
    const [threadTitle, setThreadTitle] = useState<string>("");
    const [pageNumber, setPageNumber] = useState<number>(1);

    const userID = fetchUserData(name).userID;
    const { numOfThreads, updateThreadCount } = fetchThreadCount(userID);

    const postURL = `http://localhost:3000/threads?page=${pageNumber}&userID=${userID}`;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setThreadText(event.target.value);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setThreadTitle(event.target.value);
    };

    const handleNewPostButtonClick = () => {
        setIsAddingThread(true);
    };

    const handlePostCancel = () => {
        setIsAddingThread(false);
    };

    const handlePostSubmit = async () => {
        try {
            if (userID) {
                const response = await fetch("http://localhost:3000/threads", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userID: userID,
                        userName: name,
                        text: threadText,
                        threadTitle: threadTitle,
                    }),
                });

                const data = await response.json();
                console.log("Response from server:", data);

                updateThreadCount();
                setIsAddingThread(false);
                setPostListKey((prevKey) => prevKey + 1);
                setThreadTitle("");
                setThreadText("");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <div className="main-container">
                {!isAddingThread && <NavBar setWidth={navBarWidth} />}

                <PostList
                    key={postListKey}
                    url={postURL}
                    name={name}
                    boxWidth="50%"
                    linkToThread={true}
                    isThread={true}
                />
                <StandardButton label="New Thread" onClick={handleNewPostButtonClick} />

                {isAddingThread && (
                    <SubmitBox
                        textFieldValue={threadText}
                        textFieldChange={handleInputChange}
                        submitPress={handlePostSubmit}
                        cancelPress={handlePostCancel}
                        withTitle={true}
                        titleFieldValue={threadTitle}
                        titleFieldChange={handleTitleChange}
                    />
                )}
                <TagFilter />
            </div>
            <div>
                <Pagination
                    count={Math.ceil(numOfThreads / 5)}
                    className="pagination"
                    onChange={(e, page) => setPageNumber(page)}
                />
            </div>
        </div>
    );
};

export default MyThreads;

// const findUserID = async () => {
//     try {
//         const response = await fetch(`http://localhost:3000/users?name=${name}`);
//         const data = await response.json();
//         // console.log("User data:", data);
//         return data[0]?.id || null;
//     } catch (error) {
//         console.error("Error:", error);
//         return null;
//     }
// };

// useEffect(() => {
//     const fetchUserID = async () => {
//         try {
//             const id = await findUserID();
//             console.log("Fetched userID:", id);
//             setUserID(() => {
//                 console.log("Updated userID:", id);
//                 return id;
//             });
//         } catch (error) {
//             console.error("Error fetching userID:", error);
//         }
//     };
//     fetchUserID();
// }, []);
