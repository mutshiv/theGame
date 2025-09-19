/**
 * @param {GameState} gameState 
 * @returns {HTMLElement}
 */
export function drawGameStatsPanel(gs) {
    const panel = document.createElement("div");
    panel.style.position = "absolute";
    panel.style.top = "10px";
    panel.style.right = "10px";
    panel.style.width = "400px";
    panel.style.height = "100px";
    panel.style.background = "rgba(0, 0, 0, 0.7)";
    panel.style.color = "white";
    panel.style.padding = "10px";
    panel.style.cursor = "grab";
    panel.style.borderRadius = "5px";
    panel.style.userSelect = "none";

    panel.appendChild(drawContent(gs));
    return panel;
}

/**
 * @param {GameState} gs 
 * @returns {HTMLElement}
 */
function drawContent(gs) {
    const label = document.createElement('label');
    label.textContent = 'Game speed : ' + gs.speed;

    return label;
}

