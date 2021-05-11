import {Point} from './point.js'
import {BOARDSIZE} from './types.js'

let foodPosition = null
updateFood()

function updateFood (): void {
    const x = Math.floor(Math.random() * BOARDSIZE)
    const y = Math.floor(Math.random() * BOARDSIZE)
    console.log('food at: ' + x + ', ' + y)
    foodPosition = new Point(x, y)
}

export {foodPosition, updateFood}