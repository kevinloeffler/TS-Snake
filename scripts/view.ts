import {BOARDSIZE} from './types.js'
import {SNAKE} from './app.js'
import {Point} from './point.js'
import {foodPosition} from './food.js'

// HTML References
const board = <HTMLElement>document.querySelector('#board')
const startStopButton = document.querySelector('#start-game-btn')
const inputSection = <HTMLElement>document.querySelector('#input-wrapper')
const speedText = <HTMLElement>document.querySelector('#speedText')

// Build Board
function buildBoard () {
    const sectionWidth = `${40 * BOARDSIZE}px`
    board.style.width = sectionWidth
    inputSection.style.width = sectionWidth
    const fragment = document.createDocumentFragment()
    for (let i = 0; i < BOARDSIZE; i++) {
        for (let j = 0; j < BOARDSIZE; j++) {
            const field = document.createElement('div')
            field.setAttribute('class', 'field')
            field.setAttribute('id', `pos${String(j)}-${String(i)}`)
            // field.setAttribute('data-x', String(j))
            // field.setAttribute('data-y', String(i))
            fragment.appendChild(field)
        }
    }
    board.appendChild(fragment)
}

// Render
function renderFrame (): void {
    resetBoard()
    renderFood(foodPosition)
    for (const pos of SNAKE.getPositions()) {
        activateField(pos)
    }
}

function resetBoard (): void {
    const fields = board.children
    for (const field of fields) {
        field.classList.remove('active', 'food')
    }
}

function activateField (field: Point): void {
    const active = document.querySelector(`#pos${String(field.x)}-${String(field.y)}`)
    active.classList.add('active')
}

function renderFood (field: Point): void {
    const active = document.querySelector(`#pos${String(field.x)}-${String(field.y)}`)
    active.classList.add('food')
}

function renderStartStopButton (text: string) {
    startStopButton.textContent = text
}

function renderDifficulty (text: string) {
    speedText.textContent = text
}

export {buildBoard, renderFrame, renderStartStopButton, renderDifficulty}
