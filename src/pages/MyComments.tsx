import PostList from "../components/PostList";
import NavBar from "../components/NavBar";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Pagination } from "@mui/material";

const MyComments: React.FC = () => {
    const navBarWidth = 250;
    const { name } = useParams();
    const [postListKey] = useState(0);
    const [numOfThreads, setNumOfThreads] = useState<number>(0);
    const [userID, setUserID] = useState<number | undefined>(undefined);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const postURL = `http://localhost:3000/posts?page=${pageNumber}&userID=${userID}`;

    const findUserID = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users?name=${name}`);
            const data = await response.json();
            // console.log("User data:", data);
            return data[0]?.id || null;
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    };

    useEffect(() => {
        const fetchUserID = async () => {
            try {
                const id = await findUserID();
                console.log("Fetched userID:", id);
                setUserID(() => {
                    console.log("Updated userID:", id);
                    return id;
                });
            } catch (error) {
                console.error("Error fetching userID:", error);
            }
        };
        fetchUserID();
    }, []);

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
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: navBarWidth,
                    justifyContent: "center",
                    marginTop: "20px",
                }}
            >
                <NavBar setWidth={navBarWidth} />

                <PostList
                    key={postListKey}
                    url={postURL}
                    name={name}
                    boxWidth="50%"
                    linkToThread={true}
                    isThread={false}
                />
            </div>
            <div>
                <Pagination
                    count={Math.ceil(numOfThreads / 5)}
                    style={{ marginLeft: navBarWidth }}
                    onChange={(e, page) => setPageNumber(page)}
                />
            </div>
        </div>
    );
};

export default MyComments;
