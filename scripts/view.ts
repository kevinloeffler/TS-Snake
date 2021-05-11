import {BOARDSIZE} from './types.js'
import {SNAKE} from './app.js'
import {Point} from './point.js'
import {foodPosition} from './food.js'

// HTML Bindings
const board = <HTMLElement>document.querySelector('#board')

// Build Board
function buildBoard () {
    board.style.width = `${40 * BOARDSIZE}px`
    const fragment = document.createDocumentFragment()
    for (let i = 0; i < BOARDSIZE; i++) {
        for (let j = 0; j < BOARDSIZE; j++) {
            const field = document.createElement('div')
            field.setAttribute('class', 'field')
            field.setAttribute('id', `pos${String(j)}${String(i)}`)
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
    console.log(SNAKE.getPositions())
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
    const active = document.querySelector(`#pos${String(field.x)}${String(field.y)}`)
    active.classList.add('active')
}

function renderFood (field: Point): void {
    const active = document.querySelector(`#pos${String(field.x)}${String(field.y)}`)
    active.classList.add('food')
}

export {buildBoard, renderFrame}