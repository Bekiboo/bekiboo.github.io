// Hamburger button animation
function toggleMenu() {
  document.getElementById("hamburger").classList.toggle("open");
  document.getElementById("js-nav").classList.toggle("display-nav");
}

// NavBar intersection obsever
const header = document.querySelector('header');
const hero = document.getElementById('hero');

const heroOptions = {
  rootMargin: "-60% 0px 0px 0px"
};

const heroObserver = new IntersectionObserver(function(
  entries, 
  heroObserver
  ) {
    entries.forEach(entry => {
      if(!entry.isIntersecting) {
        header.classList.add('nav-scrolled');
      } else {
        header.classList.remove('nav-scrolled');
      }
    })
}, 
heroOptions)

heroObserver.observe(hero);

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
document.getElementById("lastModified").textContent = currentDate;
