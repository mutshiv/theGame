import { MovingCanvas } from "./moving-canvas.js";

document.addEventListener("DOMContentLoaded", () => {
    const canvasElement = document.createElement("moving-canvas");
    canvasElement.className = 'canvas';
    document.body.appendChild(canvasElement);
});
