import * as Objects from "./objects/wall.js";
import * as GameState from "./gameplay/game-play.js";
import * as args from "./utils/args.js";
import * as UI from "./ui/gameStats.js";
import * as GameOver from "./ui/gameOver.js";
import * as btn from "./ui/button.js";
import playIntroModern from "./gameplay/modern-intro.js";
import playIntroRetro from "./gameplay/retro-intro.js";

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
        let isPlaying /** @type boolean */ = false;

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

        const showGameOver = () => {
            const gameOverModal = GameOver.drawGameOverModal(gameState);
            document.body.appendChild(gameOverModal);
        };

        /**
         * this is actually a re-render.
         * it re-renders what has already be rendered before and adds new renders.
         */
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
                if (Objects.collisionDetection(head, wall)) {
                    this.handleNumber = cancelAnimationFrame(this.handleNumber);
                    showGameOver();
                }
            });

            if (GameState.selfCannibalism(this.snake)) {
                this.handleNumber = cancelAnimationFrame(this.handleNumber);
                showGameOver();
            }

            if (food && Objects.collisionDetection(head, food)) {
                gameState.foodConsumption++;
                gameState.food = food;
                this.snake.unshift({ ...this.snake[0] });

                renderFood();
                UI.updateStats(gameState, this.shadowRoot);

                if (gameState.foodConsumption % 2 === 0) {
                    gameState = GameState.levelRender(gameState, ctx);
                }
            } else {
                this.snake.pop();
            }

            // Check boundary collision BEFORE adding head to snake
            // Snake should stay completely within the grey rectangle
            if (head.x < cx || head.x >= canvas.width - size ||
                head.y < cy || head.y >= canvas.height - size) {
                this.handleNumber = cancelAnimationFrame(this.handleNumber);
                showGameOver();
                return;
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

        playIntroModern(ctx, canvas, draw)
        //playIntroRetro(ctx, canvas, draw)

        const btnStart = btn.btnStart(isPlaying, draw, renderFood);

        this.shadowRoot.appendChild(btnStart);

        window.addEventListener("keydown", (e) => {
            if (e.key === "ArrowUp" && this.direction !== "down") this.direction = "up";
            else if (e.key === "ArrowDown" && this.direction !== "up") this.direction = "down";
            else if (e.key === "ArrowLeft" && this.direction !== "right") this.direction = "left";
            else if (e.key === "ArrowRight" && this.direction !== "left") this.direction = "right";
            else if (e.key === ' ') {
                this.handleNumber = cancelAnimationFrame(this.handleNumber);
                paused = !paused;

                if (!paused) {
                    draw();
                }
            }
        });
    }
}

customElements.define("moving-canvas", MovingCanvas);


