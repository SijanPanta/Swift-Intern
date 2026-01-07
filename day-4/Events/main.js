let allPosts=[]
try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    allPosts = await response.json();
    // displayPosts(allPosts);
    console.table(allPosts)
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }