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

    modal.appendChild(drawGameOverContent(gs));
    overlay.appendChild(modal);

    return overlay;
}

/**
 * @param {GameState} gs
 * @returns {HTMLElement}
 */
function drawGameOverContent(gs) {
    const container = document.createElement('div');

    const title = document.createElement('h1');
    title.textContent = 'GAME OVER';
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
    levelLabel.textContent = `Level: ${Math.floor((gs.foodConsumption || 0) / 10) + 1}`;
    levelLabel.style.margin = '10px 0';

    const speedLabel = document.createElement('p');
    speedLabel.textContent = `Speed: ${gs.speed}`;
    speedLabel.style.margin = '10px 0';

    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Game';
    restartButton.style.background = '#ff4444';
    restartButton.style.color = 'white';
    restartButton.style.border = 'none';
    restartButton.style.padding = '15px 30px';
    restartButton.style.fontSize = '1.1em';
    restartButton.style.borderRadius = '5px';
    restartButton.style.cursor = 'pointer';
    restartButton.style.marginTop = '20px';
    restartButton.style.transition = 'background 0.3s ease';

    restartButton.addEventListener('mouseenter', () => {
        restartButton.style.background = '#ff6666';
    });

    restartButton.addEventListener('mouseleave', () => {
        restartButton.style.background = '#ff4444';
    });

    restartButton.addEventListener('click', () => {
        window.location.reload();
    });

    stats.appendChild(scoreLabel);
    stats.appendChild(levelLabel);
    stats.appendChild(speedLabel);

    container.appendChild(title);
    container.appendChild(stats);
    container.appendChild(restartButton);

    return container;
}