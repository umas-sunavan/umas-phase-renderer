"use strict";
import Rectangle from "./elements/rectangle.js";
import Triangle from "./elements/triangle.js";
import Circle from "./elements/circle.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let scale = 1;
const scaleFactor = 1.1;
const minScale = 0.8;
const maxScale = 3;

async function demo() {
  const dataArray = [];
  {
    const newShape = new Rectangle();
    newShape.setDimension({
      x: 200,
      y: 100,
      width: 200,
      height: 150,
    });
    newShape.setCornerRadius(20, "SMOOTH");
    newShape.addStroke({
      type: "SOLID",
      color: [1.0, 0.7, 0.3, 1.0],
    });
    newShape.addFill({
      type: "IMAGE",
      image: "./img.png",
    });
    newShape.setStrokePosition("OUTSIDE");
    newShape.setStrokeWidth(5);
    dataArray.push(newShape);
  }
  {
    const newShape = new Triangle();
    newShape.setDimension({
      x: 50,
      y: 50,
      width: 20,
      height: 40,
    });
    newShape.addFill({
      type: "SOLID",
      color: [0.9, 0.3, 0.3, 1],
    });
    newShape.addStroke({
      type: "SOLID",
      color: [0.0, 0.3, 1.0, 1.0],
    });
    newShape.setStrokePosition("CENTER");
    newShape.setStrokeWidth(20);
    dataArray.push(newShape);
  }
  {
    const newShape = new Circle();
    newShape.setDimension({
      x: 300,
      y: 300,
      radius: 10,
    });
    newShape.addFill({
      type: "SOLID",
      color: [0.2, 0.8, 0.2, 1],
    });
    newShape.addStroke({
      type: "SOLID",
      color: [0.0, 0.0, 0.0, 1.0],
    });
    newShape.setStrokePosition("OUTSIDE");
    newShape.setStrokeWidth(10);
    dataArray.push(newShape);
  }
  return dataArray;
}

const animate = async () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save(); // Save the current state
  ctx.setTransform(scale, 0, 0, scale, 0, 0); // Apply the scale transformation

  const array = await demo();
  for (const shape of array) {
    try {
      shape.draw(ctx);
    } catch (error) {
      console.error(error);
      return;
    }
  }

  ctx.restore(); // Restore the original state
  requestAnimationFrame(animate);
};
animate();

canvas.addEventListener("wheel", (event) => {
  event.preventDefault();

  const mouseX = event.offsetX;
  const mouseY = event.offsetY;

  if (event.deltaY < 0) {
    // Zoom in
    scale *= scaleFactor;
  } else {
    // Zoom out
    scale /= scaleFactor;
  }

  // Restrict the scale to the defined min and max
  if (scale > maxScale) {
    scale = maxScale;
  }
  if (scale < minScale) {
    scale = minScale;
  }

  // Adjust the transformation matrix
  ctx.setTransform(
    scale,
    0,
    0,
    scale,
    mouseX - mouseX * scale,
    mouseY - mouseY * scale
  );
  animate();
});
