async function apiFetch() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        const data = await response.json();
        console.log("API Response:", data);
    } catch (error) {
        console.error("Error:", error);
    }   
    
}
apiFetch();