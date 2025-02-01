document.addEventListener("DOMContentLoaded", function () {
  fetch("/.netlify/functions/fetchData")
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched data:", data); // Debugging
      if (!Array.isArray(data)) {
        console.error("Invalid data format:", data);
        document.getElementById("data-table").innerHTML =
          "<tr><td colspan='2'>Error loading data</td></tr>";
        return;
      }
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
    .catch((error) => {
      console.error("Error fetching data:", error);
      document.getElementById("data-table").innerHTML =
        "<tr><td colspan='2'>Failed to load data</td></tr>";
    });
});
