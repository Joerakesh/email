document.addEventListener("DOMContentLoaded", function () {
  fetchSubscribers();
});

async function fetchSubscribers() {
  try {
    const response = await fetch("/.netlify/functions/fetchSubscribers");
    const data = await response.json();

    if (response.ok) {
      // Clear existing table rows
      const tableBody = document.querySelector("#subscribers-table tbody");
      tableBody.innerHTML = "";

      // Loop through the data and insert rows into the table
      data.forEach((subscriber) => {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = subscriber.id;
        row.appendChild(idCell);

        const emailCell = document.createElement("td");
        emailCell.textContent = subscriber.email;
        row.appendChild(emailCell);

        tableBody.appendChild(row);
      });
    } else {
      console.error("Error fetching data:", data.error);
      alert("Could not load subscriber data!");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to fetch data.");
  }
}
