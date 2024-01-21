import { useEffect, useState } from "react";

export const fetchThreadCount = (isThread: boolean, userID?: number | null, threadID?: number) => {
    const [numOfThreads, setNumOfThreads] = useState<number>(0);

    const updateThreadCount = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/${isThread ? "threads" : "posts"}/count?userID=${userID}${
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
