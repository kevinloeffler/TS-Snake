import {BOARDSIZE, Dir, reduceSpeed} from './types.js'
import {Point} from './point.js';
import {foodPosition, updateFood} from './food.js';
import {renderCounter} from './view.js'

class SnakeBody {
    direction: Dir
    next: SnakeBody
    nextDirection: Dir
    position: Point

    constructor(direction: Dir, startPosition: Point) {
        this.direction = direction
        this.next = null
        this.nextDirection = direction
        this.position = startPosition
    }

    move(direction: Dir) {
        this.nextDirection = this.direction
        this.direction = direction

        this.position = this.calculateNewPosition(this.direction)

        if (this.next) {
            this.next.move(this.nextDirection)
        }
    }

    append() {
        const lastPoint: Point = this.calculateNewPosition(this.direction, -1)
        this.next = new SnakeBody(this.nextDirection, lastPoint)
    }

    private calculateNewPosition (inputDirection: Dir, offset: -1 | 1 = 1): Point {
        switch (inputDirection) {
            case Dir.Up:
                return new Point(this.position.x, this.position.y - offset)
            case Dir.Down:
                return new Point(this.position.x, this.position.y + offset)
            case Dir.Right:
                return new Point(this.position.x + offset, this.position.y)
            case Dir.Left:
                return new Point(this.position.x - offset, this.position.y)
        }
    }
}

class Snake {
    head: SnakeBody
    length: number

    constructor(startPoint: Point, startDirection: Dir) {
        this.length = 1
        this.head = new SnakeBody(startDirection, startPoint)
    }

    getPositions (): Point[] {
        const allPositions: Point[] = []
        let currentNode = this.head
        while (currentNode !== null) {
            allPositions.push(currentNode.position)
            currentNode = currentNode.next
        }
        return allPositions
    }

    move (direction: Dir): void {
        this.head.move(direction)
        if (this.checkFood()) {
            this.grow()
            console.log('eaten')
        }
    }

    validPosition (): boolean {
        // Check if snake is still on board
        if (this.head.position.x >= BOARDSIZE || this.head.position.x < 0) {
            console.log('invalid board position')
            return false
        } else if (this.head.position.y >= BOARDSIZE || this.head.position.y < 0) {
            console.log('invalid board position')
            return false
        }
        // Check if snake ate itself
        let currentNode = this.head
        while (currentNode.next !== null) {
            currentNode = currentNode.next
            if (this.head.position.x === currentNode.position.x && this.head.position.y === currentNode.position.y) {
                console.log('invalid move')
                return false
            }
        }
        return true
    }

    checkFood (): boolean {
        if (this.head.position.x === foodPosition.x) {
            if (this.head.position.y === foodPosition.y) {
                return true
            }
        }
        return false
    }

    grow (): void {
        this.length++
        let currentlyOccupiedPoints : [Point?] = []
        // this.head.append()

        let currentNode = this.head
        while (currentNode.next !== null) {
            currentlyOccupiedPoints.push(currentNode.position)
            currentNode = currentNode.next
        }
        currentNode.append()
        updateFood(currentlyOccupiedPoints)
        reduceSpeed()
        renderCounter(this.length)
    }
}

export {Snake}