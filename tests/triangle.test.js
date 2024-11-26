import Triangle from "../elements/triangle.js";

describe("Triangle", () => {
  let triangle;

  beforeEach(() => {
    triangle = new Triangle();
  });

  test("should be instance of Triangle", () => {
    expect(triangle).toBeInstanceOf(Triangle);
  });

  test("should set dimensions correctly", () => {
    triangle.setDimension({ x: 0, y: 0, width: 50, height: 50 });
    expect(triangle.width).toBe(50);
    expect(triangle.height).toBe(50);
  });

  test("should handle fill properties", () => {
    triangle.addFill({ type: "SOLID", color: [0, 1, 0, 1] });
    expect(triangle.showFill).toBe(true);
    expect(triangle.fill.type).toBe("SOLID");
  });
});
