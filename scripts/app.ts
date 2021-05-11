import {buildBoard, renderFrame} from './view.js'
import {Snake} from './snake.js'
import {BOARDSIZE, Dir, SPEED} from './types.js'
import {Point} from './point.js';

// Init Game
buildBoard()

const startPoint = new Point(Math.round(BOARDSIZE / 2), Math.round(BOARDSIZE / 2) - 1)
const SNAKE = new Snake(startPoint, Dir.Left)
let nextInput: Dir = Dir.Left
let activeInput: Dir = Dir.Left

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
    while (true) {
        validateInput()
        SNAKE.move(activeInput)
        if (!SNAKE.validPosition()) {
            return 'Game Over'
        }

        renderFrame()
        await new Promise(r => setTimeout(r, SPEED))
    }
}

gameLoop().then(msg => console.log(msg))

// Testing
/*
renderFrame()
SNAKE.move(Dir.Left)
renderFrame()
SNAKE.move(Dir.Left)
renderFrame()
SNAKE.grow()
renderFrame()
SNAKE.move(Dir.Left)
renderFrame()
SNAKE.move(Dir.Up)
renderFrame()
SNAKE.move(Dir.Up)
renderFrame()
*/
export {SNAKE}