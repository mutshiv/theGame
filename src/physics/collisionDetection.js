/**
 * @param {Pos} newPos
 * @param {Pos} walls[]
 *
 * @return {boolean}
 */
export function hasCollision(newPos, walls) {
    if(walls.length < 1)
        return false;

    for (const e of walls) {
        if (rectsOverlap(newPos, e, 10)) {
          return true;
        }
    }
    return false;
}

/**
 * @param {Pos} a
 * @param {Pos} b
 * @param {number} b
 *
 * @returns {boolean}
 */
function rectsOverlap(a, b, gap) {
  return !(
    a.x + a.w + gap <= b.x || // a is left of b
    b.x + b.w + gap <= a.x || // a is right of b
    a.y + a.h + gap <= b.y || // a is above b
    b.y + b.h + gap <= a.y    // a is below b
  );
}
