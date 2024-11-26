import Shape from "./shape.js";

function Rectangle() {
  this.cornerRadius = 0;
  this.cornerStyle = "SMOOTH";

  this.shapeLogic = (ctx) => {
    const offset = this.strokePositionOffset;
    const x = this.x + offset;
    const y = this.y + offset;
    const width = this.width - 2 * offset;
    const height = this.height - 2 * offset;
    const radius = Math.min(this.cornerRadius, width / 2, height / 2);

    ctx.lineWidth = this.strokeWidth;

    if (radius === 0) {
      // No corner radius - draw regular rectangle
      ctx.moveTo(x, y);
      ctx.lineTo(x + width, y);
      ctx.lineTo(x + width, y + height);
      ctx.lineTo(x, y + height);
      return;
    }

    if (this.cornerStyle === "SMOOTH") {
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.arcTo(x + width, y, x + width, y + radius, radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
      ctx.lineTo(x + radius, y + height);
      ctx.arcTo(x, y + height, x, y + height - radius, radius);
      ctx.lineTo(x, y + radius);
      ctx.arcTo(x, y, x + radius, y, radius);
    } else {
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.lineTo(x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.lineTo(x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.lineTo(x, y + height - radius);
      ctx.lineTo(x, y + radius);
    }
  };
  Shape.call(this);
}

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.setCornerRadius = function (radius, style = "SMOOTH") {
  if (radius < 0) {
    throw new Error("Corner radius cannot be negative");
  }
  if (!["SMOOTH", "SHARP"].includes(style)) {
    throw new Error("Corner style must be either 'SMOOTH' or 'SHARP'");
  }
  this.cornerRadius = radius;
  this.cornerStyle = style;
};

export default Rectangle;
