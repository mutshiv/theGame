import { test } from "node:test";
import assert from "node:assert";

test("boundary collision detection with snake head beyond canvas boundaries", () => {
    // Canvas dimensions and position from the game
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

    // Test case 1: Head moves beyond left boundary (canvas starts at x=500)
    const headBeyondLeft = { x: 495, y: 200, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headBeyondLeft), true,
        "Snake head at x=495 should trigger boundary collision (beyond left edge at cx=500)");

    // Test case 2: Head moves beyond right boundary (canvas ends at 500+1000-10=1490)
    const headBeyondRight = { x: 1491, y: 200, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headBeyondRight), true,
        "Snake head at x=1491 should trigger boundary collision (beyond right edge at 1490)");

    // Test case 3: Head moves beyond top boundary (canvas starts at y=100)
    const headBeyondTop = { x: 700, y: 95, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headBeyondTop), true,
        "Snake head at y=95 should trigger boundary collision (beyond top edge at cy=100)");

    // Test case 4: Head moves beyond bottom boundary (canvas ends at 100+500-10=590)
    const headBeyondBottom = { x: 700, y: 595, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headBeyondBottom), true,
        "Snake head at y=595 should trigger boundary collision (beyond bottom edge at 590)");

    // Test case 5: Head exactly at boundary limits (should NOT collide)
    const headAtLeftLimit = { x: cx, y: 200, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headAtLeftLimit), false,
        "Snake head at x=500 should NOT trigger collision (at left boundary)");

    const headAtRightLimit = { x: cx + canvasWidth - size, y: 200, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headAtRightLimit), false,
        "Snake head at x=1490 should NOT trigger collision (at right boundary limit)");

    const headAtTopLimit = { x: 700, y: cy, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headAtTopLimit), false,
        "Snake head at y=100 should NOT trigger collision (at top boundary)");

    const headAtBottomLimit = { x: 700, y: cy + canvasHeight - size, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headAtBottomLimit), false,
        "Snake head at y=590 should NOT trigger collision (at bottom boundary limit)");

    // Test case 6: Head well within bounds
    const headInCenter = { x: 750, y: 300, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headInCenter), false,
        "Snake head in center of canvas should NOT trigger collision");

    console.log("✅ All boundary collision tests passed!");
});

test("simulate snake movement hitting boundaries", () => {
    // Simulate actual game scenario with correct canvas positioning
    const canvasWidth = 1000;
    const canvasHeight = 500;
    const cx = 500; // Canvas x offset
    const cy = 100; // Canvas y offset
    const size = 10;
    const speed = 3;

    // Starting position (like in the game) - at canvas left edge
    let snake = [{ x: cx, y: cy + 100, w: size, h: size }];
    let direction = "left";
    let gameRunning = true;

    const moveSnake = () => {
        if (!gameRunning) return;

        const head = { ...snake[0] };

        // Apply movement (like in moveSnake function)
        if (direction === "up") head.y -= speed;
        else if (direction === "down") head.y += speed;
        else if (direction === "left") head.x -= speed;
        else if (direction === "right") head.x += speed;

        // Check boundary collision BEFORE adding head (using correct canvas bounds)
        if (head.x < cx || head.x > cx + canvasWidth - size ||
            head.y < cy || head.y > cy + canvasHeight - size) {
            console.log('Game Over: Hit boundary! Head position:', head);
            gameRunning = false;
            return false; // Collision detected
        }

        snake.unshift(head);
        snake.pop(); // Remove tail (no growth)
        return true; // No collision
    };

    // Test moving left until hitting boundary
    let moveCount = 0;
    const maxMoves = 200; // Prevent infinite loop

    while (gameRunning && moveCount < maxMoves) {
        const moved = moveSnake();
        moveCount++;

        if (!moved) {
            break; // Hit boundary
        }
    }

    // Should have stopped due to boundary collision
    assert.strictEqual(gameRunning, false, "Game should have stopped due to boundary collision");

    // The head should have triggered boundary collision (x < cx for left boundary)
    // But since we return before adding it, the snake array still has the previous position
    console.log("Final snake head position:", snake[0]);
    console.log(`Expected: head should have tried to go to x < ${cx} and triggered collision`);

    console.log(`✅ Snake hit boundary after ${moveCount} moves. Final head position:`, snake[0]);
});