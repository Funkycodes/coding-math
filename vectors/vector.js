class Vector {
  #x;
  #y;

  constructor (x = 1, y = 1) {
    this.#x = x;
    this.#y = y;
  }

  get x() {
    return this.#x;
  }
  /**
   * @param {number} value
   */
  set x(value) {
    this.#x = value;
  }

  get y() {
    return this.#y;
  }
  /**
   * @param {number} value 
   */
  set y(value) {
    this.#y = value;
  }
  /**
   * @param {number} angle 
   */
  set angle(angle) {
    let length = this.length;
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }
  get angle() {
    return Math.atan2(this.#y, this.#x);
  }
  set length(length) {
    let angle = this.angle;
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }
  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  scalarProd(val) {
    let resultant = new Vector();
    resultant.length = this.length * val;
    return resultant;
  }

  scalarQuot(val) {
    let resultant = new Vector();
    resultant.length = this.length / val;
    return resultant;
  }

  static add(vec1, vec2) {
    let resultant = new Vector();
    resultant.x = vec1.x + vec2.x;
    resultant.y = vec1.y + vec2.y;
    return resultant;
  }
  static substract(vec1, vec2) {
    let resultant = new Vector();
    resultant.x = vec1.x - vec2.x;
    resultant.y = vec1.y - vec2.y;
    return resultant;
  }
}
