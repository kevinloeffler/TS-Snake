import {buildBoard, renderFrame, renderStartStopButton} from './view.js'
import {Snake} from './snake.js'
import {BOARDSIZE, Dir, setSpeed, SPEED} from './types.js'
import {Point} from './point.js';

// Init Game
buildBoard()

const startPoint = new Point(Math.round(BOARDSIZE / 2), Math.round(BOARDSIZE / 2) - 1)
let SNAKE = new Snake(startPoint, Dir.Left)
let nextInput: Dir = Dir.Left
let activeInput: Dir = Dir.Left
let gameIsActive: boolean = false

function handleInput (key): void {
    switch (key.key.toUpperCase()) {
        case 'ARROWUP':
        case 'W':
            nextInput = Dir.Up
            break
        case 'ARROWRIGHT':
        case 'D':
            nextInput = Dir.Right
            break
        case 'ARROWDOWN':
        case 'S':
            nextInput = Dir.Down
            break
        case 'ARROWLEFT':
        case 'A':
            nextInput = Dir.Left
            break
        // TESTING ONLY
        case 'G':
            SNAKE.grow()
    }
}

function validateInput () {
    switch (activeInput) {
        case Dir.Up:
            if (nextInput !== Dir.Down) {
                activeInput = nextInput
            } break
        case Dir.Right:
            if (nextInput !== Dir.Left) {
                activeInput = nextInput
            } break
        case Dir.Down:
            if (nextInput !== Dir.Up) {
                activeInput = nextInput
            } break
        case Dir.Left:
            if (nextInput !== Dir.Right) {
                activeInput = nextInput
            } break
    }
}

document.addEventListener('keydown', handleInput)

async function gameLoop () {
    while (gameIsActive) {
        validateInput()
        SNAKE.move(activeInput)
        if (!SNAKE.validPosition()) {
            gameIsActive = false
            return 'Game Over'
        }

        renderFrame()
        await new Promise(r => setTimeout(r, SPEED))
    }
    return 'Game Stopped'
}

function getSpeed (): number {
    const slider = <HTMLInputElement>document.querySelector('#speedInput')
    return 1000 - parseInt(slider.value)
}

function startGame () {
    setSpeed(getSpeed())
    renderStartStopButton('Stop Game')
    gameIsActive = true
    gameLoop().then(stopGame)//.then(msg => console.log(msg))
}

function stopGame () {
    SNAKE = new Snake(startPoint, Dir.Left)
    renderStartStopButton('New Game')
}

function handleStartStopButton () {
    if (gameIsActive) {
        gameIsActive = false
        stopGame()
    } else {
        gameIsActive = true
        startGame()
    }
}

document.querySelector('#start-game-btn').addEventListener('click', handleStartStopButton)

export {SNAKE}