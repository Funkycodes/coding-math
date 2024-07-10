class Particle {
  mass;
  position;
  velocity;
  acceleration;

  constructor (x, y, speed, direction) {
    this.position = new Vector(x, y);
    this.velocity = new Vector(0, 0);
    this.velocity.length = speed;
    this.velocity.angle = direction;
  }
  accelerate(accel) {
    this.velocity = Vector.add(this.velocity, accel);
  }
  update() {
    this.position = Vector.add(this.position, this.velocity);
  }
}