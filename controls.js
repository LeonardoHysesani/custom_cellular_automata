$(document).ready(function() {
    // Play/pause btn
    document.addEventListener("keypress", function (ev) {
        if (ev.key === " ") {
            toggleSimulationEnabled();
        }
    });
    let playbtn = $("#play-pause-btn")[0];
    playbtn.addEventListener("click", () => toggleSimulationEnabled());
    function toggleSimulationEnabled() {
        simulationEnabled = !simulationEnabled;
        $("#play-pause-btn")[0].innerText = simulationEnabled ? "pause" : "play_arrow";
    }
    playbtn.innerHTML = simulationEnabled ? "pause" : "play_arrow";

    let speedSlider = $("#speed-slider")[0];
    speedSlider.onchange =function () {
        updateSimulationSpeed(parseInt(speedSlider.value));
    };
    speedSlider.addEventListener("mousemove", () => {
        updateSimulationSpeed(parseInt(speedSlider.value));
    });

    updateRuleDisplay();
    let switchRuleDisplayBtn = $("#switch-rule-display")[0];
    switchRuleDisplayBtn.addEventListener("click", function () {
        let ruleDiv = $("#rule-div")[0];
        if (ruleDiv.classList.contains("bin")) {
            ruleDiv.classList = "hex";
            ruleDiv.innerText = binaryToHex(ruleString);
        } else {
            ruleDiv.classList = "bin";
            ruleDiv.innerText = ruleString;
        }
    });

    $("#help-texts-label")[0].addEventListener("click", function () {
        if ($("#help-texts")[0].classList.contains("noactive")) {
            $("#help-texts")[0].classList.remove("noactive");
            $("#help-texts")[0].classList.add("active");
        }
        else {
            $("#help-texts")[0].classList.remove("active");
            $("#help-texts")[0].classList.add("noactive");
        }
    });

    $("#apply-ruleset")[0].addEventListener("click", function () {
        applyRuleSet($("#rules-area")[0].value);
        updateRuleDisplay();
    });

    $("#apply-game-of-life")[0].addEventListener("click", function () {
        loadGameOfLife();
    });
});

function updateRuleDisplay() {
    // Rule display
    $("#rule-div")[0].innerHTML = binaryToHex(ruleString);
}

function loadGameOfLife() {
    $("#rules-area")[0].value = "cell === 1 && liveNeighbours < 2 : 0;\n" +
        "\n" +
        "cell === 1 && 2 <= liveNeighbours && liveNeighbours < 4 : 1;\n" +
        "\n" +
        "cell === 1 && liveNeighbours >= 4 : 0;\n" +
        "\n" +
        "cell === 0 && liveNeighbours === 3 : 1;";
    applyRuleSet($("#rules-area")[0].value);
    updateRuleDisplay();
}