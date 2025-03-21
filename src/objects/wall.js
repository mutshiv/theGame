
const objectDim /* @type {BlockDimensions} */ = {
    w: 10,
    h: 50
}

/** @param {CanvasRenderingContext2D} ctx 
 *  @param {boolean} collidable 
 * @returns {Collidable}
 */
export function renderObject(ctx, collidable) {
    const renderPos /* @type {Pos} */ = {
        x: randInt(750, 1),
        y: randInt(400, 50),
        w: objectDim.w,
        h: randInt(250, 50),
    }
    ctx.fillStyle = (collidable ? "red" : "green");
    ctx.fillRect(renderPos.x, renderPos.y, renderPos.w, renderPos.h);

    return { pos: renderPos, collidable: collidable };
}

/**
 * @param {Pos} headPos 
 * @param {Collidable} objPos 
 * @returns {boolean}
 */
export function collisionDetection(headPos, objPos) {
    if (objPos === undefined) return false;
    if (!objPos || !objPos.collidable) return false;

    if (headPos.x < objPos.pos.x + objPos.pos.w &&
        headPos.x + headPos.w > objPos.pos.x &&
        headPos.y < objPos.pos.y + objPos.pos.h &&
        headPos.y + headPos.h > objPos.pos.y && objPos.collidable) {
        return true;
    }

    return false;
}

/**
 * @returns {Collidable} collidable
 */
export function drawObstacle() {
}

/**
* @param {number} max 
* @param {number} min 
* @returns {number}
*/
function randInt(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
