// Toggle Menu
function toggleMenu() {
  document.getElementById("primaryNav").classList.toggle("hide");
}

// Dynamic Date
const daynames = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const todaysdate = new Date();
const dayName = daynames[todaysdate.getDay()];
const monthName = months[todaysdate.getMonth()];
const year = todaysdate.getFullYear();
const currentDate = dayName + ", " + todaysdate.getDate() + " " + monthName + " " + year;
const options = {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric'
};
document.getElementById("currentDate").textContent = currentDate;

// Dynamic Year
document.getElementById("currentYear").textContent = todaysdate.getFullYear();

// Day of week
const dayOfWeek = todaysdate.getDate();

// Promotion day
const promotionDay = 6

// Sticky Navbar
window.onscroll = function () {
  myFunction()
};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

// Get browser's width
function getWidth() {
  if (self.innerWidth) {
    return self.innerWidth;
  }

  if (document.documentElement && document.documentElement.clientWidth) {
    return document.documentElement.clientWidth;
  }

  if (document.body) {
    return document.body.clientWidth;
  }
}
// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  width = getWidth();
  if (width >= 560) {
    if (dayOfWeek == (promotionDay - 1)) {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
      } else {
        navbar.classList.remove("sticky");
      }
    } else if (window.pageYOffset >= (sticky - 40)) {
      navbar.classList.add("sticky")
    } else {
      navbar.classList.remove("sticky");
    }
  }
  }


// Hamburger button animation
$(document).ready(function () {
  $('#nav-icon1').click(function () {
    $(this).toggleClass('open');
  });
});

// Pop-up message on the top of the page each Saturday
if (dayOfWeek == (promotionDay - 1)) {
  document.getElementById("message").classList.toggle("showme");
} else {
  document.getElementById("message").classList.toggle("hideme");
}