const newPost = async (e) => {
    e.preventDefault();
    console.log("1");
    const postTitle = document.querySelector('#post-title').value.trim();
    const postContents = document.querySelector("#post-content").value.trim();

    console.log("2");
    if (postTitle && postContents) {
      console.log("3");
      const response = await fetch("/api/posts/", {
        method: "POST",
        body: JSON.stringify({ 
            postTitle, 
            postContents 
        }),
        headers: { 
            "Content-Type": "application/json" 
        },
      });
      console.log("4");
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert(response.statusText);
      }
    } else {
      alert("You need to provide a valid username and password");
    }
  };
  
  document.querySelector("#newPostForm").addEventListener("submit", newpost);
  