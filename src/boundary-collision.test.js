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
        return head.x < cx || head.x >= canvasWidth - size ||
               head.y < cy || head.y >= canvasHeight - size;
    };

    // Test case 1: Head moves beyond left boundary (canvas starts at x=500)
    const headBeyondLeft = { x: 495, y: 200, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headBeyondLeft), true,
        "Snake head at x=495 should trigger boundary collision (beyond left edge at cx=500)");

    // Test case 2: Head moves beyond right boundary (canvas width=1000, collision at x>=990)
    const headBeyondRight = { x: 990, y: 200, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headBeyondRight), true,
        "Snake head at x=990 should trigger boundary collision (>= 1000-10)");

    // Test case 3: Head moves beyond top boundary (canvas starts at y=100)
    const headBeyondTop = { x: 700, y: 95, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headBeyondTop), true,
        "Snake head at y=95 should trigger boundary collision (beyond top edge at cy=100)");

    // Test case 4: Head moves beyond bottom boundary (canvas height=500, collision at y>=490)
    const headBeyondBottom = { x: 700, y: 490, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headBeyondBottom), true,
        "Snake head at y=490 should trigger boundary collision (>= 500-10)");

    // Test case 5: Head exactly at boundary limits (should NOT collide)
    const headAtLeftLimit = { x: cx, y: 200, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headAtLeftLimit), false,
        "Snake head at x=500 should NOT trigger collision (at left boundary)");

    const headAtRightLimit = { x: canvasWidth - size - 1, y: 200, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headAtRightLimit), false,
        "Snake head at x=989 should NOT trigger collision (< 990 boundary)");

    const headAtTopLimit = { x: 700, y: cy, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headAtTopLimit), false,
        "Snake head at y=100 should NOT trigger collision (at top boundary)");

    const headAtBottomLimit = { x: 700, y: canvasHeight - size - 1, w: size, h: size };
    assert.strictEqual(checkBoundaryCollision(headAtBottomLimit), false,
        "Snake head at y=489 should NOT trigger collision (< 490 boundary)");

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
        if (head.x < cx || head.x >= canvasWidth - size ||
            head.y < cy || head.y >= canvasHeight - size) {
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

test("verify canvas dimensions match boundary calculations", () => {
    // Test that our boundary logic matches actual canvas positioning
    const canvasWidth = 1000;
    const canvasHeight = 500;
    const cx = 500; // Canvas x offset (from args.js)
    const cy = 100; // Canvas y offset (from args.js)
    const size = 10;

    // Calculate boundary limits
    const leftBoundary = cx; // 500
    const rightBoundary = canvasWidth - size; // 1000 - 10 = 990
    const topBoundary = cy; // 100
    const bottomBoundary = canvasHeight - size; // 500 - 10 = 490

    console.log("Canvas boundaries:");
    console.log(`Left: ${leftBoundary}, Right: ${rightBoundary}`);
    console.log(`Top: ${topBoundary}, Bottom: ${bottomBoundary}`);
    console.log(`Canvas spans from (${cx}, ${cy}) to (${cx + canvasWidth}, ${cy + canvasHeight})`);
    console.log(`Valid snake positions: x[${leftBoundary}-${rightBoundary-1}], y[${topBoundary}-${bottomBoundary-1}]`);

    // Test exact boundary positions
    assert.strictEqual(leftBoundary, 500, "Left boundary should be 500");
    assert.strictEqual(rightBoundary, 990, "Right boundary should be 990");
    assert.strictEqual(topBoundary, 100, "Top boundary should be 100");
    assert.strictEqual(bottomBoundary, 490, "Bottom boundary should be 490");

    // Test boundary function
    const checkBoundaryCollision = (head) => {
        return head.x < cx || head.x >= canvasWidth - size ||
               head.y < cy || head.y >= canvasHeight - size;
    };

    // Test positions that should be valid (just inside bounds)
    assert.strictEqual(checkBoundaryCollision({x: 500, y: 100}), false, "Position (500,100) should be valid");
    assert.strictEqual(checkBoundaryCollision({x: 989, y: 489}), false, "Position (989,489) should be valid");

    // Test positions that should be invalid (just outside bounds)
    assert.strictEqual(checkBoundaryCollision({x: 499, y: 100}), true, "Position (499,100) should be invalid");
    assert.strictEqual(checkBoundaryCollision({x: 990, y: 100}), true, "Position (990,100) should be invalid");
    assert.strictEqual(checkBoundaryCollision({x: 500, y: 99}), true, "Position (500,99) should be invalid");
    assert.strictEqual(checkBoundaryCollision({x: 500, y: 490}), true, "Position (500,490) should be invalid");

    console.log("✅ Canvas dimension and boundary calculation tests passed!");
});

test("boundary collision with 100x100 canvas at offset (50,50)", () => {
    // Test a smaller canvas example: canvas 100x100 at offset 50,50
    const canvasWidth = 100;
    const canvasHeight = 100;
    const cx = 50; // Canvas x offset
    const cy = 50; // Canvas y offset
    const size = 10;

    // Calculate boundary limits for this scenario
    const leftBoundary = cx; // 50
    const rightBoundary = canvasWidth - size; // 100 - 10 = 90
    const topBoundary = cy; // 50
    const bottomBoundary = canvasHeight - size; // 100 - 10 = 90

    console.log("100x100 Canvas at offset (50,50) boundaries:");
    console.log(`Left: ${leftBoundary}, Right: ${rightBoundary}`);
    console.log(`Top: ${topBoundary}, Bottom: ${bottomBoundary}`);
    console.log(`Valid snake positions: x[${leftBoundary}-${rightBoundary}], y[${topBoundary}-${bottomBoundary}]`);

    const checkBoundaryCollision = (head) => {
        return head.x < cx || head.x >= canvasWidth - size ||
               head.y < cy || head.y >= canvasHeight - size;
    };

    // Test positions that should be valid (just inside bounds)
    assert.strictEqual(checkBoundaryCollision({x: 50, y: 50}), false, "Position (50,50) should be valid - top-left corner");
    assert.strictEqual(checkBoundaryCollision({x: 89, y: 50}), false, "Position (89,50) should be valid - top-right corner");
    assert.strictEqual(checkBoundaryCollision({x: 50, y: 89}), false, "Position (50,89) should be valid - bottom-left corner");
    assert.strictEqual(checkBoundaryCollision({x: 89, y: 89}), false, "Position (89,89) should be valid - bottom-right corner");

    // Test positions that should be invalid (just outside bounds)
    assert.strictEqual(checkBoundaryCollision({x: 49, y: 50}), true, "Position (49,50) should be invalid - beyond left edge");
    assert.strictEqual(checkBoundaryCollision({x: 90, y: 50}), true, "Position (90,50) should be invalid - beyond right edge");
    assert.strictEqual(checkBoundaryCollision({x: 50, y: 49}), true, "Position (50,49) should be invalid - beyond top edge");
    assert.strictEqual(checkBoundaryCollision({x: 50, y: 90}), true, "Position (50,90) should be invalid - beyond bottom edge");

    // Test exact boundary positions
    assert.strictEqual(rightBoundary, 90, "Right boundary should be at x=90");
    assert.strictEqual(bottomBoundary, 90, "Bottom boundary should be at y=90");

    console.log("✅ 100x100 canvas boundary tests passed! Snake stays within visual bounds.");
});