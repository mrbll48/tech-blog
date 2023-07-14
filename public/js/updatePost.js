const updatePost = async (e) => {
  e.preventDefault();

  const contents = document.getElementById("update-contents").value.trim();
  const id = document.getElementById("post_id").value.trim();
  console.log(contents, id);

  if (contents) {
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        contents,
        id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  } else {
    alert("Error editing post");
  }
};

document.getElementById("edit-btn").addEventListener("click", updatePost);
