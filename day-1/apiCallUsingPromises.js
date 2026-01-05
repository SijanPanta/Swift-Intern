fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log("API Response:", data);
    })
    .catch((err) => {
        console.error("Error:", err);
    }); 