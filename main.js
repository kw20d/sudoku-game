import { sudoku } from './sudoku.js';

const canvas = document.querySelector('#main-canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.fonts.load('40px VT323')
    .then(() => sudoku.start(canvas))
    .catch(error => {
        console.error('Font loading failed:', error);
        sudoku.start(canvas);
    });

document.addEventListener('keydown', event => {
    if (event.key.startsWith('Arrow')) {
        event.preventDefault();
    }

    sudoku.onKey(event.type, event.key);
});

document.addEventListener('keyup', event => {
    sudoku.onKey(event.type, event.key);
});