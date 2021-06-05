const startPage = document.getElementById('startPage')
const startTitle = document.querySelector('#startPage h1')
console.log(startTitle);
const quizPage = document.getElementById('quizPage')
const startBtn = document.getElementById('startBtn')

startBtn.addEventListener('click', renderGame)

fetch('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json')
    .then((response) => response.json())
    .then((listOfHeroes) => {
        console.log(listOfHeroes);

    });

function renderGame() {
    startTitle.classList.add('faded')
    startPage.classList.add('visuallyhidden');

    
    startTitle.addEventListener('transitionend', function (e) {
        quizPage.classList.remove('hidden')
    }, {
        capture: false,
        once: true,
        passive: false
    })
}




class View {
    constructor(elementId) {
        this.elementId = elementId

    }
}