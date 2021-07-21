import controller from './controller.js'
import view from './view.js'
import anime from './animejs/lib/anime.es.js'

// controller.goToPage('navTeam')

window.onload = () => {

  anime({
    targets: '#menuDC svg',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 1500,
    delay: function(el, i) { return i * 250 },
    direction: 'alternate',
    loop: true
  });

  // Page initializer
  let storedFranchise = JSON.parse(localStorage.getItem('franchise'))
  storedFranchise ? controller.getFranchise(storedFranchise) : controller.getFranchise('Marvel Comics')
  

  // MENU
  view.menuMarvel.addEventListener('click', function () {
    controller.getFranchise('Marvel Comics')
  })

  view.menuDC.addEventListener('click', function () {
    controller.getFranchise('DC Comics')
  })

  // NAVIGATION
  view.navItems.forEach((page) => {
    page.addEventListener('click', function () {
      controller.goToPage(page.id)
    })
  })
}

