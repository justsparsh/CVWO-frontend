import PostList from "../components/PostList";
import NavBar from "../components/NavBar";
import { fetchThreadCount, handleDeleteClick, handleEditClick } from "../components/DataMethods";
import { apiURL } from "../data/API_URL";
import "./styles.css";

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Pagination } from "@mui/material";

const MyComments: React.FC = () => {
    const { name } = useParams();
    const [postListKey, setPostListKey] = useState(0); // used to refresh posts without refreshing page
    const [pageNumber, setPageNumber] = useState<number>(1); //page number for API calls
    const userID = localStorage.getItem("user_id"); //Retrieve user ID from cache
    const { numOfThreads, updateThreadCount } = fetchThreadCount(false, Number(userID)); //Fetch number of posts for pagination
    const postURL = `${apiURL}/posts?page=${pageNumber}&userID=${userID}`; // API url for post retrieval

    const deleteFuncWrapper = async (ID: number) => {
        await handleDeleteClick(ID, false, name);
        updateThreadCount();
        setPostListKey((prevKey) => prevKey + 1);
    };

    const editFuncWrapper = async (ID: number, textInput: string) => {
        await handleEditClick(ID, textInput, false, name);
        setPostListKey((prevKey) => prevKey + 1);
    };

    return (
        <div className="background">
            <NavBar />
            <div className="main-container">
                {userID !== null && (
                    <PostList
                        key={postListKey}
                        url={postURL}
                        name={name}
                        linkToThread={true}
                        isThread={false}
                        deletePress={deleteFuncWrapper}
                        editPress={editFuncWrapper}
                    />
                )}
                <Pagination
                    count={Math.ceil(numOfThreads / 5)}
                    className="pagination"
                    onChange={(e, page) => setPageNumber(page)}
                />
            </div>
        </div>
    );
};

export default MyComments;
