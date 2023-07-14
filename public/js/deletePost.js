const deletePost = async (e) => {
  e.preventDefault();
  const id = document.getElementById("post_id").value.trim();

  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });
  console.log(response);
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};

document.getElementById("delete-btn").addEventListener("click", deletePost);
