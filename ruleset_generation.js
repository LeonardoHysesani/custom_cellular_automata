let ruleString = generateRuleString();

/**
 *
 * @returns {string} Binary representation of generated ruleset.
 */
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
}