import Shape from "./shape.js";

function Circle() {
  Shape.call(this);
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.shapeLogic = function (ctx) {
  if (this.radius < 0) {
    throw new Error("Radius cannot be negative");
  }
  const centerX = this.x + this.radius / 2;
  const centerY = this.y + this.radius / 2;
  const radius = this.radius - this.strokePositionOffset;
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
};

export default Circle;
