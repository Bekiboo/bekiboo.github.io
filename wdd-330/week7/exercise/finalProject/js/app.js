import controller from './controller.js'
import view from './view.js'

window.onload = () => {
    // MENU
    view.menuMarvel.addEventListener('click', function () {
        controller.getFranchise('Marvel Comics')
    })
    view.menuDC.addEventListener('click', function () {
        controller.getFranchise('DC Comics')
    })

    // NAVIGATION
    view.navItems.forEach(page => {
        page.addEventListener('click', function () {
            controller.goToPage(page.id)            
        })
    });

    // view.navExplore.addEventListener('click', controller.goExplore)
    // view.navHome.addEventListener('click', controller.goHome)
    // view.navPlay.addEventListener('click', controller.goPlay)
}