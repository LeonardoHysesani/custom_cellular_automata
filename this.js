let framerate = 60;
let simulationSpeed = 10;
let canvasSize = 600;
let cellSize = 10;
let gridSize = canvasSize/cellSize;
let grid;
//let ruleString = "00100000001000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
let ruleString = "00010000111100001111000011110011111000011110000111100011111000011110000111100001111000011110000111100001111010011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100000";
//let ruleArray = ruleString.split("");
let simulationEnabled = true;

$(document).ready(function () {
    grid = getEmptyGrid();

    let canvas = $("#world_canvas")[0];
    let context = canvas.getContext("2d");

    //.setInterval(draw, 1000/framerate);
    window.setInterval(simulation, 1000/simulationSpeed);

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

    function simulation() {
        if (simulationEnabled) {
            let nextGrid = getEmptyGrid();
            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    nextGrid[i][j] = getNextState(i, j);
                }
            }
            grid = nextGrid;
        }
        draw();
    }

    function getNextState(i, j) {
        //return ruleArray[getRulePosition(getRuleBinaryString(neighbourhood))];
        return parseInt(ruleString.charAt(getRulePosition(getNeighbourhoodString(i, j))));
    }

    function getNeighbourhoodString(index_i, index_j) {
        let neighbourhood = "";
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                // we swap i and j because we want our string to represent our neighbourhood row by row, not column by column
                neighbourhood += grid[mod(j+index_i, gridSize)][mod(i+index_j, gridSize)];
            }
        }
        return neighbourhood;
    }


    function getRulePosition(binaryString) {
        return parseInt(binaryString, 2);
    }

    canvas.addEventListener("click", function (event) {
        let coords = getMousePositionInGrid(canvas, event);
        grid[coords[0]][coords[1]] = grid[coords[0]][coords[1]] === 0 ? 1 : 0;
    });
    document.addEventListener("keypress", function (ev) {
        if (ev.key === " ") {
            simulationEnabled = !simulationEnabled;
        }
    });


    function getMousePositionInGrid(canvas, event) {
        let realPosition = getMousePosition(canvas, event);
        let gridPosition = [
            Math.floor((realPosition[0]/canvasSize)*gridSize),
            Math.floor((realPosition[1]/canvasSize)*gridSize),
        ];
        console.log(gridPosition);
        return gridPosition;
    }
    function getEmptyGrid() {
        let grid = [];
        for (let i = 0; i < gridSize; i++) {
            grid.push([]);
            for (let j = 0; j < gridSize; j++) {
                grid[i][j] = 0;
            }
        }
        return grid;
    }
});

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return [x, y];
}

// we define our own function than calculates a modulo because the javascript % operator is actually the remainder operator,
// allowing it to return negative values, which we do not want
function mod(n, m) {
    return ((n%m)+m)%m;
}