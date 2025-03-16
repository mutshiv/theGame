import * as Objects from "./objects/wall.js";

export class MovingCanvas extends HTMLElement {

    xyBlock /** @type block = {x: number, y: number} */ = {
        x: 50,
        y: 50,
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        let handleNumber = 0;
        let paused /** @param boolean */ = false

        const canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 400;
        this.shadowRoot.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        let direction = "right";
        let speed = 1;
        let growthCounter = 0;

        let snake = [this.xyBlock, this.xyBlock, this.xyBlock, this.xyBlock, this.xyBlock,
        this.xyBlock, this.xyBlock, this.xyBlock, this.xyBlock, this.xyBlock, this.xyBlock,
        this.xyBlock, this.xyBlock, this.xyBlock, this.xyBlock,];

        const size = 10;

        function draw() {

            ctx.fillStyle = "grey";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "black";
            snake.forEach((segment) => {
                ctx.fillRect(segment.x, segment.y, size, size);
            });

            Objects.renderWall(ctx);

            moveSnake();
            handleNumber = requestAnimationFrame(draw);
        }

        function moveSnake() {
            const head = { ...snake[0] };

            if (direction === "up") head.y -= speed;
            else if (direction === "down") head.y += speed;
            else if (direction === "left") head.x -= speed;
            else if (direction === "right") head.x += speed;

            head.x = Math.max(0, Math.min(canvas.width - size, head.x));
            head.y = Math.max(0, Math.min(canvas.height - size, head.y));

            snake.unshift(head);

            if (growthCounter % 10 !== 0) {
                snake.pop();
            }

            growthCounter++;
        }

        draw();

        window.addEventListener("keydown", (e) => {
            if (e.key === "ArrowUp" && direction !== "down") direction = "up";
            else if (e.key === "ArrowDown" && direction !== "up") direction = "down";
            else if (e.key === "ArrowLeft" && direction !== "right") direction = "left";
            else if (e.key === "ArrowRight" && direction !== "left") direction = "right";
            else if (e.key === ' ') {
                cancelAnimationFrame(handleNumber);
                console.log('Stopping the animation, animation handle is: ', handleNumber);
                paused = !paused;

                if (!paused) draw()
            }
        });
    }
}

customElements.define("moving-canvas", MovingCanvas);
