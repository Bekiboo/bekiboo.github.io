// Toggle Menu
function toggleMenu() {
  document.getElementById("primaryNav").classList.toggle("hide");
}

// Dynamic Last Update
var dateUpdated = document.lastModified;
document.getElementById("lastUpdate").textContent =
  "Last Updated: " + dateUpdated;

// Dynamic Year
var today = new Date(); 
document.getElementById("currentDate").textContent = today.toDateString();

// Sticky Navbar
window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}