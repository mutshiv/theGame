import { test } from "node:test";
import assert from "node:assert";
import { collisionDetection } from "../src/objects/wall.js";

/** @typedef {{x: number, y: number, w: number, h: number}} Position */
/** @typedef {{pos: Position, collidable: boolean}} Collidable */

test("it should not collide", () => {
    const foodPos /** @type {Position} */ = {
        x: 100,
        y: 100,
        w: 10,
        h: 100
    }
    const obj /** @type {Collidable} */ = {
        pos: {
            x: 120,
            y: 100,
            w: 10,
            h: 100,
        },
        collidable: false
    }

    const result = collisionDetection(foodPos, obj);
    assert.strictEqual(false, result);
});

test("it should collide", () => {
    const foodPos /** @type {Position} */ = {
        x: 100,
        y: 100,
        w: 10,
        h: 100
    }
    const obj /** @type {Collidable} */ = {
        pos: {
            x: 100,
            y: 100,
            w: 10,
            h: 100,
        },
        collidable: true
    }

    const result = collisionDetection(foodPos, obj);
    assert.strictEqual(true, result);
});

test("snake head should not pass through its body", () => {
    // Helper function to create a collidable object
    const makeCollidable = (pos) => ({ pos, collidable: true });

    // Test 1: Head not colliding with body (should return false)
    const head1 = { x: 100, y: 100, w: 10, h: 10 };
    const body1 = { x: 70, y: 100, w: 10, h: 10 };
    assert.strictEqual(
        collisionDetection(head1, makeCollidable(body1)),
        false,
        "Head should not collide with body segment when far away"
    );

    // Test 2: Head exactly on top of body (should return true)
    const head2 = { x: 70, y: 100, w: 10, h: 10 };
    assert.strictEqual(
        collisionDetection(head2, makeCollidable(body1)),
        true,
        "Head should collide when exactly on top of body segment"
    );

    // Test 3: Head overlapping with body (should return true)
    const head3 = { x: 75, y: 100, w: 10, h: 10 };
    assert.strictEqual(
        collisionDetection(head3, makeCollidable(body1)),
        true,
        "Head should collide when overlapping body segment"
    );

    // Test 3b: Head touching body edge exactly (should return false with strict AABB)
    // body1: [70,80); headTouch: [80,90) -> edges touch at x=80, no overlap
    const headTouch = { x: 80, y: 100, w: 10, h: 10 };
    assert.strictEqual(
        collisionDetection(headTouch, makeCollidable(body1)),
        false,
        "Head should NOT collide when just touching the body edge"
    );

    // Test 4: Head next to but not touching body (should return false)
    const head4 = { x: 81, y: 100, w: 10, h: 10 };
    assert.strictEqual(
        collisionDetection(head4, makeCollidable(body1)),
        false,
        "Head should not collide when next to but not touching body segment"
    );
});

test("game stops when head collides with own body", () => {
    // We'll simulate "game stops" by computing a self-collision boolean.
    const makeCollidable = (pos) => ({ pos, collidable: true });
    const selfCollision = (head, body) => body.some(seg => collisionDetection(head, makeCollidable(seg)));

    const head = { x: 100, y: 100, w: 10, h: 10 };
    const body = [
        { x: 50, y: 100, w: 10, h: 10 },
        { x: 60, y: 100, w: 10, h: 10 },
        { x: 70, y: 100, w: 10, h: 10 }
    ];

    // No overlap initially -> game continues
    assert.strictEqual(selfCollision(head, body), false, "Game should continue when head is not touching body");

    // Move head onto a body segment -> collision -> game should stop
    head.x = 70; head.y = 100;
    assert.strictEqual(selfCollision(head, body), true, "Game should stop when head collides with its body");
});
