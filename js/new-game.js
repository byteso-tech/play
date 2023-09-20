// Wait for the DOM to be fully loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", function () {
  // Get the form element by its ID
  const form = document.getElementById("gameForm");

  // Add a submit event listener to the form
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Collect form data
    const screenNo = document.getElementById("screenNo").value;
    const clientPhone = document.getElementById("clientPhone").value;
    const hourlyRate = document.getElementById("hourlyRate").value;

    // Create an object to hold the form data
    const formData = {
      screen_no: screenNo,
      client_phone: clientPhone,
      hourly_rate: hourlyRate,
      inplay: true,
    };

    // Send a POST request to the API endpoint
    fetch("https://bytesotech.cloud/games/api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "e2b89f5b45984c410bb4efbc8861d51433fe0988",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // Request was successful
          console.log("Game created successfully.");
          toastr.success("New game Added successfully!");
          setTimeout(function () {
            // Redirect to games.html after 3 seconds
            window.location.replace("./games.html");
          }, 3000);

          // You can perform additional actions here, like redirecting to another page.
        } else {
          // Request failed
          toastr.error("An error occurred while adding new game");

          console.error("Failed to create game.");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  });
});
