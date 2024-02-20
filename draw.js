/**
 * Frequency (per second) of drawing new frame on canvas.
 * **This** and simulation speed could be used interchangeably, but their separation allows for better
 * responsiveness when clicking on a cell to change its state manually.
 *
 * This is because by setting the framerate to higher than the simulation speed, we don't have to wait until the next
 * simulation cycle, to see our manual change take effect on the grid.
 * @type {number}
 */
let framerate = 60;

let canvasSize = 600;
let cellSize = 20;

let canvas;
let context;

$(document).ready(function() {
    canvas = $("#world_canvas")[0];
    context = canvas.getContext("2d");
    intervalId = window.setInterval(simulation, 1000/simulationSpeed);
    window.setInterval(draw, 1000/framerate)

    /**
     * Clears the current canvas and draws a new frame with updated (likely) data.
     */
    function draw() {
        context.fillStyle = "#005555";
        context.strokeStyle = "#AAAAAA";
        context.fillRect(0, 0, canvasSize, canvasSize);
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                context.beginPath();
                context.fillStyle = grid[i][j] === 0 ? "#000000" : "#FFFFFF";
                context.rect(cellSize*i, cellSize*j, cellSize*(i+1), cellSize*(j+1));
                context.fill();
                context.stroke();
            }
        }
    }

    /**
     * Toggle state of clicked cell
     */
    canvas.addEventListener("click", function (event) {
        let coords = getMousePositionInGrid(canvas, event);
        grid[coords[0]][coords[1]] = grid[coords[0]][coords[1]] === 0 ? 1 : 0;
    });
});

/**
 * @param canvas
 * @param event
 * @returns {number[]} Absolute coordinates of event relative to canvas.
 */
function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return [x, y];
}

/**
 * @param canvas
 * @param event
 * @returns {number[]} Coordinates of cell clicked (relative to cell grid, not canvas).
 */
function getMousePositionInGrid(canvas, event) {
    let realPosition = getMousePosition(canvas, event);
    let gridPosition = [
        Math.floor((realPosition[0]/canvasSize)*gridSize),
        Math.floor((realPosition[1]/canvasSize)*gridSize),
    ];
    console.log(gridPosition);
    return gridPosition;
}