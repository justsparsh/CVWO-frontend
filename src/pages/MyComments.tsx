import PostList from "../components/PostList";
import NavBar from "../components/NavBar";
import { fetchUserData } from "../components/fetchUserID";
import "./styles.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Pagination } from "@mui/material";

const MyComments: React.FC = () => {
    const navBarWidth = 200;
    const { name } = useParams();
    const [postListKey] = useState(0);
    const [numOfThreads, setNumOfThreads] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const userID = fetchUserData(name).userID;
    const postURL = `http://localhost:3000/posts?page=${pageNumber}&userID=${userID}`;

    const findNumOfThreads = async () => {
        const response = await fetch(`http://localhost:3000/posts/count?userID=${userID}`);
        const data = await response.json();
        // console.log("Number of threads:", data);
        return data.total_posts;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userID !== undefined) {
                    const count = await findNumOfThreads();
                    setNumOfThreads(count);
                }
            } catch (error) {
                console.error("Error fetching post count:", error);
            }
        };

        fetchData();
    }, [userID]);

    return (
        <div>
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
