import * as Objects from "./objects/wall.js";
import * as GameState from "./gameplay/game-play.js";
import * as args from "./utils/args.js";
import * as UI from "./ui/gameStats.js";

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
        let food /** @type {Collidable} */;
        let gameState /** @type {GameState} */;
        let cx /** @type {number} */ = this.dims.x;
        let cy /** @type {number} */ = this.dims.y;

        const canvas = document.createElement("canvas");
        canvas.width = this.dims.w;
        canvas.height = this.dims.h;
        canvas.xmin = cx;
        canvas.ymin = cy;

        this.shadowRoot.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        this.direction = "right";
        this.snake = [this.xyBlock];
        this.handleNumber = 0;

        const size = 10;

        const draw = () => {
            ctx.fillStyle = "grey";
            ctx.fillRect(cx, cy, canvas.width, canvas.height);

            ctx.fillStyle = "black";
            this.snake.forEach((segment) => {
                ctx.fillRect(segment.x, segment.y, size, size);
            });

            gameState.walls.forEach(obstacle => {
                Objects.drawObstacle(ctx, obstacle.pos, true);
            });

            if (food) {
                Objects.drawObstacle(ctx, food.pos, false)
            }

            this.handleNumber = requestAnimationFrame(draw);
            moveSnake();
        }

        const moveSnake = () => {
            const head = { ...this.snake[0] };

            if (this.direction === "up") head.y -= gameState.speed;
            else if (this.direction === "down") head.y += gameState.speed;
            else if (this.direction === "left") head.x -= gameState.speed;
            else if (this.direction === "right") head.x += gameState.speed;

            gameState.walls.forEach(wall => {
                if (Objects.collisionDetection(head, wall))
                    this.handleNumber = cancelAnimationFrame(this.handleNumber);
            });

            if (GameState.selfCannibalism(this.snake)) {
                this.handleNumber = cancelAnimationFrame(this.handleNumber);
            }

            if (food && Objects.collisionDetection(head, food)) {
                gameState.foodConsumption++;
                gameState.food = food;
                this.snake.unshift({ ...this.snake[0] });

                renderFood();

                if (gameState.foodConsumption % 10 === 0) {
                    gameState = GameState.levelRender(gameState, ctx);
                }
                console.log('GameState', gameState, 'foodConsumption count', gameState.foodConsumption, 'Snake pos:', this.snake);
            } else {
                this.snake.pop();
            }

<<<<<<< Updated upstream
            if (head.x < cx || head.x > canvas.width - size + cx || head.y < cy || head.y > canvas.height - size + cy) {
                return this.handleNumber = cancelAnimationFrame(this.handleNumber);
=======
            if (head.x < 0 || head.x >= canvas.width - size ||
                head.y < 0 || head.y >= canvas.height - size) {
                console.log('Game Over: Hit boundary!');
                cancelAnimationFrame(handleNumber);
                return;
>>>>>>> Stashed changes
            }

            this.snake.unshift(head);
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
        this.shadowRoot.appendChild(UI.drawGameStatsPanel(gameState));

        draw();
        renderFood();

        window.addEventListener("keydown", (e) => {
            if (e.key === "ArrowUp" && this.direction !== "down") this.direction = "up";
            else if (e.key === "ArrowDown" && this.direction !== "up") this.direction = "down";
            else if (e.key === "ArrowLeft" && this.direction !== "right") this.direction = "left";
            else if (e.key === "ArrowRight" && this.direction !== "left") this.direction = "right";
            else if (e.key === ' ') {
                this.handleNumber = cancelAnimationFrame(this.handleNumber);
                console.log('Stopping the animation, animation handle is: ', this.handleNumber);
                paused = !paused;

                if (!paused) {
                    draw();
                }
            }
        });
    }
}

customElements.define("moving-canvas", MovingCanvas);
