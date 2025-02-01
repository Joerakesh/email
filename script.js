document.addEventListener("DOMContentLoaded", function () {
  fetch("/.netlify/functions/fetchData")
    .then((response) => response.json())
    .then((data) => {
      let table = document.getElementById("data-table");
      data.forEach((row) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${row.id}</td><td>${row.id}</td><td>${row.email}</td>`;
        table.appendChild(tr);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});
