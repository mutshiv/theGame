import * as Objects from "../objects/wall.js";
let gamePlay /** @type {GameState} */;

/**
 * @returns {GameState}
*/
export function initializeGameState() {
    gamePlay = {
        level: 1,
        speed: 1,
        foodPos: null,
        foodConsumption: 0,
        walls: [],
    }
    return gamePlay
}

/**
 * @param {GameState} gs 
 * @param {CanvasRenderingContext2D} ctx 
 * @returns {GameState} gs
 */
export function levelRender(gs, ctx) {
    gs.level++;
    gs.speed += 0.5;

    if (gs.level > 1) {
        interception(gs, ctx);
    }

    console.log(`Level Up! Now at Level ${gs.level}, Speed: ${gs.speed}`);
    return gs;
}

/**
 * @param {GameState} gs
 * @param {CanvasRenderingContext2D} ctx 
*/
function interception(gs, ctx) {
    let newObstacle;
    let overlapping;

    do {
        newObstacle = Objects.renderObject(ctx, true);
        overlapping = gs.walls.some(obstacle =>
            Objects.collisionDetection(newObstacle.pos, obstacle.pos)
        ) || Objects.collisionDetection(newObstacle.pos, gs.foodPos);
    } while (overlapping);

    gs.walls.push(newObstacle);
}
