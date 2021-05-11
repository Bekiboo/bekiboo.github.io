const boxAll = document.querySelectorAll('.box')
const board = document.querySelector('.board')
const button = document.querySelector('button')
const resultDiv = document.querySelector('.result')

boxAll.forEach(box => {
    box.addEventListener('click', toggleBox)
});
button.addEventListener('click', resetBoard)

let xTurn = true
let turnNumber = 0

const winningCombo = [ // all possible winning combinations
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

const currentStateX = [] // which boxes have Xs
const currentStateO = [] // which boxes have Os

function toggleBox() {
    boxState = this.dataset['state']
    boxId = this.dataset['id']
    turnNumber += 1
    if (boxState == "" && turnNumber <= 9) {
        if (xTurn == true) {
            this.setAttribute('data-state', 'x')
            board.setAttribute('data-turn', 'o') // sets board turn to "o"
            xTurn = false
            currentStateX.push(parseInt(boxId))
            if (checkWin(winningCombo, currentStateX)) endGame("X wins")

        } else {
            this.setAttribute('data-state', 'o')
            board.setAttribute('data-turn', 'x') // sets board turn to "x"
            xTurn = true
            currentStateO.push(parseInt(boxId))
            if (checkWin(winningCombo, currentStateO)) endGame("O wins")
        }
    }
    if (turnNumber == 9) endGame("Draw");
}

function checkWin(solutions, state) {
    return solutions.some(solution => { // Checks every solution against the current state
        return solution.every(i => state.includes(i));
    })
}

function endGame(finalState) {
    resultDiv.innerHTML = finalState
    boxAll.forEach(box => { // prevents the player from continuing playing
        if (box.dataset['state'] == '') {
            box.setAttribute('data-state', 'end')
        }
    })
}

function resetBoard() { // resets everything
    board.setAttribute('data-turn', 'x')
    boxAll.forEach(box => {
        box.setAttribute('data-state', '')
    })
    xTurn = true
    turnNumber = 0
    currentStateX.length = 0
    currentStateO.length = 0
    resultDiv.innerHTML = ''
}