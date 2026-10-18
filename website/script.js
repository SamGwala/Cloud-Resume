document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("printBtn").addEventListener("click", () => {
  window.print();
});

/*
  Cloud Resume Challenge visitor counter:
  The frontend is ready to call an API Gateway endpoint backed by Lambda + DynamoDB.

  Replace the URL below after you build the backend:
  const API_URL = "https://YOUR-API-ID.execute-api.YOUR-REGION.amazonaws.com/prod/visitors";

  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      document.getElementById("visitorCount").textContent = data.count;
    })
    .catch(() => {
      document.getElementById("visitorCount").textContent = "—";
    });
*/

document.getElementById("visitorCount").textContent = "Cloud Resume Challenge API pending";
