import * as Objects from "./objects/wall.js";

export class MovingCanvas extends HTMLElement {

    xyBlock /** @type {Pos} */ = {
        x: 50,
        y: 50,
        w: 10,
        h: 10
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        let handleNumber = 0;
        let paused /** @type boolean */ = false
        let block /** @type {Collidable} */
        let food /** @type {Collidable} */

        const canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 400;
        this.shadowRoot.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        let direction = "right";
        let speed = 1;

        let snake = [this.xyBlock];

        const size = 10;

        function draw() {

            ctx.fillStyle = "grey";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "black";
            snake.forEach((segment) => {
                ctx.fillRect(segment.x, segment.y, size, size);
            });

            if (block) {
                ctx.fillStyle = "red";
                ctx.fillRect(block.pos.x, block.pos.y, block.pos.w, block.pos.h);
            }

            if (food) {
                ctx.fillStyle = "green";
                ctx.fillRect(food.pos.x, food.pos.y, food.pos.w, food.pos.h);
            }

            handleNumber = requestAnimationFrame(draw);
            moveSnake();
        }

        function moveSnake() {
            const head = { ...snake[0] };

            if (direction === "up") head.y -= speed;
            else if (direction === "down") head.y += speed;
            else if (direction === "left") head.x -= speed;
            else if (direction === "right") head.x += speed;

            if (Objects.collisionDetection(head, block)) {
                console.log('Collistion detection>> ', 'Head: ', head, 'Obstacle: ', block);
                cancelAnimationFrame(handleNumber);
            }

            if (food && Objects.collisionDetection(head, food)) {
                console.log("Food consumed!");
                snake.unshift(head);

                for (let i = 0; i < food.pos.w / size; i++) {
                    snake.unshift({ ...snake[0] });
                }

                food = null;
                renderFood();
            } else {
                snake.pop();
            }

            head.x = Math.max(0, Math.min(canvas.width - size, head.x));
            head.y = Math.max(0, Math.min(canvas.height - size, head.y));

            snake.unshift(head);
        }

        function renderWall() {
            if (!block)
                console.log("Rendering initial obstacle...");
            block = Objects.renderObject(ctx, true);
        }

        function renderFood() {
            food = {
                pos: {
                    x: Math.floor(Math.random() * (canvas.width - size)),
                    y: Math.floor(Math.random() * (canvas.height - size)),
                    w: size,
                    h: size
                },
                collidable: true
            };
            console.log("New food at:", food);
        }

        draw();
        renderWall();
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
