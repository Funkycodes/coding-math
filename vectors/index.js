window.onload = (_) => {
  // Init
  let canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width = innerWidth,
    height = canvas.height = innerHeight,
    // accel = new Vector(0.1, 0.1),
    p = new Particle(width / 2, height / 2, 10, Math.PI / 6),
    gravity = new Vector(0.0, 0.1);

  requestAnimationFrame(update);

  function update() {
    context.clearRect(0, 0, width, height);
    // p.accelerate(accel);
    if (p.position.x <= 5 || p.position.x >= (width - 5)) {
      p.velocity.x *= -0.9;
      p.position.x = 0;
    }
    if (p.position.y <= 5 || p.position.y >= (height - 5)) {
      p.position.y = 0;
      p.velocity.y *= -0.9;
    }
    p.accelerate(gravity);
    p.update();
    context.beginPath();
    context.arc(p.position.x, p.position.y, 10, 0, Math.PI * 2, false);
    context.fill();
    requestAnimationFrame(update);
  }
};