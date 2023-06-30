const signup = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#name-signup").value;
  const password = document.querySelector("#password-signup").value;

  if (name && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Error creating user");
    }
  } else {
    alert("You must provide a username and password to create an account");
  }
};

document.getElementById("signup-form").addEventListener("submit", signup);
