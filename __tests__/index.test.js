import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../app/page";
import Path from "../app/components/SkillTree";
import { within } from "@testing-library/dom";
import PointsDisplay from "../app/components/PointsDisplay";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      level: 1,
      name: /Rune Mastery Loadout Talent Calculator 9000/i,
    });

    expect(heading).toBeInTheDocument();
  });
});

xdescribe("Path", () => {
  it("renders titles", () => {
    render(<Path />);

    const container = screen.getByTestId("skill-tree-container");

    expect(container).toBeInTheDocument();

    screen.getByText('talent path 1', {exact: false}) // ignore case

    const titles = container.querySelectorAll("p");

    expect(titles).toHaveLength(2);
    titles.forEach((t) => {
      expect(t).toBeInTheDocument();
    });

  });
});

describe("PointsDisplay", () => {
  it("renders a label", () => {
    render(<PointsDisplay />);

    const label = screen.getByText("Points Spent");

    expect(label).toBeInTheDocument();
  });
});
