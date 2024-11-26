import Rectangle from "../elements/rectangle.js";

describe("Rectangle", () => {
  let rect;

  beforeEach(() => {
    rect = new Rectangle();
  });

  test("should be instance of Rectangle", () => {
    expect(rect).toBeInstanceOf(Rectangle);
  });

  test("should set corner radius and style", () => {
    rect.setCornerRadius(10, "SMOOTH");
    expect(rect.cornerRadius).toBe(10);
    expect(rect.cornerStyle).toBe("SMOOTH");
  });

  test("should throw error for negative radius", () => {
    expect(() => {
      rect.setCornerRadius(-5);
    }).toThrow();
  });

  test("should set dimensions correctly", () => {
    rect.setDimension({ x: 0, y: 0, width: 100, height: 50 });
    expect(rect.width).toBe(100);
    expect(rect.height).toBe(50);
  });
});
