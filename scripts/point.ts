class Point {
    x: number
    y: number
    next: Point

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.next = null
    }
}

export {Point}