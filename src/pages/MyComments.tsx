import PostList from "../components/PostList";
import NavBar from "../components/NavBar";
import { fetchUserData } from "../components/fetchUserID";
import { fetchThreadCount } from "../components/fetchThreadCount";
import { handleDeleteClick } from "../components/deleteData";
import { handleEditClick } from "../components/editData";
import "./styles.css";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Pagination } from "@mui/material";

const MyComments: React.FC = () => {
    const navBarWidth = 200;
    const { name } = useParams();
    const [postListKey, setPostListKey] = useState(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const userID = fetchUserData(name).userID;
    const { numOfThreads, updateThreadCount } = fetchThreadCount(false, userID);
    const postURL = `https://cvwo-backend-f3sl.onrender.com/posts?page=${pageNumber}&userID=${userID}`;

    const deleteFuncWrapper = async (ID: number) => {
        handleDeleteClick(ID, false);
        updateThreadCount();
        setPostListKey((prevKey) => prevKey + 1);
    };

    const editFuncWrapper = async (ID: number, textInput: string) => {
        handleEditClick(ID, textInput, false);
        setPostListKey((prevKey) => prevKey + 1);
    };

    return (
        <div className="background">
            <div className="main-container">
                <NavBar setWidth={navBarWidth} />

                {userID !== null && (
                    <PostList
                        key={postListKey}
                        url={postURL}
                        name={name}
                        boxWidth="50%"
                        linkToThread={true}
                        isThread={false}
                        deletePress={deleteFuncWrapper}
                        editPress={editFuncWrapper}
                    />
                )}
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

export default MyComments;
