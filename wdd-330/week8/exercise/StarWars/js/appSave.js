// SELECTORS
const startPage = document.getElementById('startPage')
const startTitle = document.querySelector('#startPage h1')
console.log(startTitle);
const quizPage = document.getElementById('quizPage')
const mainNav = document.getElementById('mainNav')
const categories = document.querySelectorAll('#mainNav button')
console.log(categories);

// EVENT LISTENERS
categories.forEach(category => addEL(category))

function addEL(category) {
    category.addEventListener('click', fetchCategory)
}



// ------------------------ MODEL ------------------------
categoriesStorage = {
    films: [],
    people: [],
    planets: [],
    species: [],
    starships: [],
    vehicles: []
}

function fetchCategory(category) {
    fetch(`https://swapi.dev/api/${category.id}`)
        .then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                return response.json();
            }
        })
        .then((data) => {
            categoriesStorage[category.id].push(data);
        });
}

// ------------------------ VIEW ------------------------
function transition() {
    startTitle.classList.add('faded')
    startPage.addEventListener('transitionend', function (e) {
        if (e.propertyName !== 'display') transition();
        quizPage.classList.remove('hidden')
        startPage.classList.add('hidden')
    }, {
        capture: false,
        once: true,
        passive: false
    })
}

function renderList(data) {
    names = data.results.forEach(result => console.log(result.name))
    console.log(names);
}

// ------------------------ CONTROLLER ------------------------

window.onload = () => {
    setTimeout(function () {
        startPage.classList.remove('visuallyhidden');
    }, 1000);
    categories.forEach(category => fetchCategory(category))
    console.log(categoriesStorage);
};