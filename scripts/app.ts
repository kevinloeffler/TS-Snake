import {buildBoard, renderArrow, renderDifficulty, renderFrame, renderStartStopButton} from './view.js'
import {Snake} from './snake.js'
import {BOARDSIZE, Dir, LEVELS, setMaxSpeed, setSpeed, SPEED} from './types.js'
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
    if (validateInput(activeInput, nextInput)) {
        renderArrow(nextInput)
    } else {
        renderArrow(activeInput)
    }
}

function validateInput (currentDirection: Dir, newDirection: Dir) : boolean {
    switch (currentDirection) {
        case Dir.Up:
            if (newDirection !== Dir.Down) {
                return true
            } break
        case Dir.Right:
            if (newDirection !== Dir.Left) {
                return true
            } break
        case Dir.Down:
            if (newDirection !== Dir.Up) {
                return true
            } break
        case Dir.Left:
            if (newDirection !== Dir.Right) {
                return true
            } break
        default:
            return false
    }
}

document.addEventListener('keydown', handleInput)

async function gameLoop () {
    while (gameIsActive) {
        if (validateInput(activeInput, nextInput)) {
            activeInput = nextInput
        }
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

function getDifficulty (): {'name': string, 'startSpeed': number, 'maxSpeed': number} {
    const slider = <HTMLInputElement>document.querySelector('#speed-input')
    return LEVELS[parseInt(slider.value)]
}

function startGame () {
    const difficulty = getDifficulty()
    /* Set Speeds */
    setSpeed(difficulty.startSpeed)
    setMaxSpeed(difficulty.maxSpeed)
    /* Render UI */
    renderDifficulty(difficulty.name) // TODO: should be rendered on input
    renderStartStopButton('Stop Game')
    /* Start Game */
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

function handleRangeChange () {
    console.log('handleRangeChange')
    renderDifficulty(getDifficulty().name)
}

document.querySelector('#speed-input').addEventListener('input', handleRangeChange)
document.querySelector('#start-game-btn').addEventListener('click', handleStartStopButton)

export {SNAKE, getDifficulty}