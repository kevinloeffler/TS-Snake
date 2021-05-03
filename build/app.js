import { buildBoard, renderFrame } from './view.js';
import { Snake } from './snake.js';
import { BOARDSIZE, Dir } from './types.js';
import { Point } from './point.js';
// Init Game
buildBoard();
const startPoint = new Point(Math.round(BOARDSIZE / 2) - 1, Math.round(BOARDSIZE / 2) - 1);
const SNAKE = new Snake(startPoint, Dir.Left);
let currentInput = Dir.Left;
function handleInput(key) {
    switch (key.key.toUpperCase()) {
        case 'ARROWUP':
        case 'W':
            currentInput = Dir.Up;
            break;
        case 'ARROWRIGHT':
        case 'D':
            currentInput = Dir.Right;
            break;
        case 'ARROWDOWN':
        case 'S':
            currentInput = Dir.Down;
            break;
        case 'ARROWLEFT':
        case 'A':
            currentInput = Dir.Left;
            break;
    }
}
document.addEventListener('keydown', handleInput);
// Testing
renderFrame();
SNAKE.move(Dir.Left);
renderFrame();
SNAKE.move(Dir.Left);
renderFrame();
SNAKE.grow();
renderFrame();
SNAKE.move(Dir.Left);
renderFrame();
SNAKE.move(Dir.Up);
renderFrame();
SNAKE.move(Dir.Up);
renderFrame();
export { SNAKE };
