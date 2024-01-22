import { useEffect, useState } from "react";

export const fetchUserData = (name: string | undefined) => {
    const [userID, setUserID] = useState<number | null>(null);

    useEffect(() => {
        const fetchUserID = async () => {
            try {
                const response = await fetch(`https://cvwo-backend-f3sl.onrender.com/users?name=${name}`);
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
