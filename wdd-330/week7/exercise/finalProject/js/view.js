const view = {
  // SELECTORS
  menuMarvel: document.getElementById('menuMarvel'),
  menuDC: document.getElementById('menuDC'),
  main: document.getElementById('main'),
  explorePage: document.getElementById('explorePage'),
  homePage: document.getElementById('homePage'),
  playPage: document.getElementById('playPage'),
  navExplore: document.getElementById('navExplore'),
  navBar: document.getElementById('navBar'),
  navHome: document.getElementById('navHome'),
  navPlay: document.getElementById('navPlay'),
  navItems: Array.from(document.getElementsByClassName('nav__item')),

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

  renderHeroesList() {
    //   model.heroesList
  },

  //   hidePage (page) {
  //       side = page.className
  //       side == hidden
  //   },
}

export { view as default }
