import { apiURL } from "../data/API_URL";
import { useEffect, useState } from "react";

export const fetchUserData = (name: string | undefined) => {
    const [userID, setUserID] = useState<number | null>(null);

    useEffect(() => {
        const fetchUserID = async () => {
            try {
                const response = await fetch(`${apiURL}/users?name=${name}`);
                const data = await response.json();
                const fetchedUserID = data[0]?.id || null;
                setUserID(fetchedUserID);
            } catch (error) {
                console.error("Error fetching userID:", error);
            }
        };

        fetchUserID();
    }, [name]);

    return { userID };
};

export const fetchThreadCount = (isThread: boolean, userID?: number | null, threadID?: number) => {
    const [numOfThreads, setNumOfThreads] = useState<number>(0);

    const updateThreadCount = async () => {
        try {
            const response = await fetch(
                `${apiURL}/${isThread ? "threads" : "posts"}/count?userID=${userID}${
                    isThread ? "" : `&threadID=${threadID}`
                }`,
            );
            const data = await response.json();
            setNumOfThreads(isThread ? data.total_threads : data.total_posts);
        } catch (error) {
            console.error("Error fetching thread count:", error);
        }
    };

    useEffect(() => {
        updateThreadCount();
    }, [userID]);

    return { numOfThreads, updateThreadCount };
};

export const handleDeleteClick = async (ID: number, isThread: boolean) => {
    try {
        const response = await fetch(`${apiURL}/${isThread ? "threads" : "posts"}/${ID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        console.log("Response from server:", data);
    } catch (error) {
        console.error("Error:", error);
    }
};

export const handleEditClick = async (ID: number, textInput: string, isThread: boolean) => {
    try {
        const response = await fetch(`${apiURL}/${isThread ? "threads" : "posts"}/${ID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
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
