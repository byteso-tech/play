document.addEventListener("DOMContentLoaded", function () {
  // Get the login form element by its ID
  const loginForm = document.getElementById("loginForm");

  // Add a submit event listener to the login form
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Collect form data
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Create an object to hold the login data
    const loginData = {
      username: username,
      password: password,
    };
    console.log(loginData);

    // Send a POST request to the login API endpoint
    fetch("http://localhost:3080/api/user/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'x-api-key': 'e2b89f5b45984c410bb4efbc8861d51433fe0988'
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (response.ok) {
          // Login was successful, store user data and redirect
          response.json().then((user) => {
            // Store user data in the "user" variable
            window.localStorage.setItem("user", JSON.stringify(user));
            console.log("Login successful. User data:", user);

            // Redirect to the desired page (e.g., games.html)
            window.location.replace("./inplay.html");
          });
        } else {
          // Login failed, display an error message
          console.error("Login failed.");
          toastr.error("Wrong credentials");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  });
});
