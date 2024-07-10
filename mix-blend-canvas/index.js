// window.onload = () => {
//   const canvas = document.querySelector("canvas");
//   const context = canvas.getContext("2d");
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;

//   let width = canvas.width,
//     height = canvas.height;

//   let centerY = height * .5,
//     centerX = width * .5,
//     radiusX = 200,
//     radiusY = 300,
//     speedX = 0.124,
//     speedY = 0.211,
//     angleX = 0,
//     angleY = 0;

//   render();

//   function render() {
//     var x = centerX + Math.cos(angleX) * radiusX;
//     var y = centerY + Math.sin(angleY) * radiusY;

//  var radius = baseRadius + Math.sin(angle) * offset;

//     context.clearRect(0, 0, width, height);
//     context.beginPath();
//     context.arc(x, y, 10, 0, Math.PI * 2);
//     context.fill();

//     angleX += speedX;
//     angleY += speedY;
//     requestAnimationFrame(render);
//   }
// };

class ArtBoard {
  constructor () {
    this.canvas = document.querySelector("canvas");
    this.context = this.canvas.getContext("2d");

    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.centerX = this.width * .5;
    this.centerY = this.height * .5;
    this.angle = 0;
    this.cAngle = 0;
    this.init();
    this.addEvents();
    this.update();
  }
  init() {
  }
  draw() {
  }
  addEvents() {}
  update() {
    this.draw();
    requestAnimationFrame(this.update.bind(this));
  }
}

// Lissajou's Curve
class LissajouCurve extends ArtBoard {
  init() {
    this.radiusX = 200;
    this.radiusY = 300;
    this.speedX = 0.124;
    this.speedY = 0.211;
    this.angleX = 0;
    this.angleY = 0;
  }
  draw() {
    var x = this.centerX + Math.cos(this.angleX) * this.radiusX;
    var y = this.centerY + Math.sin(this.angleY) * this.radiusY;
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.beginPath();
    this.context.arc(x, y, 10, 0, Math.PI * 2);
    this.context.fill();
  }
  update() {
    this.angleX += this.speedX;
    this.angleY += this.speedY;
    super.update();
  }
}

// Circular dotted Clock
class DottedCircle extends ArtBoard {
  init() {
    this.centerY = this.height * .5;
    this.centerX = this.width * .5;
    this.slices = 12;
    this.radius = this.width * .4;
    this.angle = (Math.PI * 2) / this.slices;
  }
  draw() {
    for (let iter = 0; iter < this.slices; iter++) {
      var x = this.centerX + this.radius * Math.cos(this.angle * iter);
      var y = this.centerY + this.radius * Math.sin(this.angle * iter);

      this.context.beginPath();
      this.context.arc(x, y, 10, 0, Math.PI * 2);
      this.context.fill();
    }
  }
  update() {
    if (this.hasInit) return;
    this.hasInit = true;
    super.update();
  }
}
new DottedCircle();
class Line extends ArtBoard {
  draw() {
    this.context.clearRect(0, 0, this.width, this.height);
    const x = this.centerX + Math.cos(this.cAngle) * 200;
    const y = this.centerY + Math.sin(this.cAngle) * 200;

    this.context.save();
    this.context.translate(this.centerX, this.centerY);
    this.context.rotate(this.angle);
    this.context.beginPath();
    // plot arrow
    this.context.moveTo(20, 0);
    this.context.lineTo(-20, 0);

    this.context.moveTo(20, 0);
    this.context.lineTo(10, -10);

    this.context.moveTo(20, 0);
    this.context.lineTo(10, 10);

    this.context.stroke();
    this.context.restore();
  }
  onMouseMove(e) {
    var dx = e.clientX - this.centerX;
    var dy = e.clientY - this.centerY;
    this.angle = Math.atan2(dy, dx);
  }
  addEvents() {
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
  }
}
function getMousePos(e) {
  return {
    x: e.clientX,
    y: e.clientY
  };
}
// new Line();

class Cursor extends ArtBoard {
  init() {
    this.radius = 8;
    this.posX = { current: this.centerX, target: this.centerX };
    this.posY = { current: this.centerY, target: this.centerY };
    this.scale = { current: 0, target: 1 };
    this.hoverables = document.querySelectorAll("li");
    super.init();
  }
  draw() {
    this.context.clearRect(0, 0, this.width, this.height);

    this.context.save();
    this.context.translate(this.posX.current, this.posY.current);
    this.context.scale(this.scale.current, this.scale.current);

    this.context.beginPath();
    this.context.arc(0, 0, this.radius, 0, Math.PI * 2);
    this.context.fillStyle = "#ffffff";
    this.context.fill(); // closePath() automatically called.

    this.context.restore();
  }
  onMouseMove(e) {
    this.posX.target = getMousePos(e).x;
    this.posY.target = getMousePos(e).y;
  }
  onMouseEnter() {
    this.hoverables.forEach(hoverable => {
      hoverable.onmouseenter = () => {
        this.scale.target = 2.5;
      };
      hoverable.onmouseleave = () => {
        this.scale.target = 1.0;
      };
    });
  }
  addEvents() {
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
    this.onMouseEnter();
  }
  update() {
    this.posX.current = lerp(this.posX.current, this.posX.target, 0.1);
    this.posY.current = lerp(this.posY.current, this.posY.target, 0.1);
    this.scale.current = lerp(this.scale.current, this.scale.target, 0.075);
    super.update();
  }
}

// new Cursor();

function lerp(a, b, ease) {
  return a + (b - a) * ease;
}