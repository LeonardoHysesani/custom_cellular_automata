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
    canvas.addEventListener("click", function (event) {
        let coords = getMousePositionInGrid(canvas, event);
        grid[coords[0]][coords[1]] = grid[coords[0]][coords[1]] === 0 ? 1 : 0;
    });
});