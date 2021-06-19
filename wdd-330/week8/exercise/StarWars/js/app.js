window.onload = () => {
    setTimeout(function () {
        view.startPage.classList.remove('visuallyhidden')
    }, 1000)

    view.categories.forEach(category =>
        category.addEventListener('click', function () {
            controller.showList(`${model.url}${this.id}`, this.id, 1)
        }))
    view.backBtn.addEventListener('click', view.backToMenu)
}

// ----------------------------------- MODEL -----------------------------------
const model = {
    url: 'https://swapi.dev/api/',

    getJSON(url) {
        return fetch(url)
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText)
                } else {
                    return response.json()
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }
}

// ----------------------------------- VIEW -----------------------------------
const view = {
    // SELECTORS
    startPage: document.getElementById('startPage'),
    startTitle: document.querySelector('#startPage h1'),
    dataDisplay: document.getElementById('dataDisplay'),
    dataBody: document.getElementById('dataBody'),
    mainNav: document.getElementById('mainNav'),
    categories: document.querySelectorAll('#mainNav button'),
    dataIndex: document.getElementById('dataIndex'),
    backBtn: document.getElementById('backBtn'),
    body: document.getElementsByTagName('body'),

    // Transition between main menu and categories. 
    // Needs refactoring to be usable for each transitions
    transition() {
        this.startTitle.classList.add('faded')
        this.startPage.addEventListener('transitionend',
            view.transitionEffects, {
                capture: false,
                once: true,
                passive: false
            })
    },

    transitionEffects() {
        if (this.propertyName !== 'display') view.transition()
        view.dataDisplay.classList.remove('hidden')
        view.startPage.classList.add('hidden', 'visuallyhidden')
        setTimeout(function () {
            view.dataDisplay.classList.remove('visuallyhidden')
        }, 500)
    },

    renderList(data, category) {
        this.dataBody.innerHTML = ''
        this.dataIndex.innerHTML = ''
        let itemsList = document.createElement('ul')
        if ('name' in data.results[0]) {
            data.results.forEach(function (name) {
                let itemList = document.createElement('li')
                itemList.innerHTML = `
                      <a href='${name.url}'>${name.name}</a>
                      `

                itemList.addEventListener('click', function (event) {
                    event.preventDefault()
                    controller.getDetails(name.url, category)
                })
                itemsList.appendChild(itemList)
            })

        } else {
            data.results.forEach(title => {
                let itemList = document.createElement('li')
                itemList.innerHTML = `
                      <a href='${title.url}'>${title.title}</a>
                      `

                itemList.addEventListener('click', function (event) {
                    event.preventDefault()
                    controller.getDetails(title.url, category)
                })
                itemsList.appendChild(itemList)
            })
        }
        dataBody.appendChild(itemsList)
    },

    renderIndex(data, category, pageNumber) {
        indexCount = Math.ceil(data.count / 10)
        if (indexCount > 1) {

            let indexBody = document.createElement('ul')
            previous = this.createBackForth(
                data.previous,
                '<',
                indexBody,
                category,
                (pageNumber - 1))

            for (let i = 1; i <= indexCount; i++) {

                let indexPage = document.createElement('li')

                indexURL = `${model.url}${category}/?page=${i}`
                indexPage.innerHTML = `<button href='${indexURL}'>${i}</button>`

                indexPage.addEventListener('click', function (event) {
                    event.preventDefault()
                    controller.showList(
                        indexPage.children[0].getAttribute('href'),
                        category, i)
                })
                indexBody.appendChild(indexPage)
                if (i == pageNumber)
                    indexPage.children[0].setAttribute('data-page', 'current')
            }

            next = this.createBackForth(
                data.next,
                '>',
                indexBody,
                category,
                (pageNumber + 1))
            this.dataIndex.appendChild(indexBody)
        }
    },

    // Previous and Next buttons on each sides of the Index
    createBackForth(direction, text, parentElement, category, pageNumber) {
        let dirElement = document.createElement('li')
        dirElement.innerHTML = `<button href='${direction}'>${text}</button>`
        if (direction) {
            dirElement.addEventListener('click', function (event) {
                event.preventDefault()
                controller.showList(
                    dirElement.children[0].getAttribute('href'),
                    category,
                    pageNumber)
            })
        }
        parentElement.appendChild(dirElement)
    },

    backToMenu() {
        view.dataDisplay.classList.add('hidden')
        view.startPage.classList.remove('hidden')
        view.startTitle.classList.remove('faded')
        view.startPage.classList.remove('visuallyhidden')
        view.startPage.removeEventListener(
            'transitionend',
            view.transitionEffects)
    },

    renderDetailsModal(data, category) {
        const modal = document.createElement('section')
        modal.classList.add('details')
        const closeModalBtn = document.createElement('div')
        closeModalBtn.classList.add('close-modal')
        closeModalBtn.innerHTML = '&times;'
        closeModalBtn.addEventListener('click', view.closeModal)
        modal.appendChild(closeModalBtn)
        detailsContainer = document.createElement('div')
        detailsContainer.classList.add('details-container')

        // Switch to select which info to display in each category
        switch (category) {
            case 'films':
                details = [
                    `Title: ${data.title}`,
                    `Release Date: ${data.release_date}`,
                    `Director: ${data.director}`,
                    `Producer: ${data.producer}`,
                    `Opening Crawl: ${data.opening_crawl}`
                ]
                break;

            case 'people':
                details = [
                    `Name: ${data.name}`,
                    `Gender: ${data.gender}`,
                    `Birth Year: ${data.birth_year}`,
                    `Mass: ${data.mass} Kg`,
                    `Height: ${data.height} cm`,
                    `Skin Color: ${data.skin_color}`,
                    `Hair Color: ${data.hair_color}`,
                    `Eye Color: ${data.eye_color}`,
                ]
                break;

            case 'planets':
                details = [
                    `Name: ${data.name}`,
                    `Climate: ${data.climate}`,
                    `Terrain: ${data.terrain}`,
                    `Gravity: ${data.gravity}`,
                    `Orbital Period: ${data.orbital_period}`,
                    `Terrain: ${data.terrain}`,
                    `Population: ${data.population}`
                ]

                break;
            case 'species':
                details = [
                    `Name: ${data.name}`,
                    `Classification: ${data.classification}`,
                    `Designation: ${data.designation}`,
                    `Average Height: ${data.average_height} cm`,
                    `Average Lifespan: ${data.average_lifespan} years`,
                    `Skin Colors: ${data.skin_colors}`,
                    `Hair Colors: ${data.hair_colors}`,
                    `Eye Colors: ${data.eye_colors}`,
                    `Language: ${data.language}`
                    // `Homeworld: ${getJSON(data.homeworld)}`,
                ]

                break;
            case 'starships':
                details = [
                    `Name: ${data.name}`,
                    `Model: ${data.model}`,
                    `Starship Class: ${data.starship_class}`,
                    `Manufacturer: ${data.manufacturer}`,
                    `Length: ${data.length} meters`,
                    `Cargo Capacity: ${data.cargo_capacity}`,
                    `Cost: ${data.cost_in_credits} credits`,
                    `Crew: ${data.crew}`,
                    `Passengers: ${data.passengers}`,
                    `Hyperdrive Rating: ${data.hyperdrive_rating}`,
                    `Max Atmosphering Speed: ${data.max_atmosphering_speed} `,
                    `MGLT: ${data.MGLT}`
                ]

                break;
            case 'vehicles':
                details = [
                    `Name: ${data.name}`,
                    `Model: ${data.model}`,
                    `Vehicle Class: ${data.vehicule_class}`,
                    `Manufacturer: ${data.manufacturer}`,
                    `Length: ${data.length} meters`,
                    `Cargo Capacity: ${data.cargo_capacity}`,
                    `Cost: ${data.cost_in_credits} credits`,
                    `Crew: ${data.crew}`,
                    `Passengers: ${data.passengers}`,
                    `Max Atmosphering Speed: ${data.max_atmosphering_speed} `
                ]
                break;
        }

        let itemsList = document.createElement('ul')

        details.forEach(function (detail) {
            let itemList = document.createElement('li')
            itemList.innerHTML = `<p>${detail}</p>`
            itemsList.appendChild(itemList)
        })

        detailsContainer.appendChild(itemsList)
        modal.appendChild(detailsContainer)
        view.body[0].appendChild(modal)
    },

    closeModal() {
        modal = document.querySelector('.details')
        modal.remove()
    }
}

// ----------------------------------- CONTROLLER -----------------------------------
const controller = {
    showList(url, category, pageNumber) {
        model.getJSON(url)
            .then((data) => {
                console.log(data);
                view.renderList(data, category)
                view.renderIndex(data, category, pageNumber)
                view.transition()
            })
    },

    getDetails(info, category) {
        model.getJSON(info)
            .then((data) => {
                view.renderDetailsModal(data, category)
            })
    }
}