let allPosts = [];

async function fetchPosts() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    allPosts = await response.json();
    console.log(allPosts);
    displayPosts(allPosts);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

function displayPosts(posts) {
  const gridContainer = document.getElementById("productGrid");
  gridContainer.innerHTML = "";

  if (posts.length === 0) {
    gridContainer.innerHTML =
      '<p style="text-align: center; color: #666;">No posts found</p>';
    return;
  }

  posts.forEach((post) => {
    const gridItem = document.createElement("div");
    gridItem.className = "grid-item";

    gridItem.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <small>Post ID: ${post.id} | User ID: ${post.userId}</small>
    `;
    gridContainer.appendChild(gridItem);
  });
}

function filterPosts(searchTerm) {
  const filtered = allPosts.filter((post) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchLower) ||
      post.body.toLowerCase().includes(searchLower)
    );
  });
  displayPosts(filtered);
}

// Add search functionality
const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("input", (e) => {
  filterPosts(e.target.value);
});

// Initial load
fetchPosts();
