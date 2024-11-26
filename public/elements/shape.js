function Shape() {
  this.width = 0;
  this.height = 0;
  this.radius = 0;
  this.x = 0;
  this.y = 0;
  this.fill = null;
  this.strokePosition = "CENTER";
  this.strokePositionOffset = 0;
  this.strokeWidth = 10;
  this.stroke = {
    type: "SOLID",
    color: [0, 0, 0, 1],
  };
  this.showStroke = false;
  this.showFill = false;
  this.smooth = true;
  this.image = new Image();
}

Shape.prototype.draw = function (ctx) {
  const { width, height } = ctx.canvas;
  // Check if position is within boundary
  if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
    throw new Error("Position cannot be outside boundary");
  }
  if (this.showStroke) {
    ctx.beginPath();
    switch (this.strokePosition) {
      case "CENTER":
        this.strokePositionOffset = 0;
        break;
      case "OUTSIDE":
        this.strokePositionOffset = -this.strokeWidth / 2;
        break;
      case "INSIDE":
        this.strokePositionOffset = this.strokeWidth / 2;
        break;
    }
    ctx.lineWidth = this.strokeWidth;
    this.shapeLogic(ctx);
    const [r, g, b, a] = this.stroke.color;
    ctx.strokeStyle = `rgba(
      ${Math.floor(r * 255)},
      ${Math.floor(g * 255)},
      ${Math.floor(b * 255)},
      ${Math.floor(a * 255)})`;
    ctx.closePath();
    ctx.stroke();
  }
  if (this.showFill) {
    ctx.beginPath();
    this.shapeLogic(ctx);
    ctx.closePath();

    switch (this.fill.type) {
      default:
      case "SOLID":
        const [r, g, b, a] = this.fill.color;
        this.fill.color.forEach((color) => {
          if (color > 1) {
            alert("Color value must be between 0 and 1");
          } else if (color < 0) {
            alert("Color value must be between 0 and 1");
          }
        });
        ctx.fillStyle = `rgba(
        ${Math.floor(r * 255)},
        ${Math.floor(g * 255)},
        ${Math.floor(b * 255)},
        ${Math.floor(a * 255)})`;
        ctx.fill();
        break;
      case "IMAGE":
        this.image.src = this.fill.image;
        this.image.onerror = () => {
          throw new Error("image should be valid");
        };
        const pattern = ctx.createPattern(this.image, "no-repeat");
        if (pattern) {
          ctx.save();
          // Scale and position the pattern to fit the shape
          const scaleX = this.width / this.image.width;
          const scaleY = this.height / this.image.height;
          pattern.setTransform(
            new DOMMatrix()
              .translateSelf(this.x, this.y)
              .scaleSelf(scaleX, scaleY)
          );
          ctx.fillStyle = pattern;
          ctx.fill();
          ctx.restore();
        }
    }
  }
};

Shape.prototype.toString = function () {
  return `Shape: width=${this.width}, height=${this.height}, x=${this.x}, y=${this.y}`;
};

Shape.prototype.setDimension = function ({ x, y, width, height, radius }) {
  if (width < 0 && !radius) {
    throw new Error("Width cannot be negative");
  }
  if (height < 0 && !radius) {
    throw new Error("Height cannot be negative");
  }
  if (radius < 0) {
    throw new Error("Radius cannot be negative");
  }
  this.x = x;
  this.y = y;
  if (radius) {
    this.radius = radius;
  } else {
    this.width = width;
    this.height = height;
  }
};

Shape.prototype.addFill = function ({ type, image, color }) {
  if (type === "SOLID" && (!color || color.length !== 4)) {
    throw new Error("Color must be an array of 4 values");
  }
  if (color) {
    color.forEach((value) => {
      if (value < 0 || value > 1) {
        throw new Error("Color values must be between 0 and 1");
      }
    });
  }
  if (type === "IMAGE") {
    if (!image || typeof image !== "string" || image.trim() === "") {
      throw new Error("Image must be a valid non-empty URL");
    }
  }
  if (type !== "SOLID" && type !== "IMAGE") {
    throw new Error("Fill type must be either SOLID or IMAGE");
  }
  this.showFill = true;
  this.fill = {
    type,
    image: image ? image : null,
    color: color ? [...color] : null, // Create a copy of the color array
  };
};

Shape.prototype.addStroke = function ({ type, color }) {
  if (!color || color.length !== 4) {
    throw new Error("Stroke color must be an array of 4 values");
  }
  color.forEach((value) => {
    if (value < 0 || value > 1) {
      throw new Error("Stroke color values must be between 0 and 1");
    }
  });
  this.showStroke = true;
  this.stroke = {
    type,
    color: [...color], // Create a copy of the color array
  };
};

Shape.prototype.setStrokePosition = function (position) {
  if (!["CENTER", "OUTSIDE", "INSIDE"].includes(position)) {
    throw new Error(
      "Invalid stroke position. Use 'CENTER', 'OUTSIDE', or 'INSIDE'"
    );
  }
  this.strokePosition = position;
};

Shape.prototype.setStrokeWidth = function (width) {
  if (width < 0) {
    throw new Error("Stroke width cannot be negative");
  }
  this.strokeWidth = width;
};

Shape.prototype.setSmooth = function (smooth) {
  if (typeof smooth !== "boolean") {
    throw new Error("Smooth parameter must be a boolean");
  }
  this.smooth = smooth;
};

export default Shape;
