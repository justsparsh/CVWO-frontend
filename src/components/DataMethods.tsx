import { apiURL } from "../data/API_URL";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// const { name } = useParams();

export const fetchUserData = (name: string | undefined) => {
    const [userID, setUserID] = useState<number | null>(null);

    useEffect(() => {
        const fetchUserID = async () => {
            try {
                const response = await fetch(`${apiURL}/users?name=${name}`);
                const data = await response.json();
                const fetchedUserID = data.user.id || null;
                setUserID(fetchedUserID);
            } catch (error) {
                console.error("Error fetching userID:", error);
            }
        };

        fetchUserID();
    }, [name]);

    return { userID };
};

export const fetchThreadCount = (
    isThread: boolean,
    userID?: number | null,
    threadID?: number,
    tickers?: string[],
    sentiments?: string[],
) => {
    const token = localStorage.getItem("access-token");
    const { name } = useParams();
    const navigate = useNavigate();
    const [numOfThreads, setNumOfThreads] = useState<number>(0);

    const updateThreadCount = async () => {
        try {
            const response = await fetch(
                `${apiURL}/${isThread ? "threads" : "posts"}/count?userID=${userID}${
                    isThread ? "" : `&threadID=${threadID}`
                }${
                    isThread
                        ? `&tickers=${encodeURIComponent(JSON.stringify(tickers))}&sentiments=${encodeURIComponent(
                              JSON.stringify(sentiments),
                          )}`
                        : ""
                }
                `,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Name: name,
                        Authorization: `Bearer ${token} `,
                    } as HeadersInit,
                },
            );
            const data = await response.json();
            if (data.error == "Invalid user authentication") {
                alert("User authentication failed. Please sign in again");
                navigate("/");
            }
            setNumOfThreads(isThread ? data.total_threads : data.total_posts);
        } catch (error) {
            console.error("Error fetching thread count:", error);
        }
    };

    useEffect(() => {
        updateThreadCount();
    }, []);

    return { numOfThreads, updateThreadCount };
};

export const handleDeleteClick = async (ID: number, isThread: boolean, name: string | undefined) => {
    const token = localStorage.getItem("access-token");
    try {
        const response = await fetch(`${apiURL}/${isThread ? "threads" : "posts"}/${ID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Name: name,
                Authorization: `Bearer ${token} `,
            } as HeadersInit,
        });

        const data = await response.json();
        console.log("Response from server:", data);
    } catch (error) {
        console.error("Error:", error);
    }
};

export const handleEditClick = async (ID: number, textInput: string, isThread: boolean, name: string | undefined) => {
    const token = localStorage.getItem("access-token");
    try {
        const response = await fetch(`${apiURL}/${isThread ? "threads" : "posts"}/${ID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Name: name,
                Authorization: `Bearer ${token} `,
            } as HeadersInit,
            body: JSON.stringify({
                text: textInput,
            }),
        });

        const data = await response.json();
        console.log("Response from server:", data);
    } catch (error) {
        console.error("Error:", error);
    }
};
