class Neighbourhood {
    binstr = "";
    constructor(string) {
        this.binstr = string;
    }

    liveNeighbours() {
        let str = this.binstr.slice(0, 4) + this.binstr.slice(5, this.binstr.length);
        let neighbours = 0;
        for (let i = 0; i < str.length; i++) {
            if (str.charAt(i) === "1") neighbours++;
        }
        return neighbours;
    }

    mainCell() {
        return parseInt(this.binstr.charAt(4), 2);
    }
}
let simulationSpeed = 5;
let gridSize = canvasSize/cellSize;
let grid= getEmptyGrid();
let ruleString = generateRuleString();
let simulationEnabled = true;
let intervalId = -1;

function generateRuleString() {
    let rules = "";
    for (let i = 0; i < 512; i++) {
        let rule = undefined;
        const neighbourhood = new Neighbourhood(Number(i).toString(2).padStart(9, "0"));
        if (neighbourhood.mainCell() === 1) {
            if (neighbourhood.liveNeighbours() < 2 || 4 <= neighbourhood.liveNeighbours()) {
                rule = "0";
            }
            else {
                rule = "1";
            }
        }
        if (neighbourhood.mainCell() === 0) {
            if (neighbourhood.liveNeighbours() === 3) {
                rule = "1";
            }
            else {
                rule = "0";
            }
        }
        rules += rule;
    }
    console.log(rules);
    return rules;
}

function updateSimulationSpeed(newSpeed) {
    if (newSpeed !== simulationSpeed) {
        simulationSpeed = newSpeed;
        clearInterval(intervalId);
        intervalId = setInterval(simulation, 1000/simulationSpeed);
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
            neighbourhood += grid[mod(j +index_i, gridSize)][mod(i+index_j, gridSize)];
        }
    }
    return neighbourhood;
}

function getRulePosition(binaryString) {
    return parseInt(binaryString, 2);
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

// we define our own function than calculates a modulo because the javascript % operator is actually the remainder operator,
// allowing it to return negative values, which we do not want
function mod(n, m) {
    return ((n%m)+m)%m;
}

//let ruleString = "00100000001000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
//let ruleString = "00010000111100001111000011110011111000011110000111100011111000011110000111100001111000011110000111100001111010011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100000";
//let ruleArray = ruleString.split("");