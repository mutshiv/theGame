import * as Objects from "./objects/wall.js";
import * as GameState from "./gameplay/game-play.js";
import * as args from "./utils/args.js";

export class MovingCanvas extends HTMLElement {

    dims /** @type {BlockDimensions} */ = args.canvasDimensions();
    xyBlock /** @type {Pos} */ = {
        x: this.dims.x,
        y: this.dims.y,
        w: 10,
        h: 10
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        let handleNumber /** @type {number} */ = 0;
        let paused /** @type boolean */ = false;
        let block /** @type {Collidable} */;
        let food /** @type {Collidable} */;
        let gameState /** @type {GameState} */;
        let cx /** @type {number} */ = this.dims.x;
        let cy /** @type {number} */ = this.dims.y;

        const canvas = document.createElement("canvas");
        canvas.width = this.dims.w;
        canvas.height = this.dims.h;

        this.shadowRoot.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        let direction = "right";
        let snake = [this.xyBlock];

        const size = 10;

        function draw() {
            ctx.fillStyle = "grey";
            ctx.fillRect(cx, cy, canvas.width, canvas.height);

            ctx.fillStyle = "black";
            snake.forEach((segment) => {
                ctx.fillRect(segment.x, segment.y, size, size);
            });

            gameState.walls.forEach(obstacle => {
                Objects.drawObstacle(ctx, obstacle.pos, true);
            });

            if (food) {
                Objects.drawObstacle(ctx, food.pos, false)
            }

            handleNumber = requestAnimationFrame(draw);
            moveSnake();
        }

        function moveSnake() {
            const head = { ...snake[0] };

            if (direction === "up") head.y -= gameState.speed;
            else if (direction === "down") head.y += gameState.speed;
            else if (direction === "left") head.x -= gameState.speed;
            else if (direction === "right") head.x += gameState.speed;

            gameState.walls.forEach(wall => {
                if (Objects.collisionDetection(head, wall))
                    cancelAnimationFrame(handleNumber);
            });

            if (food && Objects.collisionDetection(head, food)) {
                gameState.foodConsumption++;
                gameState.food = food;
                snake.unshift({ ...snake[0] });

                renderFood();

                if (gameState.foodConsumption % 10 === 0) {
                    gameState = GameState.levelRender(gameState, ctx);
                }
                console.log('GameState', gameState, 'foodConsumption count', gameState.foodConsumption);
            } else {
                snake.pop();
            }

            head.x = Math.max(0, Math.min(canvas.width - size, head.x));
            head.y = Math.max(0, Math.min(canvas.height - size, head.y));

            snake.unshift(head);
        }

        function renderFood() {
            food = {
                pos: {
                    x: Objects.randInt(canvas.width - 10, cx),
                    y: Objects.randInt(canvas.height - 10, cy),
                    w: size,
                    h: size
                },
                collidable: true
            };
        }
        gameState = GameState.initializeGameState();

        draw();
        renderFood();

        window.addEventListener("keydown", (e) => {
            if (e.key === "ArrowUp" && direction !== "down") direction = "up";
            else if (e.key === "ArrowDown" && direction !== "up") direction = "down";
            else if (e.key === "ArrowLeft" && direction !== "right") direction = "left";
            else if (e.key === "ArrowRight" && direction !== "left") direction = "right";
            else if (e.key === ' ') {
                cancelAnimationFrame(handleNumber);
                console.log('Stopping the animation, animation handle is: ', handleNumber);
                paused = !paused;

                if (!paused) {
                    draw();
                }
            }
        });
    }
}

customElements.define("moving-canvas", MovingCanvas);
