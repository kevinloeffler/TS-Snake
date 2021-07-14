import {Point} from './point.js'
import {BOARDSIZE} from './types.js'

let foodPosition = null
updateFood()

function updateFood (): void {
    const x = Math.floor(Math.random() * (BOARDSIZE - 2) + 1)
    const y = Math.floor(Math.random() * (BOARDSIZE -2) + 1)
    foodPosition = new Point(x, y)
}

export {foodPosition, updateFood}