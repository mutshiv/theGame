class MovingCanvas extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        const canvas = document.createElement("canvas");
        canvas.width = 1800;
        canvas.height = 800;
        this.shadowRoot.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        let x = 180, y = 80, speed = 4;
        let direction = "right";

        /** @param {direction} string */
        function draw() {
            // ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "grey";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "red";
            ctx.fillRect(x, y, 10, 10);

            if (direction === "up") y -= speed;
            else if (direction === "down") y += speed;
            else if (direction === "left") x -= speed;
            else if (direction === "right") x += speed;

            x = Math.max(0, Math.min(canvas.width - 10, x));
            y = Math.max(0, Math.min(canvas.height - 10, y));

            requestAnimationFrame(draw);
        }

        draw();

        window.addEventListener("keydown", (e) => {
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                    direction = e.key === "ArrowUp" ? "up" : "down";
                } else {
                    direction = e.key === "ArrowLeft" ? "left" : "right";
                }
            }
        });
    }
}

customElements.define("moving-canvas", MovingCanvas);
