import * as args from "../utils/args.js"

const objectDim /* @type {BlockDimensions} */ = {
    w: 10,
    h: 10
}

/** 
 *  @param {CanvasRenderingContext2D} ctx 
 *  @param {boolean} collidable 
 *  @returns {Collidable}
 */
export function renderObject(ctx, collidable) {
    const dims /** @type {BlockDimensions} */ = args.canvasDimensions();
    const boundary /** {number} */ = 20;
    const objOrientation = Math.random() < 0.5;

    let renderPos /* @type {Pos} */;

    renderPos = withBoundsWalls(dims, objOrientation);

    ctx.fillStyle = (collidable ? "red" : "green");
    ctx.fillRect(renderPos.x, renderPos.y, renderPos.w, renderPos.h);

    return { pos: renderPos, collidable: collidable };
}

/*
 * @param {BlockDimensions} dims
 * @param {number} objOrientation
 * @returns {Pos}
 */
function withBoundsWalls(dims, objOrientation) {
    let wall /* @type {Pos} */;
    do {
        wall = {
            x: randInt(dims.w, dims.x), 
            y: randInt(dims.h, dims.y),
            w: objOrientation ? objectDim.w : randInt(dims.w, dims.x),
            h: objOrientation ? randInt(dims.h, dims.y) : objectDim.h,
        };
        console.log('wall: ', wall)
    } while (wall.x + wall.w >= dims.w && wall.y + wall.h >= dims.h) 

    return wall;
}

/**
 * @param {Pos} headPos 
 * @param {Collidable} objPos 
 * @returns {boolean} collisionDetected
 */
export function collisionDetection(headPos, objPos) {
    if (objPos === undefined) return false;
    if (!objPos || !objPos.collidable) return false;

    if (headPos.x < objPos.pos.x + objPos.pos.w
        && headPos.x + headPos.w > objPos.pos.x
        && headPos.y < objPos.pos.y + objPos.pos.h
        && headPos.y + headPos.h > objPos.pos.y) {
			return true;
		}

    return false;
}

/**
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Pos} objPos 
 * @param {boolean} wall 
 */
export function drawObstacle(ctx, objPos, wall) {
    ctx.fillStyle = (wall ? "red" : "green");
    ctx.fillRect(objPos.x, objPos.y, objPos.w, objPos.h);
}

/**
* @param {number} max 
* @param {number} min 
* @returns {number}
*/
export function randInt(max, min) {
    return Math.floor(Math.random() * (max - min) + min)
}
