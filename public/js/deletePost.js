const updatePost = async (e) => {
  e.preventDefault();

  const title = document.getElementById("update-title").value.trim();
  const contents = document.getElementById("update-content").value.trim();

  console.log(title, contents);

  if (title && contents) {
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        contents,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  } else {
    alert("Error editing post");
  }
};

document.getElementById("edit-post-btn").addEventListener("click", updatePost);
