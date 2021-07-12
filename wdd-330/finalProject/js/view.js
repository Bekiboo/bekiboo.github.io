import anime from './animejs/lib/anime.es.js'

const view = {
  // -------------------- SELECTORS --------------------
  main: document.getElementById('main'),

  // Home
  homePage: document.getElementById('homePage'),
  menuMarvel: document.getElementById('menuMarvel'),
  menuDC: document.getElementById('menuDC'),

  // Explore
  explorePage: document.getElementById('explorePage'),
  exploreTitle: document.getElementById('exploreTitle'),
  exploreList: document.getElementById('exploreList'),
  exploreIndex: document.getElementById('exploreIndex'),

  // Play
  playPage: document.getElementById('playPage'),

  // navbar
  navBar: document.getElementById('navBar'),
  navExplore: document.getElementById('navExplore'),
  navHome: document.getElementById('navHome'),
  navPlay: document.getElementById('navPlay'),
  navItems: Array.from(document.getElementsByClassName('nav__item')),

  // -------------------- PARAMETERS --------------------
  chunk: 28,

  // -------------------- FUNCTIONS --------------------
  switchMode(franchise) {
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
      case 'navPlay':
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

  // explore
  renderHeroesList(heroesList, pageNumber) {
    this.emptyExplore()
    this.exploreTitle.innerHTML = 'Select a Hero'

    let index = 1

    for (let i = 0; i < heroesList.length; i += this.chunk) {
      let subList = heroesList.slice(i, i + this.chunk)

      if (index == pageNumber) {
        subList.forEach((hero) => {
          let heroInstance = document.createElement('li')
          heroInstance.innerHTML = `<p style="transform: translate(-500px)">${hero.name}</p>`

          heroInstance.addEventListener('click', function (event) {
            event.preventDefault()
            view.renderHeroDetail(hero, heroesList, pageNumber)
          })

          anime({
            targets: heroInstance,
            translateX: '500',
            duration: 80,
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
        view.renderHeroesList(heroesList, i)
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
    this.exploreTitle.innerHTML = hero.name

    let description = [
      `<div style="font-weight: bold">Description</div>`,
      `Race: ${hero.appearance.race}`,
      `Gender: ${hero.appearance.gender}`,
      `Weight: ${hero.appearance.weight[1]}`,
      `Height: ${hero.appearance.height[1]}`,
      `Hair Color: ${hero.appearance.hairColor}`,
      `Eye Color: ${hero.appearance.eyeColor}`,
      `<img src="${hero.images.sm}" alt="${hero.name}" width="160px" height="240px">`,
      `Hair Color: ${hero.appearance.hairColor}`,
      `Eye Color: ${hero.appearance.eyeColor}`,
    ]

    let details = [
      // `Full Name: ${hero.biography.fullName}`,
      // `Place of Birth: ${hero.biography.placeOfBirth}`,
      // `<div style="font-weight: bold">Powerstats</div>`,
      // `Combat: ${hero.powerstats.combat} - Durability: ${hero.powerstats.durability} - Power: ${hero.powerstats.power}`,
      // `Combat: ${hero.powerstats.combat} - Durability: ${hero.powerstats.durability}`,
      // `Combat: ${hero.powerstats.combat} - Durability: ${hero.powerstats.durability}`,
    ]

    let itemsList1 = document.createElement('div')
    // let itemsList2 = document.createElement('ul')
    // itemsList2.style.transform  = 'translate(-150px)'
    // itemsList2.style.width  = '80vw'

    description.forEach(function (detail) {
      let itemList = document.createElement('p')
      itemList.style.pointerEvents = 'none'
      itemList.innerHTML = `<div>${detail}</div>`
      itemsList1.appendChild(itemList)
    })

    // details.forEach(function (detail) {
    //   let itemList = document.createElement('li')
    //   itemList.style.pointerEvents = 'none'
    //   itemList.innerHTML = `<div>${detail}</div>`
    //   itemsList2.appendChild(itemList)
    // })

    anime({
      targets: [itemsList1],
      translateX: [
        { value: -500, duration: 0},
        { value: 0, duration: 800, delay: 150 },
      ],
      opacity: [
        { value: 0, duration: 200},
        { value: 1, duration: 800},
      ]
    })

    this.exploreList.appendChild(itemsList1)
    // this.exploreList.appendChild(itemsList2)

    let indexBody = document.createElement('ul')

    let indexPage = document.createElement('li')
    indexPage.innerHTML = `<div style="font-size: 2.75rem; transform: translate(-50%, -12%)">&times;</div>`
    indexPage.addEventListener('click', function (event) {
      event.preventDefault()
      view.renderHeroesList(heroesList, pageNumber)
    })
    indexBody.appendChild(indexPage)

    this.exploreIndex.appendChild(indexBody)
  },
}

export { view as default }
