/**
 * @param {CanvasRenderingContext2D} ctx 
 * @param {HTMLElement} canvas
 * @param {function} onComplete
 */ 
export function playIntroModern(ctx, canvas, onComplete) {
  const blockSize = 12;
  let snake = [];
  let length = 25;
  let t = 0;

  function drawSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < snake.length; i++) {
      const {x, y} = snake[i];
      const hue = (i * 20) % 360; // rainbow tail
      ctx.fillStyle = `hsl(${hue}, 80%, 50%)`;
      ctx.fillRect(x * blockSize, y * blockSize, blockSize - 2, blockSize - 2);
    }
  }

  function update() {
    t++;
    const x = 80 + Math.floor(8 * Math.cos(t / 20));
    const y = 30 + Math.floor(8 * Math.sin(t / 20));
    snake.push({x, y});
    if (snake.length > length) snake.shift();

    drawSnake();

    if (t < 250) {
      requestAnimationFrame(update);
    }
  }

  update();
}

export default playIntroModern;
