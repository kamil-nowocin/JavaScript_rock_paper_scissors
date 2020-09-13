//GLOBAL VARIABLES//
let playerScore = 0
let computerScore = 0
let roundsPlayed = 0

//DOM ELEMENTS//
const HTML_startGameButton = document.querySelector('.welcomeScreen > button')
const HTML_welcomeScreen = document.querySelector('.welcomeScreen')
const HTML_gameArena = document.querySelector('.gameArena')
const HTML_userScore = document.getElementById('userScore')
const HTML_computerScore = document.getElementById('computerScore')
const HTML_gameResult = document.querySelector('.gameResult > h1')
const HTML_restartGameButton = document.querySelector('.restartGame > button')
const HTML_roundsDigit = document.getElementById('roundsDigit')
const HTML_roundsNumberText = document.querySelector('.roundsNumber > p')
const HTML_roundsCounter = document.getElementById('roundsCounter')
const HTML_endGameScreen = document.querySelector('.endGame')
const HTML_endUserScore = document.getElementById('userEndGameScore')
const HTML_endComputerScore = document.getElementById('computerEndGameScore')

//GAME SYMBOLS//
const HTML_rockSymbol = document.getElementById('rock')
const HTML_scissorsSymbol = document.getElementById('scissors')
const HTML_paperSymbol = document.getElementById('paper')

//LISTENERS
HTML_restartGameButton.addEventListener('click', () => clearResult())
HTML_rockSymbol.addEventListener('click', () => calculateGameResult('rock'))
HTML_scissorsSymbol.addEventListener('click', () => calculateGameResult('scissors'))
HTML_paperSymbol.addEventListener('click', () => calculateGameResult('paper'))

startGame()

function startGame() {
    HTML_startGameButton.addEventListener(('click'), () => {
        checkNumberOfRounds(HTML_roundsDigit.value)
        window.scrollTo(0, 0);
    })
}

function checkNumberOfRounds(playerInput) {
    if (isNaN(playerInput) || playerInput <= 0) {
        HTML_roundsNumberText.innerHTML = `This is not valid number of rounds! ${playerInput}`
        symbolBorderGlow('roundsDigit', 'red-glow')
        HTML_roundsDigit.focus()
        HTML_roundsDigit.value = ''
    } else {
        playSound('start')
        HTML_welcomeScreen.classList.add('fadeOut')
        HTML_gameArena.className = 'gameArena fadeIn'
    }
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

function getWinner(playerChosenSymbol, computerChosenSymbol, winner) {
    HTML_roundsCounter.innerHTML = `Round ${roundsPlayed + 1} of ${HTML_roundsDigit.value}`
    switch (winner.toLowerCase()) {
        case 'draw':
            endGame(computerScore, playerScore)
            roundsPlayed++
            playSound('draw')
            HTML_gameResult.innerHTML = 'It\'s a draw 💁🏻‍♂️'
            symbolBorderGlow(computerChosenSymbol, 'white-glow')
            symbolBorderGlow(playerChosenSymbol, 'white-glow')
            break
        case 'computer':
            playSound('lose')
            computerScore++
            endGame(computerScore, playerScore)
            roundsPlayed++
            HTML_computerScore.innerHTML = computerScore.toString()
            HTML_userScore.innerHTML = playerScore.toString()
            HTML_gameResult.innerHTML = `${computerChosenSymbol.charAt(0).toUpperCase()}${computerChosenSymbol.slice(1)}
             beats ${playerChosenSymbol.charAt(0).toUpperCase()}${playerChosenSymbol.slice(1)}, You lost 🤦🏻‍♂️`
            symbolBorderGlow(computerChosenSymbol, 'green-glow')
            symbolBorderGlow(playerChosenSymbol, 'red-glow')
            break
        case 'player':
            playSound('win')
            playerScore++
            endGame(computerScore, playerScore)
            roundsPlayed++
            HTML_userScore.innerHTML = playerScore.toString()
            HTML_computerScore.innerHTML = computerScore.toString()
            HTML_gameResult.innerHTML = `${playerChosenSymbol.charAt(0).toUpperCase()}${playerChosenSymbol.slice(1)}
             beats ${computerChosenSymbol.charAt(0).toUpperCase()}${computerChosenSymbol.slice(1)}, You win 🙋🏻‍♂️`
            symbolBorderGlow(playerChosenSymbol, 'green-glow')
            symbolBorderGlow(computerChosenSymbol, 'red-glow')
            break
        default:
            throw new Error(`Unknown step: ${winner}`)
    }
}

function endGame(computerScore, playerScore) {
    if (parseInt(HTML_roundsDigit.value) === roundsPlayed + 1) {
        HTML_endUserScore.innerHTML = playerScore
        HTML_endComputerScore.innerHTML = computerScore
        HTML_gameArena.className = 'gameArena fadeOut'
        HTML_endGameScreen.className = 'endGame fadeIn'
        if (computerScore > playerScore) {
            console.log("AI win!")
        } else if (computerScore < playerScore) {
            console.log("User win!")
        } else if (computerScore === playerScore) {
            console.log("Draw!")
        }
    }
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
        case 'restart':
            new Audio('assets/media/start.wav').play()
            break
        default:
            throw new Error(`Unknown effect${soundEffect}`)
    }
}

function symbolBorderGlow(elementID, cssClass) {
    document.getElementById(elementID).classList.add(cssClass)
    setTimeout(() => document.getElementById(elementID).classList.remove(cssClass), 500)
}

function clearResult() {
    playSound('restart')
    playerScore = 0
    computerScore = 0
    roundsPlayed = 0
    HTML_gameResult.innerHTML = 'Chose your symbol'
    HTML_roundsCounter.innerHTML = `Let the game begin`
    HTML_userScore.innerHTML = playerScore.toString()
    HTML_computerScore.innerHTML = computerScore.toString()
}