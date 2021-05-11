// Game Constants
let SPEED = 600
const BOARDSIZE = 12

enum Dir {
    Up = 'UP',
    Right = 'RIGHT',
    Down = 'DOWN',
    Left = 'Left'
}

function reduceSpeed (): void {
    SPEED = Math.floor(SPEED * 0.9)
    console.log('New Speed: ' + SPEED)
}

export {Dir, BOARDSIZE, SPEED, reduceSpeed}
