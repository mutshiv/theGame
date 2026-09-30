import * as btns from "./button.js";

/**
 * @param {GameState} gameState
 * @returns {HTMLElement}
 */
export function drawGameOverModal(gs) {
    const overlay = document.createElement("div");
    overlay.className = "game-over-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "1000";

    const modal = document.createElement("div");
    modal.className = "game-over-modal";
    modal.style.background = "rgba(0, 0, 0, 0.9)";
    modal.style.color = "white";
    modal.style.padding = "40px";
    modal.style.borderRadius = "15px";
    modal.style.textAlign = "center";
    modal.style.border = "2px solid #ff4444";
    modal.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";
    modal.style.maxWidth = "400px";
    modal.style.width = "90%";

    modal.appendChild(drawGameOverContent(gs, false));
    overlay.appendChild(modal);

    return overlay;
}

/**
 * @param {GameState} gs
 * @param {boolean} isPlaying 
*
 * @returns {HTMLElement}
 */
function drawGameOverContent(gs, isPlaying) {
    const container = document.createElement('div');

    const title = document.createElement('h1');
    title.textContent = !isPlaying ? 'GAME OVER' : 'Game Play Paused';
    title.style.color = '#ff4444';
    title.style.fontSize = '2.5em';
    title.style.margin = '0 0 20px 0';
    title.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)';

    const stats = document.createElement('div');
    stats.style.margin = '20px 0';
    stats.style.fontSize = '1.2em';

    const scoreLabel = document.createElement('p');
    scoreLabel.textContent = `Score: ${gs.foodConsumption || 0}`;
    scoreLabel.style.margin = '10px 0';

    const levelLabel = document.createElement('p');
    levelLabel.textContent = `Level: ${gs.level}`;
    levelLabel.style.margin = '10px 0';

    const speedLabel = document.createElement('p');
    speedLabel.textContent = `Speed: ${gs.speed}`;
    speedLabel.style.margin = '10px 0';

    stats.appendChild(scoreLabel);
    stats.appendChild(levelLabel);
    stats.appendChild(speedLabel);

    container.appendChild(title);
    container.appendChild(stats);

    if(!isPlaying) {
        const restartButton = btns.btnGeneric(isPlaying, () => {
            window.location.reload();
        })
        container.appendChild(restartButton);
    }

    return container;
}

/**
 * @param {GameState} gameState
 * @param {boolean} paused
 * @returns {HTMLElement}
 */
export function drawGamePausedModal(gs, paused) {
    const overlay = document.createElement("div");
    overlay.className = "game-paused-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "1000";

    const modal = document.createElement("div");
    modal.className = "game-paused-modal";
    modal.style.background = "rgba(0, 0, 0, 0.9)";
    modal.style.color = "white";
    modal.style.padding = "40px";
    modal.style.borderRadius = "15px";
    modal.style.textAlign = "center";
    modal.style.border = "2px solid #ff4444";
    modal.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";
    modal.style.maxWidth = "400px";
    modal.style.width = "90%";

    if(paused) {
        modal.appendChild(drawGameOverContent(gs, paused));
        overlay.appendChild(modal);
    }

    return overlay;
}
