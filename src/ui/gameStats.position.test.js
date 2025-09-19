
import { test } from "node:test";
import assert from "node:assert";
import { JSDOM } from "jsdom";
import { drawGameStatsPanel } from "./gameStats.js";
import fs from "fs";

test("should position the game stats panel at the top right of the page", () => {
    const css = fs.readFileSync("src/ui/gameStats.css", "utf8");
    const dom = new JSDOM(`<!DOCTYPE html><html><head><style>${css}</style></head><body></body></html>`, { resources: "usable" });
    global.document = dom.window.document;

    const gameState = {
        level: 1,
        speed: 1,
        foodPos: null,
        foodConsumption: 0,
        walls: [],
    };

    const panel = drawGameStatsPanel(gameState);
    document.body.appendChild(panel);

    assert.strictEqual(panel.style.top, "10px", "Panel should be 10px from the top");
    assert.strictEqual(panel.style.right, "10px", "Panel should be 10px from the right");
});
