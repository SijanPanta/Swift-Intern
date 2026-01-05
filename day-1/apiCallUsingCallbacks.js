const https = require("https");

function callAPI(callback) {
    https.get("https://jsonplaceholder.typicode.com/posts/1", (res) => {
        let data = "";

        res.on("data", (chunk) => {
            data += chunk;
        });

        res.on("end", () => {
            callback(null, JSON.parse(data));
        });
    }).on("error", (err) => {
        callback(err, null);
    });
}

callAPI((err, response) => {
    if (err) {
        console.error("Error:", err);
    } else {
        console.log("API Response:", response);
    }
});
