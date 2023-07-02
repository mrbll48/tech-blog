const loginForm = async (e) => {
  e.preventDefault();
  console.log("1");
  const name = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  console.log("2");
  if (name && password) {
    console.log("3");
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log("4");
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  } else {
    alert("You need to provide a valid username and password");
  }
};

document.querySelector("#login-form").addEventListener("submit", loginForm);
