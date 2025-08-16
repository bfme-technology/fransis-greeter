import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "./loader";

describe("Loader component", () => {
  it("should not render anything when isLoading is false", () => {
    const { container } = render(
      <Loader isLoading={false} message="Loading..." />
    );
    expect(container.firstChild).toBeNull();
  });

  it("should render loader and message when isLoading is true", () => {
    render(<Loader isLoading={true} message="Loading..." />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(
      screen.getByRole("presentation", { hidden: true })
    ).toBeInTheDocument();
    expect(document.getElementById("welcome-screen")).toBeInTheDocument();
    expect(document.querySelectorAll(".infinity-dot")).toHaveLength(4);
  });

  it("should render the correct message", () => {
    render(<Loader isLoading={true} message="Please wait" />);
    expect(screen.getByText("Please wait")).toBeInTheDocument();
  });
});
