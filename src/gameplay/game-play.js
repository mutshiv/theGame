let gamePlay /** @type {GameState} */;

/*
 * @returns {GameState}
*/
export function initializeGameState() {
    gamePlay = {
        level: 1,
        speed: 1,
        lives: 1,
        walls: [{
            pos: {},
            collidable: true
        }],
        food: []
    }
    return gamePlay
}

/**
 *
*/
function interception(){
}
