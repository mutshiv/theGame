/**
 * @param {Pos} pos
 * returns {Line}
 */
function posToLine(pos) {
  return {
    start: { x: pos.x, y: pos.y },
    end:   { x: pos.x + pos.w, y: pos.y + pos.h }
  };
}

/**
 * @param {Point} p
 * @param {Point} q
 * @param {Point} r
 *
 * @return {number}
 */
function orientation(p, q, r) {
  const val = (q.y - p.y) * (r.x - q.x) - 
              (q.x - p.x) * (r.y - q.y);

  if (val === 0) return 0;  // collinear
  return val > 0 ? 1 : 2;   // 1 = clockwise, 2 = counterclockwise
}

/**
 * @param {Point} p
 * @param {Point} q
 * @returns {boolean}
 */
function onSegment(p, q, r) {
  return (
    q.x <= Math.max(p.x, r.x) &&
    q.x >= Math.min(p.x, r.x) &&
    q.y <= Math.max(p.y, r.y) &&
    q.y >= Math.min(p.y, r.y)
  );
}

/**
 * @param {Line} l1
 * @param {Line} l2
 * @returns {boolean}
 */
function doIntersect(l1, l2){
    const { start: p1, end: q1 } = l1;
    const { start: p2, end: q2 } = l2;

    const o1 = orientation(p1, q1, p2);
    const o2 = orientation(p1, q1, q2);
    const o3 = orientation(p2, q2, p1);
    const o4 = orientation(p2, q2, q1);

    // General case
    if (o1 !== o2 && o3 !== o4) return true;

    // Special cases: collinear + on segment
    if (o1 === 0 && onSegment(p1, p2, q1)) return true;
    if (o2 === 0 && onSegment(p1, q2, q1)) return true;
    if (o3 === 0 && onSegment(p2, p1, q2)) return true;
    if (o4 === 0 && onSegment(p2, q1, q2)) return true;

    return false;
}

/**
 * @param {Pos} newPos
 * @param {Pos} walls[]
 * @return {boolean}
 */
export function hasCollision(newPos, walls) {
    const newLine = posToLine(newPos);

    if(walls.length < 1)
        return false;

    for (const e of walls) {
        if (rectsOverlap(newLine, newPos)) {
          return true;
        }
    }
    return false;
}

/**
 * @param {Pos} a
 * @param {Pos} b
 *
 * @returns {boolean}
 */
function rectsOverlap(a, b) {
  return !(
    a.x + a.w <= b.x || // a is left of b
    b.x + b.w <= a.x || // a is right of b
    a.y + a.h <= b.y || // a is above b
    b.y + b.h <= a.y    // a is below b
  );
}
