import * as Objects from "../objects/wall.js";

/**
 * @returns {GameState} gameState
*/
export function initializeGameState() {
    return {
        level: 0,
        speed: 1,
        foodPos: null,
        foodConsumption: 0,
        walls: [],
    }
}

/**
 * @param {GameState} gs 
 * @param {CanvasRenderingContext2D} ctx 
 * @returns {GameState} gs
 */
export function levelRender(gs, ctx) {
    gs.speed += 0.5;

    if (gs.level > 3) {
        interception(gs, ctx);
    }

    return gs;
}

/**
 * @param {GameState} gs
 * @param {CanvasRenderingContext2D} ctx 
*/
function interception(gs, ctx) {
    let newObstacle /** @type Collidable */;
    let overlapping;

    do {
        newObstacle = Objects.renderObject(ctx, true);
        overlapping = gs.walls.some(obstacle =>
            Objects.collisionDetection(newObstacle.pos, obstacle.pos)
        ) || Objects.collisionDetection(newObstacle.pos, gs.foodPos);
    } while (overlapping);

    gs.walls.push(newObstacle);
}

/**
 * @param {Pos} snake[]
 * @returns {boolean}
 */
export function selfCannibalism(snake) {
    const minSnakeLength = 10;
    if (snake.length < minSnakeLength)
        return false;

    for (let i = minSnakeLength; i < snake.length; i++) {
        if (Objects.collisionDetection(snake[0], {pos: snake[i], collidable: true}))
            return true;
    }

    return false;
}
