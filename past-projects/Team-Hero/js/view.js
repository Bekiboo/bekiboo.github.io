import anime from './animejs/lib/anime.es.js'
import model from './model.js'

const view = {
  // -------------------- SELECTORS --------------------
  main: document.getElementById('main'),

  // Home
  homePage: document.getElementById('homePage'),
  menuMarvel: document.getElementById('menuMarvel'),
  menuDC: document.getElementById('menuDC'),

  // navbar
  navBar: document.getElementById('navBar'),
  navExplore: document.getElementById('navExplore'),
  navHome: document.getElementById('navHome'),
  navTeam: document.getElementById('navTeam'),
  navItems: Array.from(document.getElementsByClassName('nav__item')),

  currentFranchise: '',

  // -------------------- FUNCTIONS --------------------
  switchMode(franchise) {
    this.currentFranchise = franchise
    let colorList = {
      'Marvel Comics': 'rgb(237, 29, 35)',
      'DC Comics': 'rgb(4, 118, 241)',
    }
    const theme = '--theme'
    document.documentElement.style.setProperty(theme, colorList[franchise])
    switch (franchise) {
      case 'DC Comics':
        this.menuMarvel.classList.add('focused--clickable')
        this.menuDC.classList.remove('focused--clickable')
        break
      case 'Marvel Comics':
        this.menuDC.classList.add('focused--clickable')
        this.menuMarvel.classList.remove('focused--clickable')
        break
    }
  },

  swipeCurrentPage(pageId) {
    let currentPage = this.navBar.getAttribute('data-state')
    switch (pageId) {
      case 'navExplore':
        this.main.style.transform = 'translate(100vw)'
        break
      case 'navHome':
        currentPage == 'navExplore'
        this.main.style.transform = 'translate(0)'
        break
      case 'navTeam':
        this.main.style.transform = 'translate(-100vw)'
        break
    }
    this.navBar.setAttribute('data-state', `${pageId}`)
  },

  updateNav(pageId) {
    this.navItems.forEach((item) => {
      item.classList.add('not-focused')
    })
    let navItem = document.getElementById(`${pageId}`)
    navItem.classList.remove('not-focused')
  },

  // ------------------------------ EXPLORE ------------------------------
  // ------------------------------ EXPLORE ------------------------------
  // ------------------------------ EXPLORE ------------------------------
  explore: {
    // SELECTORS
    explorePage: document.getElementById('explorePage'),
    exploreTitle: document.getElementById('exploreTitle'),
    exploreList: document.getElementById('exploreList'),
    exploreIndex: document.getElementById('exploreIndex'),

    // PARAMETERS
    chunk: 28,

    renderHeroesList(heroesList, pageNumber) {
      this.emptyExplore()
      this.exploreList.classList.remove('details')
      this.exploreTitle.innerHTML = 'Select a Hero'

      let index = 1

      for (let i = 0; i < heroesList.length; i += this.chunk) {
        let subList = heroesList.slice(i, i + this.chunk)

        if (index == pageNumber) {
          subList.forEach((hero) => {
            let heroInstance = document.createElement('li')
            heroInstance.innerHTML = `<p style="transform: translate(500px)">${hero.name}</p>`

            heroInstance.addEventListener('click', function (event) {
              event.preventDefault()
              view.explore.renderHeroDetail(hero, heroesList, pageNumber)
            })

            anime({
              targets: heroInstance,
              translateX: '-500',
              duration: 80,
              opacity: [
                { value: 0, duration: 200 },
                { value: 1, duration: 800 },
              ],
            })
            this.exploreList.appendChild(heroInstance)
          })
        }
        index += 1
      }
      this.renderIndex(heroesList, pageNumber)
    },

    renderIndex(heroesList, pageNumber) {
      let indexCount = Math.ceil(heroesList.length / parseInt(this.chunk))
      let indexBody = document.createElement('ul')

      for (let i = 1; i <= indexCount; i++) {
        let indexPage = document.createElement('li')
        indexPage.innerHTML = `<div></div>`

        indexPage.addEventListener('click', function (event) {
          event.preventDefault()
          view.explore.renderHeroesList(heroesList, i)
        })

        if (i !== pageNumber) indexPage.classList.add('not-focused')

        indexBody.appendChild(indexPage)
      }

      this.exploreIndex.appendChild(indexBody)
    },

    emptyExplore() {
      this.exploreTitle.innerHTML = ''
      this.exploreList.innerHTML = ''
      this.exploreIndex.innerHTML = ''
    },

    renderHeroDetail(hero, heroesList, pageNumber) {
      console.log(hero)

      this.emptyExplore()
      this.exploreTitle.innerHTML = `${hero.name}<br><em>(${hero.biography.fullName})</em>`

      let description = [
        `<div style="font-weight: bold">Description</div>`,
        `Race: ${hero.appearance.race}`,
        `Gender: ${hero.appearance.gender}`,
        `Weight: ${hero.appearance.weight[1]}`,
        `Height: ${hero.appearance.height[1]}`,
        `Hair Color: ${hero.appearance.hairColor}`,
        `Eye Color: ${hero.appearance.eyeColor}`,
        `<img src="${hero.images.sm}" alt="${hero.name}" width="160px" height="240px" style='transform: translate(68px, 0px); margin-top: .5rem'>`,
      ]

      let details = [
        `<div style="font-weight: bold">Powerstats</div>`,
        `Combat: ${hero.powerstats.combat}`,
        `Durability: ${hero.powerstats.durability}`,
        `Intelligence: ${hero.powerstats.intelligence}`,
        `Speed: ${hero.powerstats.speed}`,
        `Strength: ${hero.powerstats.strength}`,
        `Power: ${hero.powerstats.power}`,
        `<br>`,
      ]

      let itemsList1 = document.createElement('div')
      itemsList1.style.pointerEvents = 'none'
      let itemsList2 = document.createElement('div')
      itemsList2.style.pointerEvents = 'none'

      description.forEach(function (detail) {
        let itemList = document.createElement('p')
        itemList.innerHTML = `<div>${detail}</div>`
        itemsList1.appendChild(itemList)
      })

      details.forEach(function (detail) {
        let itemList = document.createElement('p')
        itemList.innerHTML = `<div>${detail}</div>`
        itemsList2.appendChild(itemList)
      })

      anime({
        targets: [itemsList1, itemsList2],
        translateX: [
          { value: -60, duration: 0 },
          { value: 0, duration: 600, delay: 150 },
        ],
        opacity: [
          { value: 0, duration: 200 },
          { value: 1, duration: 800 },
        ],
      })

      this.exploreList.appendChild(itemsList1)
      this.exploreList.appendChild(itemsList2)

      let indexBody = document.createElement('ul')

      // Close button
      let indexCloseBtn = document.createElement('li')
      indexCloseBtn.classList.add('close-button')
      indexCloseBtn.innerHTML = `<div style="font-size: 2.75rem; transform: translate(-50%, -12%)">&times;</div>`
      indexCloseBtn.addEventListener('click', function (event) {
        event.preventDefault()
        view.explore.renderHeroesList(heroesList, pageNumber)
      })
      indexBody.appendChild(indexCloseBtn)

      // Add to team button
      let indexAddBtn = document.createElement('li')
      indexAddBtn.classList.add('add-button')
      indexAddBtn.innerHTML = `Add to your team`
      indexAddBtn.addEventListener('click', function (event) {
        event.preventDefault()
        view.team.saveMember(hero.name)
      })
      indexBody.appendChild(indexAddBtn)

      this.exploreIndex.appendChild(indexBody)
      this.exploreList.classList.add('details')
    },
  },

  // ------------------------------ TEAM ------------------------------
  // ------------------------------ TEAM ------------------------------
  // ------------------------------ TEAM ------------------------------
  team: {
    // SELECTORS
    teamMain: document.getElementById('teamMain'),
    teamTitle: document.getElementById('teamTitle'),

    // PARAMETERS
    teamDC: model.readFromLS('team DC Comics') || [],
    teamMarvel: model.readFromLS('team Marvel Comics') || [],
    teamList: [],
    // categories: model.readFromLS('team'),

    renderTeam(teamList) {
      this.teamMain.innerHTML = ''
      let teamListDiv = document.createElement('div')
      teamListDiv.classList.add('team__list')

      teamList.forEach((hero) => {
        let heroLine = document.createElement('div')
        heroLine.classList.add('teamHeroLine')

        let heroDiv = document.createElement('div')
        heroDiv.classList.add('teamBtn')
        heroDiv.innerHTML = hero

        let removeDiv = document.createElement('div')
        removeDiv.classList.add('removeBtn')
        removeDiv.innerHTML = '&times;'

        removeDiv.addEventListener('click', function () {
          view.team.removeMember(hero)
        })

        heroLine.appendChild(heroDiv)
        heroLine.appendChild(removeDiv)
        teamListDiv.appendChild(heroLine)
      })
      this.teamMain.appendChild(teamListDiv)
    },

    saveMember(hero) {
      view.currentFranchise == 'Marvel Comics'
        ? (this.teamList = this.teamMarvel)
        : (this.teamList = this.teamDC)
      if (this.teamList.length < 5 && !this.teamList.includes(hero)) {
        view.currentFranchise == 'Marvel Comics'
          ? this.teamMarvel.push(hero)
          : this.teamDC.push(hero)
        model.writeToLS(`team ${view.currentFranchise}`, this.teamList)
      }
      this.renderTeam(this.teamList)
    },
    
    removeMember(hero) {
      view.currentFranchise == 'Marvel Comics'
      ? (this.teamList = this.teamMarvel)
      : (this.teamList = this.teamDC)
      
      let toRemove = this.teamList.indexOf(hero)
      this.teamList.splice(toRemove, 1)
      model.writeToLS(`team ${view.currentFranchise}`, this.teamList)

      this.renderTeam(this.teamList)
    },
  },
}

export { view as default }
