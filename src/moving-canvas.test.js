
import { test } from "node:test";
import assert from "node:assert";

test("should detect boundary collision for snake head", () => {
    // Test boundary collision detection logic
    const canvasWidth = 1000;
    const canvasHeight = 500;
    const size = 10;

    // Test function that mimics the boundary check in moveSnake()
    const checkBoundaryCollision = (head) => {
        return head.x < 0 || head.x >= canvasWidth - size ||
               head.y < 0 || head.y >= canvasHeight - size;
    };

    // Test case 1: Head at left boundary (should collide)
    const headAtLeftBoundary = { x: -1, y: 100, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headAtLeftBoundary), true, "Should collide with left boundary");

    // Test case 2: Head at right boundary (should collide)
    const headAtRightBoundary = { x: canvasWidth - size, y: 100, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headAtRightBoundary), true, "Should collide with right boundary");

    // Test case 3: Head at top boundary (should collide)
    const headAtTopBoundary = { x: 100, y: -1, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headAtTopBoundary), true, "Should collide with top boundary");

    // Test case 4: Head at bottom boundary (should collide)
    const headAtBottomBoundary = { x: 100, y: canvasHeight - size, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headAtBottomBoundary), true, "Should collide with bottom boundary");

    // Test case 5: Head within bounds (should not collide)
    const headWithinBounds = { x: 100, y: 100, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headWithinBounds), false, "Should not collide when within bounds");

    // Test case 6: Head at exact boundary edge (should not collide)
    const headAtEdge = { x: 0, y: 0, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headAtEdge), false, "Should not collide at exact boundary edge");
});
