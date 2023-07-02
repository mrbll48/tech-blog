const newPost = async (e) => {
  e.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const contents = document.querySelector("#post-content").value.trim();

  console.log(title, contents);

  if (title && contents) {
    const response = await fetch("/api/posts/", {
      method: "POST",
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
    alert("You need to provide a valid username and password");
  }
};

document.querySelector("#newPostForm").addEventListener("submit", newPost);
