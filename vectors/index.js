window.onload = function () {
  const canvas = document.querySelector(".artboard");
  const context = canvas.getContext("2d");
  let width = canvas.width = innerWidth,
    height = canvas.height = innerHeight;

  // set up env vars
  let centerX = width * 0.5;
  let centerY = height * 0.5;

  render();

  function draw() {
    context.clearRect(0, 0, width, height);
    context.save();
    context.translate(centerX, centerY);

    context.beginPath();
    context.arc(0, 0, 40, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }
  function render() {
    draw();
    requestAnimationFrame(render);
  }
  addEventListener("resize", () => {
    width = canvas.width = innerWidth;
    height = canvas.height = innerHeight;

    centerX = width * 0.5;
    centerY = height * 0.5;
  });
};