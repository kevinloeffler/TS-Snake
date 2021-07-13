// Game Constants
let SPEED = 600
let MAXSPEED = 100
const BOARDSIZE = 12

enum Dir {
    Up = 'UP',
    Right = 'RIGHT',
    Down = 'DOWN',
    Left = 'Left'
}

const LEVELS = {
    0: {'name': 'Beginner', 'startSpeed': 1000, 'maxSpeed': 200},
    1: {'name': 'Easy', 'startSpeed': 800, 'maxSpeed': 140},
    2: {'name': 'Medium', 'startSpeed': 600, 'maxSpeed': 140},
    3: {'name': 'Advanced', 'startSpeed': 400, 'maxSpeed': 120},
    4: {'name': 'Hard', 'startSpeed': 250, 'maxSpeed': 100},
    5: {'name': 'Maniac', 'startSpeed': 160, 'maxSpeed': 70},
}

function reduceSpeed (): void {
    if (SPEED > MAXSPEED) {
        SPEED = Math.floor(SPEED * 0.9)
        console.log('New Speed: ' + SPEED)
    }
}

function setSpeed (newSpeed: number) {
    SPEED = newSpeed
}

function setMaxSpeed (newSpeed: number) {
    MAXSPEED = newSpeed
}

export {Dir, LEVELS, BOARDSIZE, SPEED, MAXSPEED, reduceSpeed, setSpeed, setMaxSpeed}
