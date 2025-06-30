import React from "react";
import ReactDOM from "react-dom/client";

// app/src/index.test.tsx

jest.mock("react-dom/client", () => ({
  createRoot: jest.fn(),
}));

describe("index.tsx", () => {
  let rootMock: { render: jest.Mock };
  let originalGetElementById: typeof document.getElementById;

  beforeEach(() => {
    rootMock = { render: jest.fn() };
    (ReactDOM.createRoot as jest.Mock).mockReturnValue(rootMock);

    // Mock document.getElementById
    originalGetElementById = document.getElementById;
    document.getElementById = jest.fn().mockReturnValue(document.createElement("div"));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    document.getElementById = originalGetElementById;
  });

  it("calls ReactDOM.createRoot with the root element and renders App", () => {
    require("./index"); // Import after mocks are set

    expect(document.getElementById).toHaveBeenCalledWith("root");
    expect(ReactDOM.createRoot).toHaveBeenCalled();
    expect(rootMock.render).toHaveBeenCalled();

    // Optionally, check that render is called with React.StrictMode and App
    const renderArg = rootMock.render.mock.calls[0][0];
    expect(renderArg.type).toBe(React.StrictMode);
  });
});