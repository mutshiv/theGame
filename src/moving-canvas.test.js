
import { test } from "node:test";
import assert from "node:assert";
import { JSDOM } from "jsdom";
import { MovingCanvas } from "./moving-canvas.js";

test("should stop the game when the snake hits the left boundary", () => {
    const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
    global.document = dom.window.document;
    global.window = dom.window;
    global.document = dom.window.document;
    global.HTMLElement = dom.window.HTMLElement;
    global.customElements = dom.window.customElements;
    global.requestAnimationFrame = (fn) => {
        fn();
        return 1;
    };
    global.cancelAnimationFrame = (handle) => {
        return 0;
    };

    const canvasElement = new MovingCanvas();
    document.body.appendChild(canvasElement);

    canvasElement.direction = "left";
    canvasElement.snake = [{ x: 500, y: 100, w: 10, h: 10 }];
    canvasElement.moveSnake();

    assert.strictEqual(canvasElement.handleNumber, 0);
});
