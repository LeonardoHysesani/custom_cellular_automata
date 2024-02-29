let userRules = "cell === 1 && liveNeighbours < 2 : 0;\n" +
    "cell === 1 && 2 <= liveNeighbours && liveNeighbours < 4 : 1;\n" +
    "cell === 1 && liveNeighbours >= 4 : 0;\n" +
    "cell === 0 && liveNeighbours === 3 : 1;";

// A interesting tweak on the game of life. Similar general behavior with different patterns
let leonardosRuleset = "cell === 1 && liveNeighbours <= 2 : 0;\n" +
    "\n" +
    "cell === 1 && 3 < liveNeighbours && liveNeighbours < 4 : 1;\n" +
    "\n" +
    "cell === 1 && liveNeighbours >= 4 : 0;\n" +
    "\n" +
    "cell === 0 && liveNeighbours === 3 || liveNeighbours === 4 : 1;";

/**
 * Binary string representation of current ruleset
 * @type {string}
 */
let ruleString;
applyRuleSet(userRules);
//let ruleString = "00100000001000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
//let ruleString = "00010000111100001111000011110011111000011110000111100011111000011110000111100001111000011110000111100001111010011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100001111000011110000111100000";
//let ruleArray = ruleString.split("");



/**
 *
 * @returns {string} Binary string representation of generated ruleset.
 */
function generateRuleString(rulesArray) {
    let rules = "";
    for (let i = 0; i < 512; i++) {
        const neighbourhood = new Neighbourhood().fromBinaryString(Number(i).toString(2).padStart(9, "0"));
        let cell = neighbourhood.mainCell();
        let liveNeighbours = neighbourhood.liveNeighbours();
        let adjacentNeighbours = neighbourhood.adjacentNeighbours();
        let diagonalNeighbours = neighbourhood.diagonalNeighbours();
        let neighbours = neighbourhood.neighbours();
        let rule = cell;
        for (let j = 0; j < rulesArray.length; j++) {
            if (eval(rulesArray[j][0])) {
                rule = rulesArray[j][1];
            }
        }
        rules += rule;
    }
    //console.log(rules);
    return rules;
}

/**
 * @param string A string to be parsed, containing user-specified rules for our automata.
 *
 * **Expressions** can be any valid JavaScript expression.
 *
 * **Results** are state values, 0 or 1.
 *
 * **Format:**
 *
 * expression:result;
 *
 * expression:result;
 *
 * expression:result;
 *
 * expression:result;
 *
 * **Example (game of life):**
 *
 * cell === 1 && liveNeighbours < 2 : 0;
 *
 * cell === 1 && 2 <= liveNeighbours && liveNeighbours < 4 : 1;
 *
 * cell === 1 && liveNeighbours >= 4 : 0;
 *
 * cell === 0 && liveNeighbours === 3 : 1;
 *
 * @returns {Array} Rules array in the following form:
 *
 * [[expression, result],
 *
 * [expression, result],
 *
 * [expression, result],
 *
 *  [expression, result]]
 */
function parseCustomRuleString(string) {
    string = string.replaceAll(" ", "");
    string = string.replaceAll("\n", "");
    // Separate lines
    let tokenList = string.split(";");
    // Separate expression from state
    tokenList.forEach((elem, i, array) => {array[i] = elem.split(":")});
    // Remove last line (empty) and any possible empty expressions/states
    tokenList = tokenList.filter((elem) => {return !elem.includes("");});
    return tokenList;
}

function applyRuleSet(string) {
    ruleString = generateRuleString(parseCustomRuleString(string));
}



/*
function generateRuleString() {
    let rules = "";
    for (let i = 0; i < 512; i++) {
        let rule = undefined;
        const neighbourhood = new Neighbourhood().fromBinaryString(Number(i).toString(2).padStart(9, "0"));
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
}*/
