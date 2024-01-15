import { useEffect, useState } from "react";

export const fetchThreadCount = (userID?: number | null) => {
    const [numOfThreads, setNumOfThreads] = useState<number>(0);

    const updateThreadCount = async () => {
        try {
            const response = await fetch(`http://localhost:3000/threads/count?userID=${userID}`);
            const data = await response.json();
            setNumOfThreads(data.total_threads);
        } catch (error) {
            console.error("Error fetching thread count:", error);
        }
    };

    useEffect(() => {
        updateThreadCount();
    }, [userID]);

    return { numOfThreads, updateThreadCount };
};
