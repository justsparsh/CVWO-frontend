export const handleEditClick = async (ID: number, textInput: string, isThread: boolean) => {
    try {
        const response = await fetch(`http://localhost:3000/${isThread ? "threads" : "posts"}/${ID}`, {
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
