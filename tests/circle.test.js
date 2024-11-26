import Circle from "../public/elements/circle.js";

describe("Circle", () => {
  let circle;

  beforeEach(() => {
    circle = new Circle();
  });

  test("should be instance of Circle", () => {
    expect(circle).toBeInstanceOf(Circle);
  });

  test("should set dimensions correctly", () => {
    circle.setDimension({ x: 10, y: 10, width: 100, height: 100 });
    expect(circle.width).toBe(100);
    expect(circle.height).toBe(100);
  });

  test("should handle stroke position", () => {
    circle.setStrokePosition("CENTER");
    expect(circle.strokePositionOffset).toBe(0);

    circle.setStrokePosition("OUTSIDE");
    expect(circle.strokeWidth).toBe(10);
  });

  test("should inherit dimension validation", () => {
    const mockCtx = { canvas: { width: 100, height: 100 } };
    const circle = new Circle();
    expect(() => {
      circle.setDimension({ x: 0, y: 0, width: -100, height: 100 });
      circle.draw(mockCtx);
    }).toThrow("Width cannot be negative");

    expect(() => {
      circle.setDimension({ x: -10, y: 0, width: 100, height: 100 });
      circle.draw(mockCtx);
    }).toThrow("Position cannot be outside boundary");
  });

  it("should throw an error if radius is negative", () => {
    expect(() => circle.setDimension({ x: 0, y: 0, radius: -5 })).toThrow(
      "Radius cannot be negative"
    );
  });
});
