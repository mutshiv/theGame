import { test } from "node:test";
import assert from "node:assert";
import { JSDOM } from "jsdom";
import { drawGameStatsPanel, updateStats } from "../src/ui/gameStats.js";
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

test("should update the game stats panel when updateStats is called", () => {
    const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
    global.document = dom.window.document;

    const initialGameState = {
        level: 1,
        speed: 1,
        foodConsumption: 0,
    };

    const panel = drawGameStatsPanel(initialGameState);
    document.body.appendChild(panel);

    const updatedGameState = {
        level: 2,
        speed: 5,
        foodConsumption: 10,
    };

    updateStats(updatedGameState);

    const levelStat = document.getElementById('level');
    const speedStat = document.getElementById('speedStat');
    const scoreStat = document.getElementById('score');

    assert.strictEqual(levelStat.textContent, "Level: 2", "Level should be updated to 2");
    assert.strictEqual(speedStat.textContent, "Speed: 5", "Speed should be updated to 5");
    assert.strictEqual(scoreStat.textContent, "Score: 10", "Score should be updated to 10");
});