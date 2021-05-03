import {BOARDSIZE, Dir} from './types.js'
import {Point} from './point.js';

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

        this.position = this.calculateNewPosition(this.position, this.direction)

        if (this.next) {
            this.next.move(this.nextDirection)
        }
    }

    append() {
        const lastPoint: Point = this.calculateNewPosition(this.position, this.direction, -1)
        this.next = new SnakeBody(this.nextDirection, lastPoint)
    }

    private calculateNewPosition (inputPosition: Point, inputDirection: Dir, offset: -1 | 1 = 1): Point {
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
    }

    checkPosition (): boolean {
        if (this.head.position.x < BOARDSIZE && this.head.position.x >= 0) {
            if (this.head.position.y < BOARDSIZE && this.head.position.y >= 0) {
                return true
            }
        }
        return false
    }

    grow (): void {
        this.length++
        // this.head.append()

        let currentNode = this.head
        while (currentNode.next !== null) {
            currentNode = currentNode.next
        }
        currentNode.append()

    }
}

export {Snake}