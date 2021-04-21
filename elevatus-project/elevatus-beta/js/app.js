// Hamburger button animation
function toggleMenu() {
  document.getElementById("hamburger").classList.toggle("open");
  document.getElementById("js-nav").classList.toggle("display-nav");
}

$('.button').click(function () {
  $(this).parent().toggleClass('expand');     
});
