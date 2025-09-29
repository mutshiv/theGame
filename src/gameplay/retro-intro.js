/**
 * @param {CanvasRenderingContext2D} ctx 
 * @param {HTMLElement} canvas
 * @param {function} onComplete
 */ 
function playIntroRetro(ctx, canvas) {
  const blockSize = 10;
  let snake = [
    {x: 65, y: 30}, // off-screen start
    {x: 70, y: 30},
    {x: 85, y: 30}
  ];
  let direction = {x: 1, y: 0}; // moving right
  let steps = 0;
  const maxSteps = 80;

  function drawSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    for (let s of snake) {
      ctx.fillRect(s.x * blockSize, s.y * blockSize, blockSize, blockSize);
    }
  }

  function update() {
    steps++;
    const head = {
      x: snake[snake.length - 1].x + direction.x,
      y: snake[snake.length - 1].y + direction.y
    };
    snake.push(head);
    snake.shift();

    if (steps === 20) direction = {x: 0, y: 1};  // turn down
    if (steps === 40) direction = {x: -1, y: 0}; // turn left
    if (steps === 60) direction = {x: 0, y: -1}; // turn up

    drawSnake();

    if (steps < maxSteps) {
      requestAnimationFrame(update);
    }
  }

  update();
}

export default playIntroRetro;
