const addComment = async (e) => {
  e.preventDefault();

  const comment = document.querySelector("#comment").value.trim();
  const post_id = document.getElementById("post_id").value.trim();

  if (comment) {
    const response = await fetch("/api/comments/", {
      method: "POST",
      body: JSON.stringify({ comment, post_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector("#comment-btn").addEventListener("click", addComment);
