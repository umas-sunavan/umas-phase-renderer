import Shape from "../public/elements/shape.js";

describe("Shape", () => {
  let shape;

  beforeEach(() => {
    shape = new Shape();
  });

  test("should initialize with default values", () => {
    expect(shape.width).toBe(0);
    expect(shape.height).toBe(0);
    expect(shape.showStroke).toBe(false);
  });

  test("should set dimensions correctly", () => {
    shape.setDimension({ x: 10, y: 20, width: 100, height: 200 });
    expect(shape.x).toBe(10);
    expect(shape.width).toBe(100);
  });

  test("should handle fill properties", () => {
    shape.addFill({ type: "SOLID", color: [1, 0, 0, 1] });
    expect(shape.showFill).toBe(true);
    expect(shape.fill.type).toBe("SOLID");
  });

  test("should set stroke position", () => {
    shape.setStrokePosition("OUTSIDE");
    expect(shape.strokePosition).toBe("OUTSIDE");
  });

  test("should throw error for invalid stroke position", () => {
    expect(() => {
      shape.setStrokePosition("INVALID");
    }).toThrow();
  });

  describe("dimension validation", () => {
    test("should throw error for negative width", () => {
      expect(() => {
        shape.setDimension({ x: 0, y: 0, width: -100, height: 100 });
      }).toThrow("Width cannot be negative");
    });

    test("should throw error for negative height", () => {
      expect(() => {
        shape.setDimension({ x: 0, y: 0, width: 100, height: -100 });
      }).toThrow("Height cannot be negative");
    });

    test("should throw error for position outside boundary", () => {
      const mockCtx = { canvas: { width: 100, height: 100 } };
      // Assuming canvas/container size is 1000x1000
      expect(() => {
        shape.setDimension({ x: -100, y: 0, width: 100, height: 100 });
        shape.draw(mockCtx);
      }).toThrow("Position cannot be outside boundary");

      expect(() => {
        shape.setDimension({ x: 0, y: -100, width: 100, height: 100 });
        shape.draw(mockCtx);
      }).toThrow("Position cannot be outside boundary");

      expect(() => {
        shape.setDimension({ x: 1010, y: 0, width: 100, height: 100 });
        shape.draw(mockCtx);
      }).toThrow("Position cannot be outside boundary");

      expect(() => {
        shape.setDimension({ x: 0, y: 1010, width: 100, height: 100 });
        shape.draw(mockCtx);
      }).toThrow("Position cannot be outside boundary");
    });
  });

  test("should be in the canvas", () => {
    const mockCtx = { canvas: { width: 100, height: 100 } };
    shape.setDimension({ x: 50, y: 50, width: 10, height: 10 });
    expect(() => shape.draw(mockCtx)).not.toThrow();

    shape.setDimension({ x: 150, y: 150, width: 10, height: 10 });
    expect(() => shape.draw(mockCtx)).toThrow(
      "Position cannot be outside boundary"
    );
  });

  test("should not have negative border radius", () => {
    expect(() => shape.setSmooth("")).toThrow(
      "Smooth parameter must be a boolean"
    );
  });

  test("color should be between 0 and 1", () => {
    expect(() =>
      shape.addFill({ type: "SOLID", color: [1.2, 0, 0, 1] })
    ).toThrow();
    expect(() =>
      shape.addFill({ type: "SOLID", color: [-0.1, 0, 0, 1] })
    ).toThrow();
  });

  test("stroke width should not be negative", () => {
    expect(() => shape.setStrokeWidth(-1)).toThrow(
      "Stroke width cannot be negative"
    );
  });

  test("stroke color should be between 0 and 1", () => {
    expect(() =>
      shape.addStroke({ type: "SOLID", color: [1.2, 0, 0, 1] })
    ).toThrow();
    expect(() =>
      shape.addStroke({ type: "SOLID", color: [-0.1, 0, 0, 1] })
    ).toThrow();
  });

  test("color should be 4 values of an array", () => {
    expect(() => shape.addFill({ type: "SOLID", color: [0, 0, 0] })).toThrow();
    expect(() =>
      shape.addFill({ type: "SOLID", color: [0, 0, 0, 1, 0] })
    ).toThrow();
  });

  test("image should be valid", () => {
    const mockCtx = { canvas: { width: 100, height: 100 } };
    shape.setDimension({ x: 50, y: 50, width: 10, height: 10 });
    expect(() => {
      shape.addFill({ type: "IMAGE", image: "invalid-url" });
      shape.draw(mockCtx);
    }).toThrow();
  });

  test("should be either SOLID or IMAGE", () => {
    expect(() => shape.addFill({ type: "INVALID" })).toThrow();
  });

  test("should define color if type is SOLID", () => {
    expect(() => shape.addFill({ type: "SOLID" })).toThrow();
  });

  test("should define image if type is IMAGE", () => {
    expect(() => shape.addFill({ type: "IMAGE" })).toThrow();
  });

  test("should not be outside the canvas", () => {
    const mockCtx = { canvas: { width: 100, height: 100 } };
    shape.setDimension({ x: 101, y: 101, width: 10, height: 10 });
    expect(() => shape.draw(mockCtx)).toThrow();
  });
});
