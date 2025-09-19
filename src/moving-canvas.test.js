
import { test } from "node:test";
import assert from "node:assert";

test("should detect boundary collision for snake head", () => {
    // Test boundary collision detection logic with correct canvas positioning
    const canvasWidth = 1000;
    const canvasHeight = 500;
    const cx = 500; // Canvas x offset
    const cy = 100; // Canvas y offset
    const size = 10;

    // Test function that mimics the boundary check in moveSnake()
    const checkBoundaryCollision = (head) => {
        return head.x < cx || head.x > cx + canvasWidth - size ||
               head.y < cy || head.y > cy + canvasHeight - size;
    };

    // Test case 1: Head beyond left boundary (should collide)
    const headAtLeftBoundary = { x: cx - 1, y: cy + 50, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headAtLeftBoundary), true, "Should collide with left boundary");

    // Test case 2: Head beyond right boundary (should collide)
    const headAtRightBoundary = { x: cx + canvasWidth - size + 1, y: cy + 50, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headAtRightBoundary), true, "Should collide with right boundary");

    // Test case 3: Head beyond top boundary (should collide)
    const headAtTopBoundary = { x: cx + 100, y: cy - 1, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headAtTopBoundary), true, "Should collide with top boundary");

    // Test case 4: Head beyond bottom boundary (should collide)
    const headAtBottomBoundary = { x: cx + 100, y: cy + canvasHeight - size + 1, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headAtBottomBoundary), true, "Should collide with bottom boundary");

    // Test case 5: Head within bounds (should not collide)
    const headWithinBounds = { x: cx + 100, y: cy + 100, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headWithinBounds), false, "Should not collide when within bounds");

    // Test case 6: Head at exact boundary edge (should not collide)
    const headAtEdge = { x: cx, y: cy, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headAtEdge), false, "Should not collide at exact boundary edge");

    // Test case 7: Head at rightmost valid position (should not collide)
    const headAtRightEdge = { x: cx + canvasWidth - size, y: cy + 100, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headAtRightEdge), false, "Should not collide at rightmost valid position");

    // Test case 8: Head at bottommost valid position (should not collide)
    const headAtBottomEdge = { x: cx + 100, y: cy + canvasHeight - size, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headAtBottomEdge), false, "Should not collide at bottommost valid position");
});
