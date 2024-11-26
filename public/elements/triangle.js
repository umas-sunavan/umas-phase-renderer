import Shape from "./shape.js";

function Triangle() {
  this.shapeLogic = (ctx) => {
    const offset = this.strokePositionOffset;
    const x1 = this.x + offset;
    const y1 = this.y + offset;
    const x2 = this.x + this.width - offset;
    const y2 = this.y + offset;
    const x3 = this.x + this.width - offset;
    const y3 = this.y + this.height - offset;

    if (this.smooth) {
      // Implement smooth corners logic here
      const radius = Math.min(this.width, this.height) / 10; // Example radius
      ctx.moveTo(x1 + radius, y1);
      ctx.arcTo(x2, y1, x2, y2 + radius, radius);
      ctx.arcTo(x3, y3, x1 + radius, y3, radius);
      ctx.arcTo(x1, y1, x1 + radius, y1, radius);
    } else {
      // Sharp corners
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x3, y3);
      ctx.closePath();
    }
  };
  Shape.call(this);
}

Triangle.prototype = Object.create(Shape.prototype);
Triangle.prototype.constructor = Triangle;

export default Triangle;
