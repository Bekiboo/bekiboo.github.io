import model from './model.js'
import view from './view.js'

const controller = {
  getFranchise(franchise) {
    model.getJSON(model.url).then((data) => {
      model.heroesList = []

      data.forEach((hero) => {
        if (
          hero.biography.publisher == franchise &&
          hero.appearance.height[0] !== '-'
        )
          model.heroesList.push(hero)
      })
      
      view.switchMode(franchise)
      view.renderHeroesList(model.heroesList, 1)
    })
  },

  goToPage(pageId) {
    view.updateNav(pageId)
    view.swipeCurrentPage(pageId)
  },
}

export { controller as default }
