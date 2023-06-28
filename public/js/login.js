const login = async (e) => {
  e.preventDefault();

  const userName = document.getElementById("username-login").value.trim();
  const password = document.getElementById("password-login").value.trim();

  if (userName && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/homepage");
    } else {
      alert("Error logging in");
    }
  }
};

document.getElementById("loginBtn").addEventListener("submit", login);
