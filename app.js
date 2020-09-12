//GLOBAL VARIABLES//
let userScore = 0;
let computerScore = 0;

//DOM ELEMENTS//
const HTML_startGameButton = document.getElementById('startGame')
const HTML_mainScreen = document.getElementById('welcomeScreen')
const HTML_gameArena = document.querySelector('.gameArena')
const HTML_userScore = document.getElementById('userScore');
const HTML_computerScore = document.getElementById('computerScore');
const HTML_gameResult = document.querySelector('.gameResult > h1');
const HTML_restartGame = document.getElementById('restartGame')

//GAME SYMBOLS//
const rockSymbol_HTML = document.getElementById('rock');
const scissorsSymbol_HTML = document.getElementById('scissors');
const paperSymbol_HTML = document.getElementById('paper');

function startGame() {
    HTML_startGameButton.addEventListener(('click'), () => {
        playSound('start')
        HTML_mainScreen.classList.add('fadeOut')
        HTML_gameArena.className = 'gameArena fadeIn'
    })
    getPlayerSymbol()
}

function getPlayerSymbol() {
    rockSymbol_HTML.addEventListener('click', () => calculateGameResult('rock'))
    scissorsSymbol_HTML.addEventListener('click', () => calculateGameResult('scissors'))
    paperSymbol_HTML.addEventListener('click', () => calculateGameResult('paper'))
}

function calculateGameResult(playerChosenSymbol) {
    let computerChosenSymbol = getComputerSymbol().toLowerCase()
    if (playerChosenSymbol.toLowerCase() === computerChosenSymbol) {
        getWinner(playerChosenSymbol.toLowerCase(), computerChosenSymbol, 'draw')
    } else if (playerChosenSymbol.toLowerCase() === 'rock') {
        if (computerChosenSymbol === 'paper') {
            getWinner(playerChosenSymbol.toLowerCase(), computerChosenSymbol, 'computer')
        } else {
            getWinner(playerChosenSymbol.toLowerCase(), computerChosenSymbol, 'player')
        }
    } else if (playerChosenSymbol.toLowerCase() === 'scissors') {
        if (computerChosenSymbol === 'rock') {
            getWinner(playerChosenSymbol.toLowerCase(), computerChosenSymbol, 'computer')
        } else {
            getWinner(playerChosenSymbol.toLowerCase(), computerChosenSymbol, 'player')
        }
    } else if (playerChosenSymbol.toLowerCase() === 'paper') {
        if (computerChosenSymbol === 'scissors') {
            getWinner(playerChosenSymbol.toLowerCase(), computerChosenSymbol, 'computer')
        } else {
            getWinner(playerChosenSymbol.toLowerCase(), computerChosenSymbol, 'player')
        }
    }
}

function getComputerSymbol() {
    let randomNumber = Math.floor(Math.random() * 3)
    if (randomNumber === 1) {
        return 'rock'
    } else if (randomNumber === 2) {
        return 'scissors'
    } else {
        return 'paper'
    }
}

function symbolBorderGlow(elementID, cssClass) {
    document.getElementById(elementID).classList.add(cssClass)
    setTimeout(() => document.getElementById(elementID).classList.remove(cssClass), 500)
}

function getWinner(playerChosenSymbol, computerChosenSymbol, winner) {
    switch (winner.toLowerCase()) {
        case 'draw':
            playSound('draw')
            HTML_gameResult.innerHTML = 'It\'s a draw!'
            symbolBorderGlow(computerChosenSymbol, 'white-glow')
            symbolBorderGlow(playerChosenSymbol, 'white-glow')
            break
        case 'computer':
            playSound('lose')
            computerScore++
            HTML_computerScore.innerHTML = computerScore.toString()
            HTML_userScore.innerHTML = userScore.toString()
            HTML_gameResult.innerHTML = `${computerChosenSymbol.charAt(0).toUpperCase()}${computerChosenSymbol.slice(1)}
             beats ${playerChosenSymbol.charAt(0).toUpperCase()}${playerChosenSymbol.slice(1)}, You lost 🤖`
            symbolBorderGlow(computerChosenSymbol, 'green-glow')
            symbolBorderGlow(playerChosenSymbol, 'red-glow')
            break
        case 'player':
            playSound('win')
            userScore++
            HTML_userScore.innerHTML = userScore.toString()
            HTML_computerScore.innerHTML = computerScore.toString()
            HTML_gameResult.innerHTML = `${playerChosenSymbol.charAt(0).toUpperCase()}${playerChosenSymbol.slice(1)}
             beats ${computerChosenSymbol.charAt(0).toUpperCase()}${computerChosenSymbol.slice(1)}, You win 👦🏻`
            symbolBorderGlow(playerChosenSymbol, 'green-glow')
            symbolBorderGlow(computerChosenSymbol, 'red-glow')
            break

        default:
            throw new Error(`Unknown step: ${winner}`)
    }
}

HTML_restartGame.addEventListener('click', clearResult)

function clearResult() {
    HTML_restartGame.addEventListener(('click'), () => {
        userScore = 0;
        computerScore = 0;
        HTML_gameResult.innerHTML = 'Chose your symbol'
        HTML_userScore.innerHTML = userScore.toString();
        HTML_computerScore.innerHTML = computerScore.toString()
    })
}

function playSound(soundEffect) {
    switch (soundEffect.toLowerCase()) {
        case 'win':
            new Audio('assets/media/win.wav').play()
            break
        case 'lose':
            new Audio('assets/media/lose.wav').play()
            break
        case 'draw':
            new Audio('assets/media/draw.wav').play()
            break
        case 'start':
            new Audio('assets/media/start.wav').play()
            break
        default:
            throw new Error(`Unknown effect${soundEffect}`)
    }
}

startGame()