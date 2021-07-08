import controller from './controller.js'
import view from './view.js'
import anime from './animejs/lib/anime.es.js'

// // SWIPE EVENT LISTENERS
// const { SwipeEventListener } = window.SwipeEventListener
// const { swipeArea, swipeSensitivity } = SwipeEventListener({
//   swipeArea: document.querySelector('body'),
//   swipeSensitivity: 200,
// })

// controller.goToPage('navExplore')

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
  controller.getFranchise('Marvel Comics')

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

    // swipeArea.addEventListener('swipeLeft', () => {
    //   controller.goToPage(page.id)
    //   console.log('swipe left')
    // })

    // swipeArea.addEventListener('swipeRight', () => {
    //   controller.goToPage(page.id)
    //   console.log('swipe right')
    // })
  })
}

