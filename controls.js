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


    // Rule display
    $("#rule-div")[0].innerHTML = binaryToHex(ruleString);;
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
});