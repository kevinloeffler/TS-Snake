import {Point} from './point.js'
import {BOARDSIZE} from './types.js'

let foodPosition = null
updateFood([new Point(Math.round(BOARDSIZE / 2), Math.round(BOARDSIZE / 2) - 1)])

function updateFood (forbiddenFields: [Point?]): void {
    let isUniquePoint = false
    let x = 1
    let y = 1
    while (!isUniquePoint) {
        x = Math.floor(Math.random() * (BOARDSIZE - 2) + 1)
        y = Math.floor(Math.random() * (BOARDSIZE -2) + 1)

        isUniquePoint = true
        for (const field of forbiddenFields) {
            if (x === field.x && y === field.y) {
                isUniquePoint = false
                break
            }
        }
    }
    foodPosition = new Point(x, y)
}

export {foodPosition, updateFood}