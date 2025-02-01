document.addEventListener("DOMContentLoaded", function () {
  fetch("/.netlify/functions/fetchData")
    .then((response) => response.json())
    .then((data) => {
      let table = document.getElementById("data-table");
      if (data.length === 0) {
        table.innerHTML = "<tr><td colspan='2'>No subscribers found</td></tr>";
      } else {
        data.forEach((row) => {
          let tr = document.createElement("tr");
          tr.innerHTML = `<td>${row.id}</td><td>${row.email}</td>`;
          table.appendChild(tr);
        });
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
});

// Insert subscriber
document.getElementById("insertForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let email = document.getElementById("email").value;

  fetch("/.netlify/functions/insertData", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message || "Subscription successful!");
      window.location.reload(); // Refresh to show new subscriber
    })
    .catch((error) => console.error("Error inserting subscriber:", error));
});
