const startPage = document.getElementById('startPage')
const startTitle = document.querySelector('#startPage h1')
console.log(startTitle);
const quizPage = document.getElementById('quizPage')
const startBtn = document.getElementById('startBtn')

startBtn.addEventListener('click', renderGame)

window.onload = () => {
    startPage.classList.remove('hidden');
};
fetch('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json')
    .then((response) => response.json())
    .then((listOfHeroes) => {
        console.log(listOfHeroes);

    });

function renderGame() {
    startTitle.classList.add('faded')
    // startPage.classList.add('visuallyhidden');
    transition()

}

function transition() {
    startPage.addEventListener('transitionend', function (e) {
        console.log(e.propertyName);
        if (e.propertyName !== 'display') transition();
        quizPage.classList.remove('hidden')
        startPage.classList.add('hidden')
    }, {
        capture: false,
        once: true,
        passive: false
    })
}


// document.querySelector('a').addEventListener('transitionend', function (event) {
//     if (event.propertyName !== 'width') return;
//     console.log('transitionEnd - width!');
// });




class View {
    constructor(elementId) {
        this.elementId = elementId

    }
}