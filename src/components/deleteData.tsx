export const handleDeleteClick = async (ID: number, isThread: boolean) => {
    try {
        const response = await fetch(`https://cvwo-backend-f3sl.onrender.com/${isThread ? "threads" : "posts"}/${ID}`, {
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
