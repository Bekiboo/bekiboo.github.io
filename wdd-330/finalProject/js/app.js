import controller from './controller.js'
import view from './view.js'

// // SWIPE EVENT LISTENERS
// const { SwipeEventListener } = window.SwipeEventListener
// const { swipeArea, swipeSensitivity } = SwipeEventListener({
//   swipeArea: document.querySelector('body'),
//   swipeSensitivity: 200,
// })

// controller.goToPage('navExplore')

window.onload = () => {
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

