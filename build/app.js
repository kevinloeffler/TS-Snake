var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { buildBoard, renderFrame } from './view.js';
import { Snake } from './snake.js';
import { BOARDSIZE, Dir, SPEED } from './types.js';
import { Point } from './point.js';
// Init Game
buildBoard();
const startPoint = new Point(Math.round(BOARDSIZE / 2), Math.round(BOARDSIZE / 2) - 1);
const SNAKE = new Snake(startPoint, Dir.Left);
let nextInput = Dir.Left;
let activeInput = Dir.Left;
function handleInput(key) {
    switch (key.key.toUpperCase()) {
        case 'ARROWUP':
        case 'W':
            nextInput = Dir.Up;
            break;
        case 'ARROWRIGHT':
        case 'D':
            nextInput = Dir.Right;
            break;
        case 'ARROWDOWN':
        case 'S':
            nextInput = Dir.Down;
            break;
        case 'ARROWLEFT':
        case 'A':
            nextInput = Dir.Left;
            break;
        // TESTING ONLY
        case 'G':
            SNAKE.grow();
    }
}
function validateInput() {
    switch (activeInput) {
        case Dir.Up:
            if (nextInput !== Dir.Down) {
                activeInput = nextInput;
            }
            break;
        case Dir.Right:
            if (nextInput !== Dir.Left) {
                activeInput = nextInput;
            }
            break;
        case Dir.Down:
            if (nextInput !== Dir.Up) {
                activeInput = nextInput;
            }
            break;
        case Dir.Left:
            if (nextInput !== Dir.Right) {
                activeInput = nextInput;
            }
            break;
    }
}
document.addEventListener('keydown', handleInput);
function gameLoop() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            validateInput();
            SNAKE.move(activeInput);
            renderFrame();
            yield new Promise(r => setTimeout(r, SPEED));
        }
    });
}
gameLoop();
// Testing
/*
renderFrame()
SNAKE.move(Dir.Left)
renderFrame()
SNAKE.move(Dir.Left)
renderFrame()
SNAKE.grow()
renderFrame()
SNAKE.move(Dir.Left)
renderFrame()
SNAKE.move(Dir.Up)
renderFrame()
SNAKE.move(Dir.Up)
renderFrame()
*/
export { SNAKE };
