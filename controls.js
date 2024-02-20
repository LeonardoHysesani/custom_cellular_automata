$(document).ready(function() {
    // Play/pause btn
    document.addEventListener("keypress", function (ev) {
        if (ev.key === " ") {
            toggleSimulationEnabled();
        }
    });
    let playbtn =$("#play-pause-btn")[0];
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
});