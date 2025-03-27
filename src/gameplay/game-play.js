let gamePlay /** @type {GameState} */;

/**
 * @returns {GameState}
*/
export function initializeGameState() {
    gamePlay = {
        level: 1,
        speed: 1,
        lives: 1,
        walls: [],
    }
    return gamePlay
}

/**
 * @param {GameState} gs 
 * @param {number} level 
 * @returns {GameState}
 */
export function levelRender(gs, level) {
    if (level % 10 === 0) {
        gs.level++;
        gs.speed += 0.5;
        return gs;
    }
    return gs;
}

/**
 * @param {GameState} gs
 * @param {Collidable} obstacle 
 * @returns {boolean}
*/
function interception(gs, obstacle) {
    gs.walls.forEach(w => {
        if (w.pos.x === obstacle.pos.x && w.pos.y === obstacle.pos.y) {
            return true;
        }
    });
    return false;
}
