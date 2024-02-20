/**
 * A structure that represents a 3x3 subgrid of our main grid.
 * The cells around the center one are called *Neighbours*.
 * This concept is integral to the way we represent our ruleset, because every possible neighbourhood represents
 * a rule (state) in the ruleset.
 *
 * For example a neighbourhood with only the main cell alive is represented in binary as 000010000 because the top row
 * is 000 (three dead cells side-by-side), the center one is 010 (dead-alive-dead) and the bottom one is 000.
 *
 * The number 000010000 is in binary though. In decimal, its value is 16.
 * This means that the rule for this neighbourhood will be located
 * at position 16 of our ruleset (represented as a binary string).
 *
 * By **rule** we refer to the next state of the center cell.
 *
 * **Example:**
 *
 * 0  1  1
 *
 * 1  0  1    => 011101000 => 232
 *
 * 0  0  0
 *
 * So the next state of the center cell, will be at position 232 of our current ruleset
 */
class Neighbourhood {
    binaryString = undefined;

    /**
     * Pseudo constructor from binary representation of Neighbourhood.
     * @param string Binary representation
     */
    fromBinaryString(string) {
        this.binaryString = string;
        return this;
    }

    /**
     * Pseudo constructor from coordinates of main cell.
     *
     * @param x Center index of Neighbourhood.
     * @param y Center index of Neighbourhood.
     * @returns {Neighbourhood} This Neighbourhood.
     */
    fromCoords(x, y) {
        this.binaryString = "";
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                // we swap i and j because we want our string to represent our neighbourhood row by row, not column by column
                this.binaryString += grid[mod(j + x, gridSize)][mod(i+ y, gridSize)];
            }
        }
        return this;
    }

    /**
     * @returns {number} Decimal representation of this Neighbourhood's position in the ruleset.
     */
    getDecimalPosition() {
        return parseInt(this.binaryString, 2);
    }

    /**
     * @returns {number} Number of perimetric cells **(center one is excepted)** with state == 1.
     */
    liveNeighbours() {
        let str = this.binaryString.slice(0, 4) + this.binaryString.slice(5, this.binaryString.length);
        let neighbours = 0;
        for (let i = 0; i < str.length; i++) {
            if (str.charAt(i) === "1") neighbours++;
        }
        return neighbours;
    }

    /**
     * @returns {number} State of center cell.
     */
    mainCell() {
        return parseInt(this.binaryString.charAt(4), 2);
    }
}

/**
 * Update cycles per second.
 * @type {number}
 */
let simulationSpeed = 5;
/**
 * Total cells on each row/column.
 * @type {number}
 */
let gridSize = canvasSize/cellSize;
/**
 * @type {Array<number>}
 */
let grid= getEmptyGrid();
/**
 * Control for pausing/resuming the simulation.
 * @type {boolean}
 */
let simulationEnabled = true;

/**
 * ID of current interval running the simulation.
 * Used for clearing the current interval when updating simulation speed.
 * @type {number}
 */
let intervalId = -1;

/**
 * Clears current interval and creates a new one with the given speed.
 *
 * **Note**: this checks if the given speed is different from the current one.
 * @param newSpeed
 */
function updateSimulationSpeed(newSpeed) {
    if (newSpeed !== simulationSpeed) {
        simulationSpeed = newSpeed;
        clearInterval(intervalId);
        intervalId = setInterval(simulation, 1000/simulationSpeed);
    }
}

/**
 * Updates/Advances all grid cells to their next state according to the current ruleset.
 */
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

/**
 *
 * @param i Horizontal index of cell.
 * @param j Vertical index of cell.
 * @returns {number} State value (0 or 1).
 */
function getNextState(i, j) {
    return parseInt(ruleString.charAt(new Neighbourhood().fromCoords(i, j).getDecimalPosition()));
}

/**
 * @returns {Array<number>} A grid of dead cells (with state = 0).
 */
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

/**
 * We define our own function than calculates a modulo because the javascript % operator is actually the remainder operator,
 * allowing it to return negative values, which we do not want.
 * @param {number} n Dividend.
 * @param {number} m Divisor.
 * @returns {number} Non-negative modulo result.
 */

function mod(n, m) {
    return ((n%m)+m)%m;
}