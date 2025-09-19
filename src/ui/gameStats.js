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
    panel.style.height = "120px";
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
    const container = document.createElement('div');

    const title = document.createElement('div');
    title.textContent = 'Snake Game Player Stats';
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '8px';

    const levelStat = document.createElement('div');
    levelStat.textContent = `Level: ${gs.level}`;

    const speedStat = document.createElement('div');
    speedStat.textContent = `Speed: ${gs.speed}`;

    const scoreStat = document.createElement('div');
    scoreStat.textContent = `Score: ${gs.foodConsumption || 0}`;

    container.appendChild(title);
    container.appendChild(levelStat);
    container.appendChild(speedStat);
    container.appendChild(scoreStat);

    return container;
}

