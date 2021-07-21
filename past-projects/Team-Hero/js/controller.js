import model from './model.js'
import view from './view.js'

const controller = {
  getFranchise(franchise) {
    model.getJSON(model.url).then((data) => {
      model.heroesList = []

      model.writeToLS('franchise', franchise)

      data.forEach((hero) => {
        if (
          hero.biography.publisher == franchise &&
          hero.appearance.height[0] !== '-' &&
          hero.biography.fullName !== '' 
        )
          model.heroesList.push(hero)
      })
      
      view.switchMode(franchise)
      view.explore.renderHeroesList(model.heroesList, 1)
      
      let teamList
      franchise == 'Marvel Comics' ? teamList = view.team.teamMarvel : teamList = view.team.teamDC
      view.team.renderTeam(teamList)
    })
  },

  goToPage(pageId) {
    view.updateNav(pageId)
    view.swipeCurrentPage(pageId)
  },
}

export { controller as default }
