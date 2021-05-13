const tileAll = document.querySelectorAll('.tile')
const board = document.querySelector('.board')
const button = document.querySelector('button')
const resultDiv = document.querySelector('.result')

// Event listeners
tileAll.forEach(tile => {
    if (window.matchMedia("(pointer: coarse)").matches) { // checks if touchscreen
        tile.addEventListener('touchend', toggleTile)
    } else {
        tile.addEventListener('click', toggleTile)
    }
});
button.addEventListener('click', resetBoard)

// Board Setup
let turnNumber = 0
let boardState

turnNumber;

const currentStateX = [] // which tiles have Xs
const currentStateO = [] // which tiles have Os

const winningCombo = [ // all possible winning combinations
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

function toggleTile() {
    let tileState = this.dataset['state']
    let tileId = this.dataset['id']
    let boardState = board.dataset['turn']

    if (tileState == "" && turnNumber <= 9) {
        turnNumber += 1
        if (boardState == "x") {
            this.setAttribute('data-state', 'x')
            board.setAttribute('data-turn', 'o') // sets board turn to "o"
            currentStateX.push(parseInt(tileId))
            checkWin(winningCombo, currentStateX) ? endGame("X wins") : checkDraw(turnNumber)
            
        } else {
            this.setAttribute('data-state', 'o')
            board.setAttribute('data-turn', 'x') // sets board turn to "x"
            currentStateO.push(parseInt(tileId))
            checkWin(winningCombo, currentStateO) ? endGame("O wins") : checkDraw(turnNumber)
        }
    }
}

function checkDraw(turn) { // Checks if board is full
    if (turn == 9) endGame("Draw")
}

function checkWin(solutions, state) {
    return solutions.some(solution => { // Checks every solution against the current state
        return solution.every(i => state.includes(i));
    })
}

function endGame(finalState) {
    resultDiv.innerHTML = finalState
    tileAll.forEach(tile => { // prevents the player from continuing playing
        if (tile.dataset['state'] == '') {
            tile.setAttribute('data-state', 'end')
        }
    })
}

function resetBoard() { // resets everything
    board.setAttribute('data-turn', 'x') // sets board turn to "x"
    tileAll.forEach(tile => { // empties the board
        tile.setAttribute('data-state', '')
    })
    turnNumber = 0
    currentStateX.length = 0
    currentStateO.length = 0
    resultDiv.innerHTML = ''
}