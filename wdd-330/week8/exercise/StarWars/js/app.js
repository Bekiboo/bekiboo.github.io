// ------------------------ MODEL ------------------------
const model = {
    url: 'https://swapi.dev/api/',

    getJSON(url) {
        console.log(url);
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

// ------------------------ VIEW ------------------------
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

    transition() {
        this.startTitle.classList.add('faded')
        this.startPage.addEventListener('transitionend', view.transitionEffects, {
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

    renderList(data) {
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
                    // getnameDetails(name.url)
                })

                itemsList.appendChild(itemList)
            })
        } else {
            data.results.forEach(function (title) {
                let itemList = document.createElement('li')
                itemList.innerHTML = `
                      <a href='${title.url}'>${title.title}</a>
                      `

                itemList.addEventListener('click', function (event) {
                    event.preventDefault()
                    // getnameDetails(name.url)
                })

                itemsList.appendChild(itemList)
            })

        }
        dataBody.appendChild(itemsList)
    },

    renderIndex(data, category, pageNumber) {
        indexCount = Math.ceil(data.count / 10)
        let indexBody = document.createElement('ul')
        previous = this.createBackForth(data.previous, '<', indexBody, category, (pageNumber - 1))

        for (let i = 1; i <= indexCount; i++) {

            let indexPage = document.createElement('li')

            indexURL = `${model.url}${category}/?page=${i}`
            indexPage.innerHTML = `<button href='${indexURL}'>${i}</button>`

            indexPage.addEventListener('click', function (event) {
                event.preventDefault()
                showList(indexPage.children[0].getAttribute('href'), category, i)
            })
            indexBody.appendChild(indexPage)
            if (i == pageNumber) indexPage.children[0].setAttribute('data-page', 'current')                
        }

        next = this.createBackForth(data.next, '>', indexBody, category, (pageNumber + 1))
        this.dataIndex.appendChild(indexBody)
    },

    createBackForth(direction, text, parentElement, category, pageNumber) {
        if (direction) {
            let dirElement = document.createElement('li')
            dirElement.innerHTML = `<button href='${direction}'>${text}</button>`

            dirElement.addEventListener('click', function (event) {
                event.preventDefault()
                showList(dirElement.children[0].getAttribute('href'), category, pageNumber)
            })
            parentElement.appendChild(dirElement)
        } else {
            return
        }
    },

    backToMenu() {
        view.dataDisplay.classList.add('hidden')
        view.startPage.classList.remove('hidden')
        view.startTitle.classList.remove('faded')
        view.startPage.classList.remove('visuallyhidden')
        view.startPage.removeEventListener('transitionend', view.transitionEffects)
    }
}

// ------------------------ CONTROLLER ------------------------
function showList(url, category, pageNumber) {
    model.getJSON(url)
        .then((data) => {
            console.log(data)
            console.log(pageNumber);
            view.renderList(data)
            view.renderIndex(data, category, pageNumber)
            view.transition()
        })
}

window.onload = () => {
    setTimeout(function () {
        view.startPage.classList.remove('visuallyhidden')
    }, 1000)

    view.categories.forEach(category =>
        category.addEventListener('click', function () {
            showList(`${model.url}${this.id}`, this.id, 1)
        }))

    view.backBtn.addEventListener('click', view.backToMenu)
}