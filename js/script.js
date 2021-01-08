var date = document.lastModified;
document.getElementById("lastUpdate").textContent =
  "Last Updated: " + date;

var today = new Date();
var currentYear = today.getFullYear();  
document.getElementById("currentYear").textContent = currentYear;