document.addEventListener("DOMContentLoaded", function () {
  // Show popup after 2 seconds
  setTimeout(() => {
    document.getElementById("email-popup").style.display = "flex";
  }, 2000);

  // Handle form submission
  document
    .getElementById("email-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;

      if (email) {
        // Send email to backend
        fetch("/.netlify/functions/storeEmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Subscription successful", data);
            closePopup();
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("Something went wrong!");
          });
      }
    });
});

function closePopup() {
  document.getElementById("email-popup").style.display = "none";
}
