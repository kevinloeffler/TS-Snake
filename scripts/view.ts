import {BOARDSIZE, Dir} from './types.js'
import {SNAKE} from './app.js'
import {Point} from './point.js'
import {foodPosition} from './food.js'

// HTML References
const board = <HTMLElement>document.querySelector('#board')
const startStopButton = document.querySelector('#start-game-btn')
const inputSection = <HTMLElement>document.querySelector('#input-wrapper')
const speedText = <HTMLElement>document.querySelector('#speed-text')
const arrow = <HTMLElement>document.querySelector('#arrow')
const counter = <HTMLElement>document.querySelector('#counter')

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

function renderArrow (orientation: Dir) {
    arrow.classList.remove('arrow-right', 'arrow-left', 'arrow-up', 'arrow-down')
    switch (orientation) {
        case Dir.Left:
            arrow.classList.add('arrow-left')
            break
        case Dir.Right:
            arrow.classList.add('arrow-right')
            break
        case Dir.Up:
            arrow.classList.add('arrow-up')
            break
        case Dir.Down:
            arrow.classList.add('arrow-down')
            break
    }
}

function renderCounter (score: number) {
    counter.innerText = score.toString()
}

export {buildBoard, renderFrame, renderStartStopButton, renderDifficulty, renderArrow, renderCounter}
