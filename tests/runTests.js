import { testShape } from "./shape.test.js";
import { testRectangle } from "./rectangle.test.js";
import { testCircle } from "./circle.test.js";
import { testTriangle } from "./triangle.test.js";

function runAllTests() {
  console.log("Starting tests...\n");

  testShape();
  console.log("");

  testRectangle();
  console.log("");

  testCircle();
  console.log("");

  testTriangle();
  console.log("");

  console.log("All tests completed!");
}

runAllTests();
