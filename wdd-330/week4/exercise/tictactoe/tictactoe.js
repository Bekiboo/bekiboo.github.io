const tileAll = document.querySelectorAll('.tile')
const board = document.querySelector('.board')
const button = document.querySelector('button')
const resultDiv = document.querySelector('.result')

// Event listeners
tileAll.forEach(tile => {
    if (window.matchMedia("(pointer: coarse)").matches) { // checks if touchscreen
        tile.addEventListener('touchend', checkTile)
    } else {
        tile.addEventListener('click', checkTile)
    }
});
button.addEventListener('click', resetBoard)

// Board Setup
let turnNumber = 0
let boardState
let currentState = {
    x: [],
    o: []
}

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

function checkTile() {
    let tileState = this.dataset['state']
    let tileId = this.dataset['id']
    let boardState = board.dataset['turn']

    if (tileState === "") {
        turnNumber += 1
        toggleTile(boardState, tileId, this)
    }
}

function toggleTile(turn, id, that) {
    that.setAttribute('data-state', `${turn}`)
    currentState[`${turn}`].push(parseInt(id))
    checkWin(winningCombo, currentState[`${turn}`]) ? endGame(`${turn} wins`) : checkDraw(turnNumber)
    turn === 'x' ? turn = 'o' : turn = 'x'
    board.setAttribute('data-turn', `${turn}`) // sets board turn to "o"
}

function checkDraw(turn) { // Checks if board is full
    if (turn === 9) endGame("Draw")
}

function checkWin(solutions, state) {
    return solutions.some(solution => { // Checks every solution against the current state
        return solution.every(i => state.includes(i));
    })
}

function endGame(finalState) {
    resultDiv.innerHTML = finalState
    tileAll.forEach(tile => { // prevents the player from continuing playing
        if (tile.dataset['state'] === '') {
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
    currentState.x.length = 0
    currentState.o.length = 0
    resultDiv.innerHTML = ''
}